# 📘 SkillSieve – Internship & Career Skill Intelligence Platform
Skill Matching • Resume Analysis • Smart Internship Discovery

## 🚀 1. Project Overview
SkillSieve is a platform designed to help students and fresh graduates find the best-fit internships based on their skills, interests, and learning potential.

Most internship platforms only list opportunities.
SkillSieve goes beyond that by offering:

Intelligent skill-based matching

Highlighting missing skills

Personalized learning paths

Admin-managed internship postings

(Future) AI-powered resume insight generation

## 🔍 2. Problem Statement

Students struggle with:

❌ Not knowing what internships fit their skill set
❌ Not knowing which skills they lack
❌ Too many generic internship portals without personalization
❌ No way to analyze resume strengths/weaknesses

SkillSieve solves this by:

✔ Upload/enter skills manually
✔ AI / algorithmic matching with internship requirements
✔ Match scores & missing skill analysis
✔ Admin-driven verified internship postings

## 🧩 3. System Architecture
Architecture Flow
Next.js Frontend → Express.js Backend → MongoDB (Prisma ORM)
                        ↓
                     JWT Auth
                        ↓
                 (Future) OpenAI API

Components
Layer	Technology
Frontend	Next.js (App Router), React
Backend	Express.js (API Routes)
Database	MongoDB Atlas (Prisma ORM)
Authentication	JWT, Google OAuth (future)
Hosting	Vercel (Frontend), Render (Backend)
AI	OpenAI API (future enhancement)


## 🎯 4. Key Features
⭐ User Authentication

Email + Password

Token-based session (JWT)

Admin role support

⭐ User Profile & Skills

Manage basic profile

Add/Edit/Delete skills

Skill auto-selection using dropdown

(Future) Resume upload → auto skill extraction

⭐ Smart Internship Matching

Match score for every internship

Highlight:

✔ Matched skills

❗ Missing skills

Pagination, search, sorting

User-based relevance

⭐ Internships Module

Admin can:

Create internships

Update internships

Delete internships

Public:

View internships

Filter by skills

Sort by relevance (match score)

⭐ Admin Controls

Admin dashboard

Internship CRUD operations

Seed internships for testing

⭐ Future Features

Resume parser via OpenAI

Learning recommendations

AI career assistant

Career predictions

Skill progress tracker

ATS-style internship application tracking

## 🛠 5. Tech Stack
Frontend	Next.js, React.js
Backend	Express.js
Database	MongoDB Atlas, Prisma ORM
Authentication	JWT, Google OAuth (Future)
Hosting	Vercel (Frontend), Render (Backend)
AI (Future)	OpenAI API


## 📡 6. API Documentation
🔐 Auth Routes
Method	Endpoint	Description
POST	/api/auth/register	Register new user
POST	/api/auth/login	Login user & return JWT
👤 User Profile
Method	Endpoint	Description
GET	/api/profile	Get logged-in user profile
PUT	/api/profile	Update profile
🧠 Skills
Method	Endpoint	Description
POST	/api/skills/save	Add/update skills
DELETE	/api/skills/delete	Remove skills
💼 Internships (Public + Admin)
Method	Endpoint	Description
GET	/api/internships/list	Paginated, sorted, filtered internships
GET	/api/internships/:id	Get single internship
POST	/api/internships/create	Create internship (Admin)
PUT	/api/internships/update/:id	Update internship (Admin)
PATCH	/api/internships/update-skills/:id	Update skills only
DELETE	/api/internships/delete/:id	Delete internship
DELETE	/api/internships/delete-all	Reset internships (Admin)
GET	/api/internships/seed	Seed sample internships
🎯 Matching Engine
Method	Endpoint	Description
GET	/api/match	Match internships → returns match score, matched/missing skills, pagination, sorting
🤖 AI Endpoints (Future Implementation)
Method	Endpoint	Description
POST	/api/ai/skills	Extract skills from resume
POST	/api/ai/match	AI-based job matching
GET	/api/ai/learning-path	Recommend courses to bridge skill gaps


## 📝 7. CRUD Operations Implemented
✔ Users:

Create → register user

Read → get profile

Update → update profile

Delete → N/A (not required)

✔ Skills:

Create → save skills

Read → get user skills (profile)

Update → overwrite skills

Delete → delete skill set

✔ Internships:

Create → admin create internship

Read → listing + single internship

Update → full update & patch skills

Delete → delete single + delete all

This satisfies minimum 2 Create, 2 Read, 2 Update, 2 Delete operations.

## 🔍 8. Pagination, Search & Sorting

Implemented in:
Internships API

?page=1&limit=5

?search=react

?sortBy=company&order=asc

?skill=JavaScript

Matched Internships API

?page=2

?sortBy=matchScore

?order=desc

?search=developer

All features verified via Thunder Client, Network tab, and frontend UI.

## 🌐 9. Deployment Links
Component	        URL
Frontend (Vercel)	https://skillsieve.vercel.app

Backend (Render)	https://skillsieve.onrender.com

Database	        MongoDB Atlas

## 🎥 10. Demo Flow

Register/Login

Click Start Analyzing

Add skills

Navigate to “Opportunities” page

View real-time match scores

Filter, search, sort internships

View matched/missing skills

For Admin: Create, update, delete internships

Verify CRUD + pagination via Thunder Client

## 🔮 11. Future Enhancements

AI resume parser (OpenAI)

Personalized learning paths

Skill gap recommendations

Gamified skill growth tracking

ATS-style application tracking

AI career coach & predictions