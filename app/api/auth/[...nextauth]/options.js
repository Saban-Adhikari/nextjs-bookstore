import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        username: { label: "Email", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const requestBody = {
            username: credentials?.username,
            password: credentials?.password,
          };
          const res = await fetch(`https://dummyjson.com/auth/login`, {
            method: "POST",
            body: JSON.stringify(requestBody),
            headers: { "Content-Type": "application/json" },
          });
          console.log("res", res.ok);
          if (!res.ok) {
            const errorResponse = await res.json();
            console.error("Authentication error:", errorResponse.Message);
            return null;
          }

          const userData = await res.json();
          console.log("Login successful:", userData);
          return userData; // Return user data if authentication succeeds
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {},
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
};
