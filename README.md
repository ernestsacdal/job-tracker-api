AI-Powered Job Tracker
A modern, fullstack web app to help you efficiently track job applications, manage your job hunt, and leverage AI to generate custom cover letters and resume blurbs—all in a streamlined, user-friendly experience.

🚀 Features
User Authentication: Secure sign up, login, and account management (JWT-based).

Job Application Tracking: Add, edit, and track applications with fields for company, job title, application link, status, notes, and more.

AI-Powered Writing:

Generate tailored cover letters using GPT by pasting job descriptions and your resume highlights.

Auto-generate personalized resume bullet points for each job/project.

Timeline & Reminders: Timeline view and status tracking for every application, plus reminders for follow-ups.

Search & Filter: Quickly find and organize applications by company, title, tags, or stage.

Modern UI: Responsive, accessible design with intuitive navigation.

📚 Table of Contents
Screenshots

Tech Stack

Getting Started

Data Model

API Overview

Roadmap

Contributing

License

🖼️ Screenshots
Add screenshots or GIFs here to show off the main pages and features!

🛠️ Tech Stack
Frontend: React (or Next.js), TypeScript, Tailwind CSS

Backend: Express.js, TypeScript, Prisma ORM

Database: PostgreSQL (hosted by Supabase/Neon free tier)

Authentication: JWT (JSON Web Token)

AI Integration: OpenAI API (GPT)

Deployment: Vercel/Netlify (frontend), Render/Fly.io (backend)

🚦 Getting Started
Prerequisites
Node.js (v18+ recommended)

Yarn or npm

PostgreSQL database (use Supabase or Neon for free cloud hosting)

OpenAI API key (sign up here)

Installation
Clone the repo:

bash
git clone https://github.com/yourusername/ai-job-tracker.git
cd ai-job-tracker
Install dependencies:

bash
yarn install
Configure environment:

Copy .env.example to .env and fill in required values (see below).

Set up the database:

bash
npx prisma migrate dev --name init
Start the server:

bash
yarn dev
Example .env file
text
DATABASE_URL=postgresql://username:password@host:port/dbname
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=sk-xxxxxx
🗄️ Data Model
User

id, email, password (hashed), createdAt

JobApplication

id, userId, jobTitle, company, link, status (APPLIED/INTERVIEW/OFFER/REJECTED), notes, jobDesc, dateApplied, reminderDate, createdAt, updatedAt

ResumeBlurb

id, jobAppId, content, createdAt

CoverLetter

id, jobAppId, content, createdAt

(Optional: Reminder, Referral, etc.)

📝 API Overview
Endpoint	Method	Description
/api/auth/register	POST	Register a new user
/api/auth/login	POST	Login user, receive JWT
/api/jobs	GET	List all job applications (for user)
/api/jobs	POST	Add new job application
/api/jobs/:id	PUT	Edit job application
/api/jobs/:id	DELETE	Delete job application
/api/generate/cover-letter	POST	AI-generated cover letter
/api/generate/resume-blurb	POST	AI-generated resume bullet points
See docs/ for full API details (if included).

🛣️ Roadmap
 User authentication (JWT)

 Job application CRUD

 AI-powered cover letter and resume blurb generation

 Status tracking & reminders

 Analytics dashboard

 PDF export

 LinkedIn/Indeed integration

 AI interview prep

👥 Contributing
Contributions welcome!
Please open issues or pull requests to discuss changes.

📄 License
MIT

Demo: [live link if available]
Contact: [your email or LinkedIn]

