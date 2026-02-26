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

## 🚀 Getting Started

Follow these steps to set up the project locally on your machine.

### 1. Clone the repository
```bash
git clone [https://github.com/imjoe77/Creator-Fuel.git](https://github.com/imjoe77/Creator-Fuel.git)
cd Creator-Fuel

Gemini said
Here is a clean, professional, and highly technical README.md template for your project. It highlights the modern Next.js architecture (like Server Actions and caching) that you worked so hard to perfect, making the repo stand out to recruiters or other developers.

Just copy this, create a README.md file in the root of your repository, and paste it in!

Markdown
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

## 🚀 Getting Started

Follow these steps to set up the project locally on your machine.

### 1. Clone the repository
```bash
git clone [https://github.com/imjoe77/Creator-Fuel.git](https://github.com/imjoe77/Creator-Fuel.git)
cd Creator-Fuel
2. Install dependencies
Bash
npm install
3. Environment Variables
Create a .env.local file in the root directory and add the following keys. You will need to set up a MongoDB cluster, a NextAuth secret, and optionally OAuth providers (like GitHub/Google).

Code snippet
# Database
MONGODB_URI=your_mongodb_connection_string

# NextAuth
NEXTAUTH_SECRET=your_super_secret_string
NEXTAUTH_URL=http://localhost:3000

# OAuth Providers (Add your chosen providers)
GITHUB_ID=your_github_oauth_id
GITHUB_SECRET=your_github_oauth_secret

# Razorpay (Optional: For platform fees or global testing)
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
4. Run the development server
Bash
npm run dev
Open http://localhost:3000 with your browser to see the application.
