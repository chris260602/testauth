import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const {auth,handlers,signIn,signOut}  = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Email and Password",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Your Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/sanctum/csrf-cookie`,
          {
            method: "GET",
          }
        );

        const setCookieHeader = res.headers.get("set-cookie");
        // console.log("setCookieHeader", setCookieHeader)
        // you'll find your_site_session key in this console log
        const cookies = setCookieHeader?.split(", ");
        let sessionKey = null;
        let xsrfToken = null;

        for (const cookie of cookies!) {
          if (cookie.startsWith("laravel_session=")) {
            sessionKey = cookie.split("=")[1];
          } else if (cookie.startsWith("XSRF-TOKEN=")) {
            xsrfToken = cookie.split("=")[1];
          }

          if (sessionKey && xsrfToken) {
            break;
          }
        }

        const data = {
          email: credentials?.email,
          password: credentials?.password,
        };
        const headers = new Headers({
          Cookie: `laravel_session=${sessionKey}`,
          "Content-Type": "application/json",
        });

        if (xsrfToken) {
          headers.append("X-XSRF-TOKEN", xsrfToken);
        }

        const options = {
          method: "POST",
          headers,
          body: JSON.stringify(data),
        };
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`,
            options
          );

          if (response.ok) {
            const res = await response.json();
            const user = await fetch(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/me`,
              {
                headers: {
                  Authorization: "bearer " + res.token,
                },
              }
            );
            const userData = await user.json();
            return {
              id: userData.id,
              access_token: res.token,
              user: userData,
            };
          } else {
            console.log("HTTP error! Status:", response.status);

            // Handle non-successful response here, return an appropriate JSON response.
            return null;
          }
        } catch (error) {
          console.log("Error", error);
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile, user }) {
      if (account?.provider === "google") {
        const headers = new Headers({
          "Content-Type": "application/json",
        });
        const options = {
          method: "POST",
          headers,
          body: JSON.stringify({
            email: profile?.email,
            name: profile?.name,
            provider_id: account.providerAccountId,
          }),
        };
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/oauth-google`,
          options
        );
        const res = await response.json();

        user.user = res.user;
        user.access_token = res.token;

        if (response.status == 201) return true;
        else return false;
        // check if user exist, if not create new account check by passing profile id
      }
      return true;
    },
    async jwt({ token, account, user, session }) {
      if (session) {
        token.user.user = session.user;
        if (session.access_token)
          token.user.access_token = session.access_token;
      }
      if (user) {
        token.user = user;
        token.accessToken = user.access_token;
      }
      return token;
    },
    async session({ session, token, user }) {

      session.user = token.user;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
