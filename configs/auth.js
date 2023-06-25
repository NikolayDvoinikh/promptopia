import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { connectToDB } from "@utils/database";
import User from "@models/user";

export const authConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      //HASH PASSWORD!!!!!!!!!!!!!!!
      credentials: {
        email: { label: "email", type: "email", required: true },
        password: { label: "password", type: "password", required: true },
      },
      async authorizedCredentials(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        const userExist = User.find({ email: credentials.email });

        if (userExist && userExist.password === credentials.password) {
          const { password, ...userDataWithoutPassword } = userExist;
          return userDataWithoutPassword;
        }
        return null;
      },
    }),
  ],
};
