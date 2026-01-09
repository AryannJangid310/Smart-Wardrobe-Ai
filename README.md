 Smart Wardrobe AI 🧥✨

The Future of Style - An AI-powered personal stylist and digital wardrobe manager.

![Banner](/public/images/hero-bg.png)

 🚀 Overview

Smart Wardrobe AI digitizes your closet, allowing you to manage your clothing items, view them in interactive 3D, and receive personalized outfit recommendations tailored to your style, the weather, and your schedule.

✨ Features

-   🤖 AI Stylist: Generates daily outfit suggestions based on your wardrobe and external factors.
-   🧊 3D Wardrobe: Explore your clothes in a stunning, interactive 3D carousel.
-   📱 Digital Closet: Upload, categorize, and manage your entire wardrobe from any device.
-   🛡️ Enterprise-Grade Security:
    -   Rate limiting on all API endpoints.
    -   Strict input validation with Zod.
    -   Secure authentication and session management.
    -   OWASP security headers.

 🛠️ Tech Stack

-   Framework: [Next.js 14](https://nextjs.org/) (App Router)
-   Language: TypeScript
-   Styling: Tailwind CSS
-   Database: MongoDB (via Prisma ORM)
-   3D Graphics: Three.js, React Three Fiber, Drei
-   Animations: Framer Motion
-   Authentication: NextAuth.js
-   Validation: Zod

🏁 Getting Started

 Prerequisites

-   Node.js 18+
-   MongoDB Database

 Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/AryannJangid310/Smart-Wardrobe-Ai.git
    cd smart-wardrobe-ai
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Set up environment variables:
    Create a `.env` file in the root directory:
    ```env
    DATABASE_URL="your_mongodb_connection_string"
    NEXTAUTH_SECRET="your_nextauth_secret"
    NEXTAUTH_URL="http://localhost:3000"
    OPENAI_API_KEY="your_openai_api_key"
    ```

4.  Run the development server:
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

🔒 Security

This application implements robust security measures:
-   Rate Limiting: Protects against abuse and DDoS attacks.
-   Input Validation: Ensures all data entering the system is safe and structured.
-   Secure Headers: Protects against XSS, clickjacking, and other common vulnerabilities.

📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
