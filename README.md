# Stash  

A minimalist file drive with authentication, powered by a Supabase backend.  

---

## Setup  

1. **Clone the repo**
   ```bash
   git clone https://github.com/xerxes324/stash.git
   cd stash
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Add environment variables**  
   Create a `.env` file with:
   ```
   SUPABASE_URL=<your-supabase-url>
   SUPABASE_SERVICE_ROLE_KEY=<your-supabase-service-role-key>
   DATABASE_URL=<your-supabase-postgres-url>
   ```

4. **Run Prisma**
   ```bash
   npx prisma generate
   npx prisma migrate deploy
   ```

5. **Start the server**
   ```bash
   npm start
   ```
   App runs at:  
   `http://localhost:3000`

---

## 🧩 Stack  

- Node.js + Express  
- Supabase (Postgres)  
- Prisma ORM  
- EJS frontend  

---

## 📁 Features  

- User authentication  
- Upload and organize files/folders  
- Simple dashboard UI  
