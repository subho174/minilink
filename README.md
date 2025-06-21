# MiniLink - URL Shortener

MiniLink is a modern full-stack URL shortener that allows users to create, manage, and track shortened URLs with click analytics and QR code support.

---

## 🌐 Tech Stack

- _Frontend_: React + Vite + ShadCN UI
- _Backend_: Node.js + Express
- _Database_: MongoDB
- _Auth_: Access & Refresh Tokens (HTTP-only Secure Cookies)
- _Deployment_: Vercel (Frontend) & Render (Backend)

---

## 📁 Folder Structure

├── client/ # React frontend (Vite)
└── server/ # Express backend

---

## ⚙ Setup Instructions

### 1. Clone the Repo

bash
git clone https://github.com/subho174/minilink.git

### 2. Backend Setup

bash
cd server
npm install

Create a .env file inside the server/ folder:

env
PORT=5000
CORS_ORIGIN=https://minilink-web.vercel.app
MONGODB_URI=your_mongodb_uri
ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=7d

Start the backend server:

bash
npm start

---

### 3. Frontend Setup

bash
cd ../client
npm install

Create a .env file inside the client/ folder:

env
VITE_BACKEND_URL=https://minilink-node.onrender.com

Start the frontend:

bash
npm run dev

Build for production:

bash
npm run build

---

## 📌 API Documentation

### Auth

- _POST_ /user/sign-up – Create new user  
   _Request Body_:
  json
  {
  "email": "test@example.com",
  "password": "12345678"
  }
  _Response_:
  json
  {
  "statusCode": 201,
  "data": null,
  "message": "Registration successsful"
  }

- _POST_ /user/sign-in – sign in user  
  _Request Body_:
  json
  {
  "email": "test@example.com",
  "password": "12345678"
  }
  _Response_:
  json
  {
  "statusCode": 200,
  "data": null,
  "message": "Logged In successsfully"
  }
  _Effect_: Sets accessToken and refreshToken in cookies

- _POST_ /user/logout – Logout user  
  _Response_:
  json
  {
  "statusCode": 200,
  "data": null,
  "message": "Logged Out successfully"
  }
  _Effect_: Clears cookies and invalidates refresh token

---

### URL Shortening

- _POST_ /url/create-short-url  
   _Request Body_:
  json
  {
  "originalURL": "https://daily.dev/blog/full-stack-development-complete-guide-2024",
  "customCode": "web-dev" // optional
  }
  _Response_:
  json
  {
    "statusCode": 201,
    "data": {
        "originalURL": "https://daily.dev/blog/full-stack-development-complete-guide-2024",
        "uniqueCode": "web-dev",
        "clickCount": 0,
        "createdBy": "6856909dca3574c130ba37c8",
        "_id": "685694a2ca3574c130ba37dc",
        "expiresAt": "2025-06-28T11:16:50.447Z",
        "__v": 0
    },
    "message": "Created Short URL successfully"
  }

- _GET_ /url/:uniqueCode – Redirects to original URL

- _GET_ /url/analytics/click-stats
  _Returns_: List of URLs created by the user with stats
  _Response_:
  json
  {
    "statusCode": 200,
    "data": [
        {
        "_id": "685694a2ca3574c130ba37dc",
        "originalURL": "https://daily.dev/blog/full-stack-development-complete-guide-2024",
        "uniqueCode": "web dev",
        "clickCount": 6,
        "expiresAt": "2025-06-28T11:16:50.447Z",
        "__v": 0,
        "lastClickedAt": "2025-06-21T11:28:09.498Z"
        }
    ],
    "message": "Short URL stats found"
  }

---

## 🧪 Testing

- Basic unit tests are included using jest and supertest inside server/tests.
- Run tests:
  bash
  cd server
  npm test

---

## 🧠 Database Schema

user.model.js

{
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    trim: true,
    required: [true, "Password is required"],
    select: false,
  },
  refreshToken: {
    type: String,
    select: false,
  },
}

url.model.js

  {
    originalURL: {
      type: String,
      trim: true,
      required: [true, "Original URL is required"],
    },
    uniqueCode: {
      type: String,
      unique: true,
    },
    clickCount: {
      type: Number,
      default: 0,
    },
    lastClickedAt: Date,
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      select: false,
    },
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      index: { expires: 0 }, // this has created a TTL index , now docs containing expiresAt less than current time, will be auto deleted
      select: false,
    },
  }


No migration tool used — MongoDB handles schema-less structure, but schema is enforced via Mongoose.

---

## 🔗 Postman Collection

A Postman collection is provided to test all API endpoints.

- File: [minilink.postman_collection.json](./minilink.postman_collection.json)
- To use:
  1. Open Postman
  2. Click “Import”
  3. Upload this file
  4. Use the predefined requests

---

## 🔐 Environment Variables (Summary)

### server/.env

PORT=5000
CORS_ORIGIN=https://minilink-web.vercel.app
MONGODB_URI=your_mongodb_uri
ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=7d

### client/.env

VITE_BACKEND_URL=https://minilink-node.onrender.com

---

## 🚀 Deployed Links

- _Frontend_: https://minilink-web.vercel.app
- _Backend_: https://minilink-node.onrender.com


