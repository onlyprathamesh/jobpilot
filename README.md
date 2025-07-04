# JobPilot 🚀

JobPilot is a job application tracking web app designed to help job seekers manage applications, set follow-up reminders, and visualize their job hunt progress.

## 🛠️ Tech Stack

- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Authentication**: JWT (planned)
- **Frontend**: React.js (coming soon)

## ✅ Current Features

- User Registration & Login (with hashed passwords)
- Job CRUD operations
- Status tracking (Applied, Rejected, Shortlisted)
- Structured job schema
- Basic backend setup

## 🔮 Coming Soon
- JWT-based authentication with route protection
- Individual user job data
- Reminder cron jobs
- Dashboard & charts

## 📦 Setup Instructions

```bash
git clone https://github.com/onlyprathamesh/jobpilot.git
cd jobpilot
npm install

cd server
## Create a .env file inside server folder with:
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret

## Then run
npm start