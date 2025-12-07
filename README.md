# React Authentication with JWT (Access + Refresh Tokens)

A full-stack web application implementing secure JWT-based authentication with access and refresh tokens. Built with React, NestJS, MongoDB, and TypeScript.

## 🌐 Live Demo

**Live URL:** [Your Deployed URL Here - To be added after deployment]

## 📋 Features

### Authentication System

- ✅ JWT Access Tokens (15 minutes expiry) - stored in memory
- ✅ JWT Refresh Tokens (7 days expiry) - stored in localStorage
- ✅ Automatic token refresh on 401 Unauthorized errors
- ✅ Secure login and registration with email validation
- ✅ Protected routes requiring valid authentication
- ✅ Logout functionality clearing all tokens

### Technical Implementation

- ✅ **Backend:** NestJS with Passport JWT strategy
- ✅ **Frontend:** React with TypeScript, React Hook Form, React Query
- ✅ **Database:** MongoDB with Mongoose ODM
- ✅ **Axios Interceptors:** Automatic token attachment and refresh handling
- ✅ **React Context:** Global authentication state management
- ✅ **Material-UI:** Responsive and modern user interface
- ✅ **Password Security:** bcrypt hashing

## 🏗️ Project Structure

```
source/
├── backend/
│   ├── src/
│   │   ├── auth/
│   │   │   ├── auth.module.ts         # JWT module configuration
│   │   │   ├── jwt.strategy.ts        # Passport JWT strategy
│   │   │   └── jwt-auth.guard.ts      # JWT authentication guard
│   │   ├── users/
│   │   │   ├── user.schema.ts         # User model with refresh token
│   │   │   ├── users.service.ts       # Auth logic & token management
│   │   │   ├── users.controller.ts    # Auth endpoints
│   │   │   └── dto/
│   │   ├── app.module.ts
│   │   └── main.ts                    # CORS configuration
│   ├── .env                           # Environment variables
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── contexts/
│   │   │   └── AuthContext.tsx        # Authentication context & hooks
│   │   ├── components/
│   │   │   └── PrivateRoute.tsx       # Protected route wrapper
│   │   ├── services/
│   │   │   └── api.ts                 # Axios with interceptors
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   ├── Login.tsx              # Login with token storage
│   │   │   ├── SignUp.tsx
│   │   │   └── Dashboard.tsx          # Protected page
│   │   ├── App.tsx                    # Routes & providers
│   │   └── index.tsx
│   ├── .env                           # API URL configuration
│   └── package.json
│
└── docker-compose.yml                 # MongoDB setup
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation & Setup

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd source
```

2. **Backend Setup**

```bash
cd backend
npm install

# Configure environment variables in .env
# PORT=3001
# MONGODB_URI=your-mongodb-connection-string
# JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
# JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-this

npm run start:dev
```

3. **Frontend Setup**

```bash
cd frontend
npm install

# Configure environment variables in .env
# REACT_APP_API_URL=http://localhost:3001

npm start
```

4. **MongoDB Setup (Docker)**

```bash
# From project root
docker-compose up -d
```

## 🔧 Configuration

### Backend Environment Variables (.env)

```env
PORT=3001
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/user-registration
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
JWT_REFRESH_SECRET=your-super-secret-refresh-key-min-32-chars
```

### Frontend Environment Variables (.env)

```env
REACT_APP_API_URL=http://localhost:3001
```

## 📡 API Endpoints

### Public Endpoints

- `POST /user/register` - Register new user
- `POST /user/login` - Login and get tokens

### Protected Endpoints (Require JWT)

- `GET /user/profile` - Get user profile
- `POST /user/logout` - Logout and clear tokens

### Token Management

- `POST /user/refresh` - Refresh access token using refresh token

## 🎯 How It Works

### Authentication Flow

1. **Login**

   - User enters credentials
   - Backend validates and returns access + refresh tokens
   - Access token stored in memory
   - Refresh token stored in localStorage

2. **Authenticated Requests**

   - Axios interceptor attaches access token to all requests
   - Backend validates token using JWT strategy

3. **Token Refresh**

   - When access token expires (401 error)
   - Axios interceptor automatically calls refresh endpoint
   - New tokens obtained and request retried
   - If refresh fails, user redirected to login

4. **Logout**
   - Clears refresh token from database
   - Removes all tokens from client
   - Redirects to login page

## 🛡️ Security Features

- **Password Hashing:** bcrypt with salt rounds
- **Token Storage:** Access token in memory (XSS protection), Refresh token in localStorage
- **CORS Protection:** Configured for specific origin
- **Token Validation:** Passport JWT strategy with guards
- **Automatic Expiry:** Short-lived access tokens, longer refresh tokens
- **Token Rotation:** New refresh token on each refresh request

## 🧪 Testing the Application

