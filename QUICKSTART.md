# 🚀 Quick Start Guide

## Local Development

### 1. Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account (or local MongoDB)
- Git installed

### 2. Clone & Install

```bash
# Clone repository
git clone https://github.com/TNhanTis/IA07-React-Authentication-with-JWT-Access-Refresh-.git
cd IA07-React-Authentication-with-JWT-Access-Refresh-/source

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 3. Configure Environment Variables

**Backend (.env):**
```bash
cd backend
# Create .env file and add:
PORT=3001
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your-secret-min-32-chars
JWT_REFRESH_SECRET=your-refresh-secret-min-32-chars
```

**Frontend (.env):**
```bash
cd frontend
# Create .env file and add:
REACT_APP_API_URL=http://localhost:3001
```

### 4. Run Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run start:dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

### 5. Access Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

---

## Production Deployment

### Quick Deploy Steps:

1. **Backend to Render:**
   - Create Web Service on Render
   - Connect GitHub repo
   - Set root directory: `backend`
   - Add environment variables
   - Deploy

2. **Frontend to Vercel:**
   - Create project on Vercel
   - Connect GitHub repo
   - Set root directory: `frontend`
   - Add `REACT_APP_API_URL` env variable
   - Deploy

3. **Update CORS:**
   - Add Vercel URL to `backend/src/main.ts`
   - Redeploy backend

📖 **Detailed guide:** See [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## Test the Application

### 1. Register New User
- Go to http://localhost:3000/signup
- Enter email and password
- Submit

### 2. Login
- Go to http://localhost:3000/login
- Enter credentials
- You'll be redirected to Dashboard

### 3. View Protected Dashboard
- See your user profile
- Check localStorage for refresh token
- Check that access token works

### 4. Test Token Refresh
- Wait 15+ minutes (or modify token expiry to 1 minute for testing)
- Make an API request
- Should auto-refresh without logout

### 5. Logout
- Click logout button
- Tokens should be cleared
- Redirected to login

---

## Troubleshooting

**Backend won't start:**
- Check MongoDB connection string
- Verify all env variables are set
- Check port 3001 is not in use

**Frontend can't connect to backend:**
- Verify backend is running on port 3001
- Check `REACT_APP_API_URL` in frontend `.env`
- Check browser console for CORS errors

**MongoDB connection error:**
- Verify connection string format
- Check network access in MongoDB Atlas
- Ensure IP whitelist includes your IP or 0.0.0.0/0

---

## Useful Commands

```bash
# Backend
npm run start:dev    # Development mode with hot reload
npm run build        # Build for production
npm run start:prod   # Run production build

# Frontend
npm start            # Development mode
npm run build        # Build for production
npm test             # Run tests
```

---

## Project Structure

```
source/
├── backend/              # NestJS backend
│   ├── src/
│   │   ├── auth/        # JWT authentication
│   │   ├── users/       # User management
│   │   └── main.ts      # Entry point
│   └── .env             # Environment variables
│
├── frontend/            # React frontend
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── context/     # Auth context
│   │   ├── hooks/       # Custom hooks
│   │   ├── pages/       # Page components
│   │   └── services/    # API service
│   └── .env             # Environment variables
│
└── docker-compose.yml   # MongoDB container (optional)
```

---

## Next Steps

- ✅ Complete local development setup
- ✅ Test all features locally
- ⬜ Deploy backend to Render
- ⬜ Deploy frontend to Vercel
- ⬜ Update README with live URLs
- ⬜ (Optional) Add custom domain
- ⬜ (Optional) Setup monitoring

---

**Happy Coding! 🎉**
