import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        Email: { label: "Email", type: "text", placeholder: "Email" },
        Password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const requestBody = {
            Email: credentials?.Email,
            Password: credentials?.Password,
          };
          const res = await fetch(`https://htdrnl.cyclic.app/api/login`, {
            method: "POST",
            body: JSON.stringify(requestBody),
            headers: { "Content-Type": "application/json" },
          });

          if (!res.ok) {
            const errorResponse = await res.json();
            console.error("Authentication error:", errorResponse);
            return null;
          }

          const responseData = await res.json();

          console.log("response data", responseData);
          if (
            responseData.error &&
            responseData.error.message === "Invalid username or password"
          ) {
            return null;
          }
          console.log("Login successful", responseData);
          // cookies().set("ok_reg_user", responseData.data.token);
          return { ...responseData };
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token, user }) {
      return { ...session, ...token, ...user };
    },
  },
};
