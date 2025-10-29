# 😎 QueryCraft

### _Query smarter. Connect faster. Explore data effortlessly._

## 🚀 Overview

**QueryCraft** is an intelligent SQL playground that lets users securely connect their own databases and query them through a sleek, ChatGPT-style interface.  
It’s built for developers, analysts, and data engineers who want instant insights — without writing backend code and people who doesnt know sql.

---

## ✨ Key Features

- 🔐 **Secure DB Connections** — User database URLs are AES-256 encrypted before saving.
- 🧑‍💻 **Chat-like Query Interface** — Query databases just like chatting with an assistant.
- ⚙️ **Multi-Database Support** — PostgreSQL, MySQL, and more.
- 💾 **Persistent Connections** — Save, list, and reuse encrypted database URLs.
- ⚡ **Modern Stack** — Next.js App Router, Shadcn UI, Drizzle ORM, and Better-Auth.
- 🧩 **Expandable Design** — Built for adding AI SQL generation or schema explorers later.

---

## 🛠️ Tech Stack

| Layer      | Tech                                           |
| ---------- | ---------------------------------------------- |
| Frontend   | Next.js 16, TypeScript, Shadcn/UI, TailwindCSS |
| Backend    | Next.js API Routes                             |
| Auth       | [Better-Auth](https://better-auth.com)         |
| ORM        | Drizzle ORM                                    |
| Database   | Neon (PostgreSQL)                              |
| Encryption | Node `crypto` (AES-256-GCM)                    |
| Runtime    | Bun                                            |

---

## ⚙️ Setup Guide

### 1️⃣ Clone and install

```bash
git clone https://github.com/keval44/QueryCraft.git
cd querycraft
bun install
```

---

### 2️⃣ Environment variables

Create a `.env` file:

```env
#DB url
DATABASE_URL=postgresql://user:password@host:5432/querycraft

#Encryption Key
ENCRYPTION_SECRET=32CHARLONGRANDOMKEYXXXXXXXX

#Auth
BETTER_AUTH_SECRET=somerandomsecret
NEXT_PUBLIC_APP_URL=http://localhost:3000

#Github
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

#Google
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

**Generate secure keys:**

```bash
openssl rand -hex 16
```

---

### 3️⃣ Initialize Drizzle

```bash
bun db:gen
bun db:pus
```

---

### 4️⃣ Run dev server

```bash
bun dev
```

Then open: [http://localhost:3000](http://localhost:3000)

---

## 🖼️ Screenshots

_Add screenshots of your dashboard, query UI, and connection modal here._

```
![Dashboard](docs/screenshot-dashboard.png)
![Query Interface](docs/screenshot-query.png)
```

## 📜 License

MIT License © 2025

---

> Built with ❤️ by Keval Kansagra

## Badges

![MIT License](https://img.shields.io/badge/License-MIT-green.svg)