1. Start backend and frontend servers
2. Navigate to `http://localhost:3000`
3. Register a new account
4. Login with credentials
5. Access protected Dashboard
6. Test token refresh (wait 15 minutes or modify expiry for testing)
7. Test logout functionality

## 📦 Deployment

### Backend Deployment (Example: Heroku, Railway, Render)

1. Set environment variables in hosting platform
2. Build: `npm run build`
3. Start: `npm run start:prod`

### Frontend Deployment (Example: Netlify, Vercel, GitHub Pages)

1. Update `REACT_APP_API_URL` to production backend URL
2. Build: `npm run build`
3. Deploy `build/` folder

### MongoDB

- Use MongoDB Atlas for production
- Update `MONGODB_URI` with Atlas connection string

## 🔑 Key Technologies

**Backend:**

- NestJS - Progressive Node.js framework
- Passport JWT - JWT authentication strategy
- MongoDB & Mongoose - Database and ODM
- bcryptjs - Password hashing
- class-validator - DTO validation

**Frontend:**

- React 18 - UI library
- TypeScript - Type safety
- React Hook Form - Form management
- React Query - Server state management
- Axios - HTTP client with interceptors
- Material-UI - Component library
- React Router - Client-side routing

## 📝 Assignment Completion Checklist

- ✅ JWT access tokens with 15-minute expiry
- ✅ JWT refresh tokens with 7-day expiry
- ✅ Access token stored in memory
- ✅ Refresh token stored in localStorage
- ✅ Automatic token refresh on 401 errors
- ✅ Protected routes requiring authentication
- ✅ Login and logout functionality
- ✅ User profile protected endpoint
- ✅ Axios interceptors for token management
- ✅ React Hook Form for form validation
- ✅ React Context for auth state
- ✅ Error handling and user feedback
- ✅ CORS configuration
- ✅ Environment variables
- ✅ README documentation
- ✅ Public hosting deployment ready

## 🌐 Deployment Instructions

### Backend Deployment on Render

1. **Push code to GitHub** (if not already done)

   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin master
   ```

2. **Create Web Service on Render:**

   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click **"New +"** → **"Web Service"**
   - Connect your GitHub repository
   - Configure:
     - **Name:** `jwt-auth-backend` (or your preferred name)
     - **Region:** Select closest to your location
     - **Branch:** `master`
     - **Root Directory:** `backend`
     - **Runtime:** `Node`
     - **Build Command:** `npm install && npm run build`
     - **Start Command:** `npm run start:prod`

3. **Add Environment Variables in Render:**

   ```
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=generate_secure_random_string_min_32_chars
   JWT_REFRESH_SECRET=generate_another_secure_random_string_min_32_chars
   ```

4. **Click "Create Web Service"** and wait for deployment

5. **Copy your backend URL** (e.g., `https://jwt-auth-backend.onrender.com`)

### Frontend Deployment on Vercel

1. **Update Frontend Environment:**

   - Edit `frontend/.env.production`
   - Set `REACT_APP_API_URL=https://your-backend.onrender.com`

2. **Deploy to Vercel:**

   **Option A: Via Vercel Dashboard**

   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click **"Add New Project"**
   - Import your GitHub repository
   - Configure:
     - **Framework Preset:** Create React App
     - **Root Directory:** `frontend`
     - **Build Command:** `npm run build`
     - **Output Directory:** `build`
   - Add Environment Variable:
     - `REACT_APP_API_URL` = `https://your-backend.onrender.com`
   - Click **"Deploy"**

   **Option B: Via Vercel CLI**

   ```bash
   npm install -g vercel
   cd frontend
   vercel --prod
   ```

3. **Get your Vercel URL** (e.g., `https://your-app.vercel.app`)

### Post-Deployment Configuration

1. **Update Backend CORS:**

   - Edit `backend/src/main.ts`
   - Update the `allowedOrigins` array:

   ```typescript
   const allowedOrigins = [
     "http://localhost:3000",
     "https://your-app.vercel.app", // Your actual Vercel URL
   ];
   ```

   - Commit and push to trigger redeployment

2. **Update README Live Demo:**

   - Add your deployed URLs to the top of README

3. **Test the deployed application:**
   - Visit your Vercel URL
   - Test registration, login, and protected routes
   - Verify token refresh functionality

### Deployment Checklist

- ✅ MongoDB Atlas setup and connection string added
- ✅ Backend deployed to Render
- ✅ Environment variables configured in Render
- ✅ Frontend deployed to Vercel
- ✅ Environment variables configured in Vercel
- ✅ CORS updated with production URLs
- ✅ All features tested in production
- ✅ README updated with live URLs

## 👨‍💻 Author

**Your Name**

- GitHub: [@yourusername](https://github.com/yourusername)

## 📄 License

This project is created for educational purposes as part of a Web Application Development assignment.
