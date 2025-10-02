# Job Portal

A full-stack job portal for NGOs and job seekers.

## Features
- NGO registration and verification
- Admin dashboard for user and class management
- User dashboard for profile, job history, and classes
- Browse and apply for jobs
- Class enrollment and progress tracking

## Getting Started

### Prerequisites
- Node.js
- MongoDB Atlas account

### Setup
1. Clone the repository.
2. Install dependencies for both frontend and backend:
   ```bash
   cd job-portal/backend
   npm install
   cd ../frontend
   npm install
   ```
3. Create a `.env` file in the `backend` folder with your MongoDB connection string:
   ```
   MONGODB_URI=mongodb+srv://ismaeelcozyn:hello@cluster0.1me6pzu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   ```
4. Start the backend:
   ```bash
   npm run dev
   ```
5. Start the frontend:
   ```bash
   npm start
   ```

## Usage
- Register as a user via the NGO portal.
- Admins can log in and manage users and classes.
- Users can edit their profile, view job history, and manage class enrollment.

## License
MIT
