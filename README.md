 Project by
Mohamed Jiyavudeen, Ayyappan, Stalin & Prabhu
 Department of Computer Science, K.S.K College of Engineering and Technology
________________________________________
 Overview
The Feedback Collection System is a web-based platform designed for colleges to collect student feedback easily and securely.
Students can submit their feedback online, and teachers/admins can view all responses through a protected dashboard.
This project was developed as part of the NAAN MUDHALVAN 3rd Year Project.
________________________________________
 Features
✅ Student Feedback Form (Name, Roll No, Department, Phone, Parents No)
✅ MongoDB Database for Secure Storage
✅ Admin Dashboard to View Feedback
✅ Department-Wise Feedback Display
✅ Token-Based Admin Authentication (Secure Access)
✅ Built with Node.js and Express.js Backend
✅ Simple and Clean Frontend (HTML, CSS, JS)
________________________________________
🏗️ Project Structure
📁 FEEDBACK
 ┣ 📁 public              → Frontend files (HTML, CSS, JS)
 ┣ 📁 models
 ┃ ┣ 📄 feedback.js       → Mongoose Model
 ┃ ┗ 📁 routes
 ┃    ┣ 📄 feedback.js    → Feedback Routes
 ┃    ┗ 📄 admin.js       → Admin Routes
 ┣ 📄 server.js            → Main server file
 ┣ 📄 .env                 → Environment variables
 ┣ 📄 package.json         → Dependencies & scripts
 ┗ 📄 README.md            → Project description
________________________________________
⚙ Tech Stack
•	Frontend: HTML, CSS, JavaScript
•	Backend: Node.js, Express.js
•	Database: MongoDB (Mongoose)
•	Security: Helmet, CORS, dotenv
•	Version Control: Git & GitHub
________________________________________
🧾 Installation Guide
1️⃣ Clone the Repository
git clone https://github.com/MohamedJiyavudeen/FEEDBACK.git
cd FEEDBACK
2️⃣ Install Dependencies
npm install
3️⃣ Create a .env File
Add the following inside it:
MONGO_URI=your_mongodb_connection_string
ADMIN_TOKEN=xyz123
PORT=5000
CLIENT_ORIGIN=http://localhost:5000
4️⃣ Run the Server
node server.js
✅ The server will start at
👉 http://localhost:5000
________________________________________
🧑 How It Works
1️⃣ Students open the feedback page and submit their feedback.
2️⃣ Data is securely stored in MongoDB.
3️⃣ Admins log in using the admin token to access the feedback dashboard.
________________________________________
 Future Enhancements
•	 Email Notifications for Admins
•	 Export Feedback as PDF or Excel
•	 Multi-admin Login System
•	 Responsive Mobile Layout
________________________________________
🧑 Team Members
Name	Role
Mohamed Jiyavudeen	Backend Developer
Ayyappan	Frontend Developer
Stalin	UI/UX & Database
Prabhu	Documentation & Testing
________________________________________
Institution
K.S.K College of Engineering and Technology
Department of Computer Science
