import { createClient } from "@supabase/supabase-js";

const getEnv = (key, fallback) => process.env[key] || fallback;
const supabaseUrl = getEnv("SUPABASE_URL", process.env.VITE_SUPABASE_URL);
const supabaseKey = getEnv(
  "SUPABASE_SERVICE_ROLE_KEY",
  process.env.VITE_SUPABASE_SERVICE_ROLE_KEY
);
const supabase =
  supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed." });
    return;
  }

  if (!supabase) {
    res.status(500).json({ error: "Supabase is not configured." });
    return;
  }

  const body =
    typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
  const { user_email, platform } = body;

  if (!platform) {
    res.status(400).json({ error: "Platform is required." });
    return;
  }

  await supabase.from("shares").insert({
    user_email: user_email || null,
    platform
  });

  res.status(200).json({ ok: true });
}
