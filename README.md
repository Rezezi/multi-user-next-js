# Next.js & Prisma Project

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/username/repository-name.git
cd repository-name
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the project root and add the database configuration:
```env
DATABASE_URL="your-database-url"
```

### 4. Initialize Prisma
```bash
npx prisma generate
```

### 5. Run Migrations
```bash
npx prisma migrate dev --name init
```

### 6. Seed Database (Optional)
```bash
npx prisma db seed
# or if using TypeScript:
npx prisma tsx prisma/seed.ts
```

### 7. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 8. Build & Start Production Server
```bash
npm run build
npm start
```

### 9. Deploy to Vercel
```bash
npx vercel
```

---

## Learn More
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)

