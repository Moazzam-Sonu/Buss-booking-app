

### **Frontend Repo (Buss-Booking-App) - `README.md`**  

# 🚌 Bus Booking App (React Native)  

A mobile app for booking bus tickets in Pakistan, built with **React Native** for Android.  

## ✨ Features  
- Google & Phone Number Authentication  
- Search buses by route (Karachi-Islamabad, Lahore, etc.)  
- Seat selection & ticket booking  
- Past bookings history  
- Responsive UI  

## 📸 Screenshots  
| Sign In | Bus Search | Departure Cities |
|---------|------------|------------------|
| ![Sign In](https://github.com/user-attachments/assets/d6b39ca8-b965-406f-82b2-7e5e4ceeb254) | ![Bus Search](https://github.com/user-attachments/assets/595b5572-de5b-4039-8e43-51d28ca78731) | ![Departure Cities](https://github.com/user-attachments/assets/f715d719-f164-4aea-861e-1e30e86f750b) |
| **Available Buses** | **Seat Selection** | **Ticket Confirmation** |
| ![Available Buses](https://github.com/user-attachments/assets/0346b9ae-845b-4030-9a2a-2555bc3838f9) | ![Seat Selection](https://github.com/user-attachments/assets/a52ae800-c800-41dd-86ea-098a8303204e) | ![Ticket Confirmation](https://github.com/user-attachments/assets/346aed08-364b-4442-b6c0-9137c0e1980f) |
## 🛠️

Tech Stack  
- **Frontend**: React Native, Expo (optional)  
- **State Management**: Context API / Redux  
- **Styling**: React Native Stylesheet  
- **Backend**: [Node.js API](https://github.com/Moazzam-Sonu/Bus-Booking-Backend)  

## 🔧 Setup  
1. Clone the repo:  
   ```bash
   git clone https://github.com/Moazzam-Sonu/Buss-Booking-App.git
   cd Buss-Booking-App
   ```
2. Install dependencies:  
   ```bash
   npm install
   ```
3. Run the app (Android):  
   ```bash
   npx react-native run-android
   ```

## 📌 Notes  
- Backend must be running for full functionality.  

## 🤝 Credits  
- UI Inspiration: [Ritik Prasad]
- Admin Panel: AdminJS  

---


---

### **Backend Repo (Bus-Booking-Backend) - `README.md`**  

# 🚍 Bus Booking Backend (Node.js)  

A RESTful API for the Bus Booking App, built with **Node.js**, **Express**, and **MongoDB**.  

## 🔥 Features  
- JWT Authentication (Google & Phone OTP)  
- CRUD for Buses, Routes, Tickets  
- Admin Dashboard (AdminJS)  
- PNR & Ticket Generation  

## 📊 Database Schema  
- **Users**: `{ phone, email, name, bookings: [] }`  
- **Buses**: `{ busId, name, type (AC/Non-AC), seats, route, timings }`  
- **Tickets**: `{ PNR, userId, busId, seats, amount, status }`  

## 🛠️ Tech Stack  
- **Backend**: Node.js, Express  
- **Database**: MongoDB (Mongoose)  
- **Admin Panel**: AdminJS  
- **Auth**: Firebase (Google), Twilio (OTP)  

## 🚀 Setup  
1. Clone the repo:  
   ```bash
   git clone https://github.com/Moazzam-Sonu/Bus-Booking-Backend.git
   cd Bus-Booking-Backend
   ```
2. Install dependencies:  
   ```bash
   npm install
   ```

4. Start the server:  
   ```bash
   npm start
   ```

## 📌 API Endpoints  
| Method | Endpoint          | Description            |  
|--------|-------------------|------------------------|  
| POST   | `/api/auth/google` | Google Login           |  
| POST   | `/api/auth/otp`    | Send/Verify OTP        |  
| GET    | `/api/buses`       | Search Buses           |  
| POST   | `/api/tickets`     | Book Ticket            |  

3. Configure environment variables (`.env`):  
  
`MONGO_URI=
GOOGLE_CLIENT_ID=
ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=
COOKIE_PASSWORD=
ADMIN_LOGIN_EMAIL=
ADMIN_LOGIN_PASSWORD=
PORT=5000`
```
---
