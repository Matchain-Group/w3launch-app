import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import crypto from "crypto";

const getEnv = (key, fallback) => process.env[key] || fallback;

const supabaseUrl = getEnv("SUPABASE_URL", process.env.VITE_SUPABASE_URL);
const supabaseKey = getEnv(
  "SUPABASE_SERVICE_ROLE_KEY",
  process.env.VITE_SUPABASE_SERVICE_ROLE_KEY
);
const resendKey = getEnv("RESEND_API_KEY", process.env.VITE_RESEND_API_KEY);
const fromEmail = getEnv("RESEND_FROM_EMAIL", "onboarding@resend.dev");
const siteUrl = getEnv("SITE_URL", "http://localhost:5173");
const waitlistLimit =
  Number(getEnv("WAITLIST_LIMIT", process.env.VITE_WAITLIST_LIMIT || 1000)) ||
  1000;

const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || "").toLowerCase());

const makeReferralCode = () => crypto.randomBytes(5).toString("hex");

const buildEmailHtml = ({ productName, waitlistNumber, referralLink }) => `
  <div style="background:#0A0A0F;color:#ffffff;font-family:Space Grotesk,Arial,sans-serif;padding:32px;">
    <div style="max-width:520px;margin:0 auto;border:1px solid rgba(255,255,255,0.12);border-radius:16px;overflow:hidden;background:#0f0f16;">
      <div style="padding:24px;background:linear-gradient(90deg,#7B2FBE,#00C2FF);">
        <h1 style="margin:0;font-size:24px;">${productName} Waitlist Confirmed</h1>
      </div>
      <div style="padding:24px;">
        <p style="margin:0 0 12px;">You are officially on the list.</p>
        <p style="margin:0 0 16px;font-size:20px;">Your spot: #${waitlistNumber}</p>
        <p style="margin:0 0 12px;">Share your link to jump the queue:</p>
        <p style="margin:0 0 20px;"><a href="${referralLink}" style="color:#00C2FF;">${referralLink}</a></p>
        <p style="margin:0 0 20px;">We will notify you with a private mint link before public launch.</p>
        <a href="${siteUrl}" style="display:inline-block;padding:12px 18px;border-radius:999px;background:#00C2FF;color:#0A0A0F;text-decoration:none;font-weight:600;">Open W3Launch</a>
      </div>
    </div>
  </div>
`;

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
  const { email, wallet_address, twitter_handle, referral_source, referred_by } =
    body;

  if (!isValidEmail(email)) {
    res.status(400).json({ error: "A valid email is required." });
    return;
  }

  const { data: existing } = await supabase
    .from("waitlist")
    .select("email, waitlist_number, referral_code")
    .eq("email", email)
    .maybeSingle();

  if (existing) {
    const { count: referralCount } = await supabase
      .from("waitlist")
      .select("id", { count: "exact", head: true })
      .eq("referred_by", existing.referral_code);
    res.status(200).json({
      email: existing.email,
      waitlist_number: existing.waitlist_number,
      referral_code: existing.referral_code,
      referral_link: `${siteUrl}/?ref=${existing.referral_code}`,
      referral_count: referralCount ?? 0
    });
    return;
  }

  const { count } = await supabase
    .from("waitlist")
    .select("id", { count: "exact", head: true });

  if (count >= waitlistLimit) {
    res.status(409).json({ error: "Waitlist is full." });
    return;
  }

  const referral_code = makeReferralCode();
  const waitlist_number = (count ?? 0) + 1;

  const { data, error } = await supabase
    .from("waitlist")
    .insert({
      email,
      wallet_address: wallet_address || null,
      twitter_handle: twitter_handle || null,
      referral_source: referral_source || null,
      referred_by: referred_by || null,
      referral_code,
      waitlist_number
    })
    .select("email, waitlist_number, referral_code")
    .single();

  if (error) {
    res.status(500).json({ error: "Unable to add to waitlist." });
    return;
  }

  const referral_link = `${siteUrl}/?ref=${data.referral_code}`;
  const productName = getEnv("VITE_PRODUCT_NAME", "W3Launch");

  if (resendKey) {
    try {
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from: fromEmail,
        to: email,
        subject: "You're on the list",
        html: buildEmailHtml({
          productName,
          waitlistNumber: data.waitlist_number,
          referralLink: referral_link
        })
      });
    } catch (err) {
      // Email failures should not block the waitlist.
    }
  }

  res.status(200).json({
    email: data.email,
    waitlist_number: data.waitlist_number,
    referral_code: data.referral_code,
    referral_link,
    referral_count: 0
  });
}
