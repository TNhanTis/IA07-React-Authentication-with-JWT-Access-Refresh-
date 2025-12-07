import { Controller, Post, Get, Body, UseGuards, Request } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller("user")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("register")
  async register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.register(createUserDto);
  }

  @Post("login")
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.login(loginUserDto);
  }

  @Post("refresh")
  async refreshTokens(@Body('refreshToken') refreshToken: string) {
    return this.usersService.refreshTokens(refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @Post("logout")
  async logout(@Request() req) {
    return this.usersService.logout(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  async getProfile(@Request() req) {
    return this.usersService.getUserProfile(req.user.userId);
  }
}
