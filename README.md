# 📝 AI-Powered Job Tracker API

A modern, full-featured backend for tracking job applications, powered by **TypeScript**, **Express**, **Prisma**, **JWT Auth**, and **Perplexity AI** for cover letter and resume blurb generation.

---

## 🚀 Features

- **User Authentication**: Secure JWT-based registration and login  
- **Job Application Management**: Create, update, delete, and list job applications  
- **Reminders**: Set and fetch follow-up dates for each job  
- **AI Writing**: Generate tailored cover letters and resume blurbs using Perplexity AI  
- **Analytics**: Track stats like applications, interviews, offers, and more  
- **Soft Delete**: Safely archive job applications without data loss  
- **API Documentation**: Interactive Swagger UI at `/docs`  
- **TypeScript & Zod**: Full end-to-end type safety and validation  

---

## 📚 API Documentation

Visit [http://localhost:3000/docs](http://localhost:3000/docs) after starting the server to access the interactive Swagger UI.

---

## 🏗️ Tech Stack

- **Backend**: Node.js, Express, TypeScript  
- **Database**: PostgreSQL (via Prisma ORM)  
- **Auth**: JWT, bcrypt  
- **Validation**: Zod  
- **AI Integration**: Perplexity API (Sonar models)  
- **Docs**: Swagger

---

## ⚡ Quick Start

```bash
# 1. Clone the repo
git clone https://github.com/yourusername/job-tracker-api.git
cd job-tracker-api

# 2. Install dependencies
yarn install

# 3. Copy and edit environment variables
cp .env.example .env
# Edit .env with your database, JWT, and Perplexity API keys

# 4. Run database migrations
npx prisma migrate dev

# 5. Start the server
yarn run start

# 6. Access Swagger docs
http://localhost:3000/docs
```

---
## 📣 License
MIT


