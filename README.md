# Project VOCSO Tech Next

A secure authentication demo application built with Next.js, Node.js, and Auth0. This project showcases user authentication using Google OAuth2, token retrieval, and email notification of access tokens. The frontend is deployed on Vercel, and the backend runs on Render, demonstrating a full-stack deployment with a monorepo structure.

## Live Demo

https://project-vocso-tech-next.vercel.app/

![image](https://github.com/user-attachments/assets/effe192a-cc4d-4d95-9322-1fbf5ea8b0b2)


## Features
- **User Authentication**: Log in securely using Google OAuth2 via Auth0.
- **Token Management**: Fetches an access token post-login and sends it to the backend.
- **Email Notification**: Backend emails the access token to a specified Gmail address (`iknowhanu22@gmail.com`).
- **Responsive UI**: Built with Tailwind CSS for a modern, mobile-friendly design.
- **Full-Stack Integration**: Frontend (Next.js) and backend (Node.js/Express) work seamlessly together.
- **Deployment**: Hosted on Vercel (frontend) and Render (backend) with a monorepo setup.

## Tech Stack
- **Frontend**: Next.js, auth0, Tailwind CSS
- **Backend**: Node.js, Express, Nodemailer, JWT
- **Authentication**: Auth0 with Google OAuth2
- **Deployment**: Vercel (frontend), Render (backend)
- **Version Control**: Git, GitHub

## Project Structure
project--vocso-tech-next/
├── frontend/               # Next.js frontend
│   ├── pages/             # Pages Router for routes
│   ├── public/            # Static assets
│   ├── .gitignore         # Git ignore for frontend
│   └── package.json       # Frontend dependencies
├── backend/                # Node.js/Express backend
│   ├── server.js          # Main backend file
│   ├── .gitignore         # Git ignore for backend
│   └── package.json       # Backend dependencies
├── .gitignore             # Root-level git ignore
└── README.md              # This file


## Prerequisites
- Node.js (v16 or higher)
- npm
- Auth0 account
- Gmail account with App Password for Nodemailer
- Vercel and Render accounts for deployment

## Setup Instructions
### 1. Clone the Repository
```bash
git clone https://github.com/iknowaditya/project--vocso-tech-next.git
cd project--vocso-tech-next
