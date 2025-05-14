<h1 align="center">MonieTeller 💵💬</h1>

<p align="center">
  <img src="/public/images/monieteller_header.png" alt="MonieTeller Banner" />
</p>


**MonieTeller** is a fintech web application designed to streamline money transactions and provide real-time financial updates for users. It features modern design principles and robust performance, backed by the powerful Appwrite backend and monitored via Sentry. Powered by Mono!

## 🛠️ Features

- 💸 Real-time money tracking and insights
- 🧠 Intuitive and responsive UI built with Next.js
- 🔐 Secure user authentication with Appwrite
- 📈 Performance and error monitoring with Sentry
- 🌐 Fully responsive and mobile-friendly

---

## 🚀 Getting Started

Follow these steps to set up and run the MonieTeller app locally.

### 1. Clone the Repository

```bash
git clone https://github.com/Ebukachuqz/monieteller-app.git
cd monieteller-app
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Setup Environment Variables

Create a `.env` file in the root directory and populate it based on the `.env.example` file:

```
NEXT_APPWRITE_KEY=<YOUR_API_KEY>
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://<REGION>.cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT=<PROJECT_ID>
```

> 💡 Make sure to replace placeholders with your actual Appwrite credentials.

### 4. Start the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

---

## 🧩 Monitoring with Sentry

Sentry is integrated for real-time error monitoring and performance tracing.

#### Configuration

To use Sentry, ensure the appropriate DSN and config are added to your project. Usually, this is configured in `sentry.client.config.js` and `sentry.server.config.js`. Refer to the [Sentry for Next.js docs](https://docs.sentry.io/platforms/javascript/guides/nextjs/) for complete setup instructions if you're expanding it.

---

