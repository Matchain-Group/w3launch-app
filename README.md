# W3Launch

Single-page Web3 launch countdown + waitlist experience built with React, Vite, TailwindCSS, Framer Motion, Three.js, Supabase, and Resend.

## Setup

1. Install dependencies
   - `npm install`
2. Copy env file
   - `copy .env.example .env`
3. Run dev server
   - `npm run dev`

## Supabase tables

Create the tables below in Supabase (SQL editor).

```sql
create table if not exists waitlist (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  wallet_address text,
  twitter_handle text,
  referral_source text,
  referral_code text,
  referred_by text,
  waitlist_number integer,
  created_at timestamp with time zone default now()
);

create table if not exists shares (
  id uuid primary key default gen_random_uuid(),
  user_email text,
  platform text,
  created_at timestamp with time zone default now()
);
```

## Resend

Set `RESEND_API_KEY` and `RESEND_FROM_EMAIL` in `.env`. The serverless function `api/waitlist.js` will send a welcome email after a successful signup.

## WalletConnect

Create a free WalletConnect project and set `VITE_WALLETCONNECT_PROJECT_ID`.

## Deploy

Deploy on Vercel with one click. `vercel.json` is included for SPA routing and serverless functions.
