# Nahhas LMS Website

Nahhas LMS is a modern, open-source Learning Management System (LMS) built with **Next.js 14**. It offers a lightweight and extendable platform for online learning, course creation, and student management.

> 🕰️ _Note: This project has not received updates since **July 2024**. Community contributions are welcome to help keep it alive!_

---

## 🎥 Demo Video

Watch the LMS in action on YouTube: [Demo Video](https://youtu.be/0g7wvi6tehQ)

---

## 📚 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

- ✅ Browse & filter available courses
- 💳 Purchase courses using **Stripe**
- 🧠 Track progress per chapter & course
- 👨‍🎓 Student Dashboard with chapter management
- 👩‍🏫 Teacher mode with course creation tools
- 🧩 Add, edit & reorder chapters via drag-and-drop
- 🖼️ Upload videos, thumbnails, and attachments with **UploadThing**
- 🎥 Built-in video player using `react-player`
- 📝 Rich text editor for chapter descriptions
- 🔒 Authentication powered by **Clerk**
- 📦 NoSQL storage using **MongoDB** with **Prisma ORM**

---

## 🛠 Tech Stack

- **Framework:** Next.js 14
- **Database:** MongoDB (via Prisma)
- **Authentication:** Clerk
- **UI Libraries:** Shadcn/UI, Radix UI
- **Forms:** React Hook Form
- **API:** Axios
- **Styling:** Tailwind CSS
- **Uploads:** UploadThing, Cloudinary
- **Markdown:** React Markdown Preview, React MDE

---

## 🚀 Installation

### 📦 Prerequisites

Ensure the following are installed on your system:

- Node.js
- npm or Yarn
- Git

### 📁 Clone the Repository

```bash
git clone https://github.com/AbdulrahmanNahhas/nahhas-lms.git
cd nahhas-lms
```

### 📥 Install Dependencies

```bash
npm install
# or
yarn install
```

### 🔐 Setup Environment Variables

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
NEXT_REDIRECT=/

DATABASE_URL=

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
NEXT_PUBLIC_CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

NEXT_PUBLIC_TEACHER_ID=
NEXT_PUBLIC_APP_URL=http://localhost:3000

STRIPE_API_KEY=
STRIPE_WEBHOOK_SECRET=
```

You can refer to `.env.example` for a sample config.

### ▶️ Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Usage

Once the dev server is running, open your browser and go to: [http://localhost:3000](http://localhost:3000)

From there, you can:
- Browse courses
- Log in as a student or teacher
- Create, purchase, and track course content

---

## 🤝 Contributing

This project was originally built as a personal learning experience and is no longer actively maintained.

Feel free to fork it, explore the code, and use it as a reference or starting point for your own LMS project. I'm glad if it helps you learn something — just like it helped me.

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for more details.
