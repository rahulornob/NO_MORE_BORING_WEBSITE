# Inspiration Gallery

A minimal, dark-themed gallery platform for curating inspiring websites and design work.

## Features

- **Dark Minimal Design** – Clean, distraction-free interface
- **Interactive Cards** – Hover animations with scale, glow, and reveal effects
- **Animated Hero** – Eye-catching landing section
- **Admin Panel** – Manage your collection easily
- **Bulk Import** – CSV support for adding multiple websites at once
- **Scalable** – Built on Supabase for unlimited growth

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Hosting**: Vercel
- **UI**: React 19

## Setup

### 1. Supabase Configuration

1. Go to [supabase.com](https://supabase.com) and sign up for free
2. Create a new project
3. Go to **Settings → API** and copy:
   - Project URL
   - Anon Key

### 2. Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 3. Database Setup

Once your Supabase project is created, run the SQL migration in your Supabase dashboard:

```sql
-- Create websites table
CREATE TABLE websites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  url TEXT NOT NULL,
  imageUrl TEXT NOT NULL,
  category VARCHAR(100),
  description TEXT,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updatedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_websites_created_at ON websites(createdAt DESC);
```

### 4. Install & Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Admin Panel

Access the admin panel at `/admin` to:
- **Add websites** – Single website form
- **Bulk import** – Upload CSV with multiple websites

### CSV Format

```
title,url,imageUrl,category,description
My Awesome Site,https://example.com,https://example.com/screenshot.jpg,SaaS,A great website
Another Site,https://example2.com,https://example2.com/image.jpg,Portfolio,Design portfolio
```

## Design System

### Color Palette
- **Background**: Dark grey (`#0a0a0a`)
- **Secondary BG**: `#141414`
- **Tertiary BG**: `#1a1a1a`
- **Text**: White (`#ffffff`)
- **Secondary Text**: Grey (`#b0b0b0`)

### Animations
- Card hover: Scale + glow effect
- Hero: Floating badge + subtle background pulses

## Project Structure

```
app/
  ├── layout.tsx          # Root layout
  ├── page.tsx            # Home page
  ├── globals.css         # Global styles
  ├── admin/
  │   └── page.tsx        # Admin panel
  └── api/
      └── admin/          # API routes for admin operations

components/
  ├── header.tsx          # Navigation
  ├── hero.tsx            # Landing hero section
  ├── gallery.tsx         # Gallery grid
  ├── website-card.tsx    # Individual card component
  └── admin-panel.tsx     # Admin form & CSV upload

lib/
  ├── db.ts               # Database operations
  ├── supabase.ts         # Supabase client
  └── types.ts            # TypeScript types
```

## Development

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Run production build
npm start

# Type checking
npm run typecheck

# Linting
npm run lint
```

## Deployment

Already hosted on Vercel. When you push to the main branch, Vercel automatically deploys.

Remember to add environment variables in your Vercel project settings.

## Next Steps

- [ ] Set up Supabase project
- [ ] Configure environment variables
- [ ] Run database migration
- [ ] Add your first websites
- [ ] Customize design/colors
- [ ] Deploy

---

Made with minimal design principles ✨
