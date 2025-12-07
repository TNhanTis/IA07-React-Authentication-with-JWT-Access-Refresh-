import {
  Injectable,
  ConflictException,
  BadRequestException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { Model } from "mongoose";
import * as bcrypt from "bcryptjs";
import { User } from "./user.schema";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async register(
    createUserDto: CreateUserDto
  ): Promise<{ message: string; user: any }> {
    const { email, password } = createUserDto;

    // Check if user already exists
    const existingUser = await this.userModel.findOne({
      email: email.toLowerCase(),
    });
    if (existingUser) {
      throw new ConflictException("User with this email already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new this.userModel({
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    return {
      message: "User registered successfully",
      user: {
        id: savedUser._id,
        email: savedUser.email,
        createdAt: savedUser.createdAt,
      },
    };
  }

  async login(
    loginUserDto: LoginUserDto
  ): Promise<{ message: string; user: any; accessToken: string; refreshToken: string }> {
    const { email, password } = loginUserDto;

    // Find user by email
    const user = await this.userModel.findOne({ email: email.toLowerCase() });
    if (!user) {
      throw new UnauthorizedException("Invalid email or password");
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid email or password");
    }

    // Generate tokens
    const tokens = await this.generateTokens(user._id.toString(), user.email);

    // Hash and store refresh token
    const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, 10);
    await this.userModel.findByIdAndUpdate(user._id, {
      refreshToken: hashedRefreshToken,
    });

    return {
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        createdAt: user.createdAt,
      },
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  async refreshTokens(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      // Verify refresh token
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET') || 'your-refresh-secret-key-change-in-production',
      });

      // Find user
      const user = await this.userModel.findById(payload.sub);
      if (!user || !user.refreshToken) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      // Verify stored refresh token matches
      const isRefreshTokenValid = await bcrypt.compare(refreshToken, user.refreshToken);
      if (!isRefreshTokenValid) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      // Generate new tokens
      const tokens = await this.generateTokens(user._id.toString(), user.email);

      // Update stored refresh token
      const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, 10);
      await this.userModel.findByIdAndUpdate(user._id, {
        refreshToken: hashedRefreshToken,
      });

      return tokens;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }

  async logout(userId: string): Promise<{ message: string }> {
    await this.userModel.findByIdAndUpdate(userId, { refreshToken: null });
    return { message: 'Logout successful' };
  }

  async getUserProfile(userId: string): Promise<any> {
    const user = await this.userModel.findById(userId).select('-password -refreshToken');
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return {
      id: user._id,
      email: user.email,
      createdAt: user.createdAt,
    };
  }

  private async generateTokens(userId: string, email: string): Promise<{ accessToken: string; refreshToken: string }> {
    const payload = { email, sub: userId };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET') || 'your-secret-key-change-in-production',
      expiresIn: '15m', // 15 minutes
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET') || 'your-refresh-secret-key-change-in-production',
      expiresIn: '7d', // 7 days
    });

    return { accessToken, refreshToken };
  }
}
