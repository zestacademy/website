This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 🚀 Features

### 🔐 Authentication & Identity
- **Integrated Firebase Auth**: Seamless login via Email/Password and **Google Sign-In**.
- **Zest ID System**: automatically generates a unique `Zest ID` (e.g., `ZU0005`) for every new user.
- **Smart Onboarding**: New users are greeted with a "Welcome" popup showcasing their new Zest ID before exploring the platform.
- **Unified Profile**: User Zest IDs are displayed prominently in the Profile Dashboard and dropdown menu.

### 📚 Learning Dashboard
- **Personalized Learning**: Track enrolled courses and progress.
- **Dynamic Profile**: Edit bio, social links, and view your Zest ID.

### 🌐 Community & Resources
- **Tech News**: Real-time technology and education news updates (via NewsAPI).
- **Job Search**: Integrated job-finding tool for developers (via JSearch/RapidAPI).

## 🛠️ Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# FIREBASE ADMIN SDK CREDENTIALS (for server-side features)
# Get this from Firebase Console -> Project Settings -> Service Accounts
FIREBASE_PROJECT_ID=zest-auth
FIREBASE_CLIENT_EMAIL=...
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."

# FIREBASE CLIENT CONFIG (publicly exposed)
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=zest-auth.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=zest-auth
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=zest-auth.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=...
NEXT_PUBLIC_FIREBASE_DATABASE_URL=...

# NEWS API (Get key from newsapi.org)
NEXT_PUBLIC_NEWS_API_KEY=your_news_api_key

# RAPID API (Get key from rapidapi.com for JSearch)
RAPIDAPI_KEY=your_rapidapi_key
RAPIDAPI_HOST="jsearch.p.rapidapi.com"

# JDoodle API (required for C compiler functionality)
NEXT_PUBLIC_JDOODLE_CLIENT_ID=your_jdoodle_client_id
NEXT_PUBLIC_JDOODLE_CLIENT_SECRET=your_jdoodle_client_secret
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

