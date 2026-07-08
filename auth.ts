import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import ConnectDB from "./lib/db";
import { comparePassword } from "./lib/bcrypt";
import User from "./lib/models/User";
import authConfig from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    ...authConfig.providers!,

    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        try {
          await ConnectDB();

          const email = credentials?.email as string;
          const password = credentials?.password as string;

          if (!email || !password) return null;

          const user = await User.findOne({ email });

          if (!user || !user.password) return null;

          const isValid = await comparePassword(password, user.password);

          if (!isValid) return null;

          if (!user.verified) {
            return null;
          }

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            image: user.image,
          };
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      try {
        if (account?.provider === "google") {
          await ConnectDB();

          if (!user.email) return false;

          let dbUser = await User.findOne({
            email: user.email,
          });

          if (!dbUser) {
            dbUser = await User.create({
              name: user.name || user.email.split("@")[0],
              email: user.email,
              image: user.image || "",
              provider: "google",
            });
          }

          // IMPORTANT
          user.id = dbUser._id.toString();
        }

        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },

    async jwt({ token, user }) {
      if (user?.email) {
        await ConnectDB();

        const dbUser = await User.findOne({
          email: user.email,
        }).select("_id");

        if (!dbUser) {
          throw new Error("User not found in database");
        }

        token.id = dbUser._id.toString();
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }

      return session;
    },
  },

  session: {
    strategy: "jwt",
  },
});
