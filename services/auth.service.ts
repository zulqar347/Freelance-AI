import { randomBytes } from "crypto";
import { Resend } from "resend";

import { hashPassword } from "@/lib/bcrypt";
import ConnectDB from "@/lib/db";
import User from "@/lib/models/User";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.NEXTAUTH_URL ||
  "http://localhost:3000";

export const createUser = async (
  name: string,
  email: string,
  password: string,
) => {
  await ConnectDB();

  const normalizedEmail = email.toLowerCase();
  const existingUser = await User.findOne({ email: normalizedEmail });

  if (existingUser) {
    return "User Already Exists";
  }

  const hashedPassword = await hashPassword(password);
  const verificationToken = randomBytes(32).toString("hex");
  const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

  const user = await User.create({
    name,
    email: normalizedEmail,
    password: hashedPassword,
    provider: "credentials",
    verified: false,
    verificationToken,
    verificationExpires,
  });

  await sendVerificationEmail(user.email, user.name, verificationToken);

  return user;
};

export const sendVerificationEmail = async (
  email: string,
  name: string,
  token: string,
) => {
  if (!resend) {
    return { success: true, skipped: true };
  }

  const verificationUrl = `${siteUrl}/api/auth/verify?token=${token}`;

  await resend.emails.send({
    from: "Freelance AI <onboarding@resend.dev>",
    to: [email],
    subject: "Verify your email address",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto;">
        <h2>Welcome to Freelance AI, ${name}!</h2>
        <p>Thanks for creating your account. Please verify your email address to start using the generator tools.</p>
        <p>
          <a href="${verificationUrl}" style="display:inline-block;padding:12px 18px;background:#06b6d4;color:#fff;text-decoration:none;border-radius:8px;">
            Verify email
          </a>
        </p>
        <p>If the button does not work, copy and paste this link into your browser:</p>
        <p>${verificationUrl}</p>
      </div>
    `,
  });

  return { success: true };
};

export const resendVerificationEmail = async (email: string) => {
  await ConnectDB();

  const normalizedEmail = email.toLowerCase();
  const user = await User.findOne({ email: normalizedEmail });

  if (!user) {
    return { success: false, message: "User not found" };
  }

  if (user.verified) {
    return { success: true, message: "Email already verified" };
  }

  const verificationToken = randomBytes(32).toString("hex");
  const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

  user.verificationToken = verificationToken;
  user.verificationExpires = verificationExpires;
  await user.save();

  await sendVerificationEmail(user.email, user.name, verificationToken);

  return { success: true, message: "Verification email sent" };
};

export const verifyEmailToken = async (token: string) => {
  await ConnectDB();

  const user = await User.findOne({
    verificationToken: token,
    verificationExpires: { $gt: new Date() },
  });

  if (!user) {
    return { success: false, message: "Invalid or expired verification link" };
  }

  user.verified = true;
  user.verificationToken = undefined;
  user.verificationExpires = undefined;
  await user.save();

  return { success: true, message: "Email verified successfully" };
};
