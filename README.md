# ☕ Get Me a Coffee (Creator-Fuel)

![Next.js](https://img.shields.io/badge/Next.js-16.1-black?logo=next.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Enabled-47A248?logo=mongodb)
![Razorpay](https://img.shields.io/badge/Razorpay-Integrated-02042B?logo=razorpay)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?logo=vercel)

**Get Me a Coffee** is a full-stack monetization platform built for creators, developers, and artists. It empowers fans to directly support their favorite creators through a seamless, secure payment gateway. 

Built with the latest **Next.js 16 App Router**, this project heavily utilizes modern React paradigms, including highly secure Server Actions, dynamic routing, and aggressive caching strategies for optimal performance.

## ✨ Key Features

* 🔐 **Secure Authentication:** Session management and OAuth integration powered by **NextAuth.js**.
* 💳 **Direct Payments:** End-to-end payment flow using the **Razorpay API**, allowing creators to plug in their own API keys to receive funds directly.
* ⚡ **Server Actions:** Bypasses traditional REST APIs using Next.js Server Actions for secure, direct-to-database mutations and profile updates.
* 🚀 **Aggressive Cache Management:** Intelligent use of Next.js `revalidatePath` and `force-dynamic` rendering to ensure zero stale data on creator profiles.
* 🧑‍💻 **Dynamic Creator Profiles:** Custom vanity URLs generated dynamically for every registered creator (e.g., `domain.com/username`).
* 🛡️ **Bulletproof DB Operations:** Strict MongoDB payload serialization and validation to prevent injection or data-loss during profile updates.

## 🛠️ Tech Stack

* **Framework:** [Next.js](https://nextjs.org/) (App Router, Turbopack)
* **Language:** JavaScript (ES6+) / React
* **Database:** [MongoDB](https://www.mongodb.com/) & [Mongoose](https://mongoosejs.com/)
* **Authentication:** [NextAuth.js](https://next-auth.js.org/)
* **Payment Gateway:** [Razorpay](https://razorpay.com/)
* **Deployment:** [Vercel](https://vercel.com/)

Experience the app in action: 
https://creator-fuel-six.vercel.app/

## 🚀 Getting Started

Follow these steps to set up the project locally on your machine.

### 1. Clone the repository
```bash
git clone [https://github.com/imjoe77/Creator-Fuel.git](https://github.com/imjoe77/Creator-Fuel.git)
cd Creator-Fuel

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
