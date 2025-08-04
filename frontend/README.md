# URL Shortener 🔗

A modern, full-stack URL shortener application built with React and Node.js. Create short, shareable links with optional custom slugs, user authentication, and a beautiful, responsive interface.

## ✨ Features

- **🔗 URL Shortening**: Convert long URLs into short, shareable links
- **🎯 Custom Slugs**: Authenticated users can create custom short URLs
- **👤 User Authentication**: Secure login/signup with JWT tokens
- **📊 URL Management**: View and manage all your created URLs
- **🎉 Delightful UX**: Confetti animations and smooth interactions
- **📱 Responsive Design**: Works perfectly on desktop and mobile
- **⚡ Real-time Updates**: Automatic URL list refresh using TanStack Query
- **📋 One-click Copy**: Easy copying of shortened URLs to clipboard

## 🛠️ Tech Stack

### Frontend

- **React 19** - Modern UI library
- **TanStack Router** - Type-safe routing
- **TanStack Query** - Server state management
- **Redux Toolkit** - Global state management
- **Tailwind CSS** - Utility-first styling
- **Vite** - Fast build tool
- **Canvas Confetti** - Celebration animations

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **nanoid** - Short ID generation

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd url-shortener
   ```

2. **Install backend dependencies**

   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**

   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Setup**

   Create `.env` file in the backend directory:

   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/urlshortener
   JWT_SECRET=your-super-secret-jwt-key
   BASE_URL=http://localhost:3000/
   NODE_ENV=development
   ```

5. **Start the application**

   Backend (from backend directory):

   ```bash
   npm run dev
   ```

   Frontend (from frontend directory):

   ```bash
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

## 📁 Project Structure

```
url-shortener/
├── backend/
│   ├── src/
│   │   ├── config/          # Database and app configuration
│   │   ├── controllers/     # Route controllers
│   │   ├── dao/            # Data access objects
│   │   ├── middleware/     # Custom middleware
│   │   ├── models/         # MongoDB models
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   └── utils/          # Utility functions
│   ├── package.json
│   └── server.js           # Entry point
├── frontend/
│   ├── src/
│   │   ├── api/            # API calls
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── redux/          # Redux store and slices
│   │   ├── routes/         # Route definitions
│   │   └── utils/          # Utility functions
│   ├── package.json
│   └── index.html
└── README.md
```

## 🔧 API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### URL Shortening

- `POST /api/short-url/create` - Create short URL
- `GET /api/short-url/my-urls` - Get user's URLs (authenticated)
- `GET /:shortId` - Redirect to original URL

## 🎨 Features in Detail

### URL Shortening

- **Anonymous Users**: Can create short URLs with auto-generated IDs
- **Authenticated Users**: Can create custom slugs and manage their URLs
- **Validation**: Ensures URLs are valid and custom slugs are unique

### User Authentication

- **Secure**: JWT tokens with 24-hour expiration
- **Persistent**: Redux state management for login persistence
- **Protected Routes**: Automatic redirection for unauthorized access

### User Experience

- **Real-time Updates**: URL list refreshes automatically after creation
- **Visual Feedback**: Confetti animation on successful URL creation
- **Responsive Design**: Optimized for all screen sizes
- **Accessibility**: Proper ARIA labels and keyboard navigation

## 🔒 Security Features

- Password hashing with bcrypt
- HTTP-only cookies for JWT storage
- CORS configuration for cross-origin requests
- Input validation and sanitization
- Protected API routes with authentication middleware

## 🚀 Deployment

### Backend Deployment

1. Set environment variables for production
2. Use a cloud MongoDB service (MongoDB Atlas)
3. Deploy to platforms like Heroku, Railway, or DigitalOcean

### Frontend Deployment

1. Build the production bundle: `npm run build`
2. Deploy to Vercel, Netlify, or any static hosting service
3. Update API base URL for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with modern React patterns and best practices
- Inspired by popular URL shortening services
- Thanks to the open-source community for amazing tools and libraries

---

**Made with ❤️ and lots of ☕**
