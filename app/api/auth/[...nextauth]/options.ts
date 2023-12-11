import type { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import TwitterProvider from 'next-auth/providers/twitter';
import { connectToDatabase } from '@/app/utils/database';
import User from '@/app/models/user';
import Facebook from 'next-auth/providers/facebook';

export const options: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      // profile(profile) {
      //   console.log('Github Profile: ', profile);
      // },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      // profile(profile) {
      //   console.log('Google Profile: ', profile);
      // },
    }),
    Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
      // profile(profile) {
      //   console.log('Facebook Profile: ', profile);
      // },
    }),
    // TwitterProvider({
    //   clientId: process.env.TWITTER_TOKEN as string,
    //   clientSecret: process.env.TWITTER_TOKEN_SECRET as string,
    // }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
          placeholder: 'Your username',
        },
        password: {
          label: 'Password: ',
          type: 'password',
          placeholder: 'Enter Password',
        },
      },
      async authorize(credentials) {
        // Add logic here to look up the user from the credentials supplied
        const user = { id: '1', username: 'J Smith', password: '123' };

        if (
          credentials?.username === user.username &&
          credentials?.password === user.password
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      console.log('Session info: ', session);

      if (session.user) {
        const sessionUser = await User.findOne({ email: session?.user?.email });

        if (sessionUser) {
          session.user.email = sessionUser?.email;
        }
      }
      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDatabase();
        console.log('Profile Object', profile);

        const userExists = await User.findOne({ email: profile?.email });
        console.log('Profile Object', profile);

        if (!userExists) {
          await User.create({
            email: profile?.email,
            username: profile?.name?.replace(' ', '').toLowerCase(),
            picture: profile?.picture || profile?.avatar_url,
          });
        }

        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  },
  pages: {
    signIn: '/signin',
  },
};
