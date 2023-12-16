import type { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { connectToDatabase } from '@/app/utils/database';
import User from '@/app/models/oauthUser';
import credentialsUser from '@/app/models/credentialsUser';
import Facebook from 'next-auth/providers/facebook';
import { findUserById, findUserByUsername } from '@/app/utils/user';
import bcrypt from 'bcrypt';

export const options: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
        },
        password: {
          label: 'Password: ',
          type: 'password',
        },
      },
      async authorize(credentials) {
        // Add logic here to look up the user from the credentials supplied
        console.log('credentials: ', credentials);

        try {
          const user = await findUserByUsername(credentials?.username);
          console.log('user: ', user);

          if (!user) {
            throw new Error('User not found');
          }

          if (user && credentials) {
            const isValid = await bcrypt.compare(
              credentials?.password,
              user?.password
            );

            console.log('isValid: ', isValid);

            if (isValid) {
              console.log('login successful');
              return user;
            }
          }
        } catch (err) {
          console.log(err);
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      if (Object.keys(token).length !== 4) {
        const oauthUser = await User.findOne({ email: session?.user?.email });

        if (session.user && oauthUser) {
          session.user.email = oauthUser?.email;
        }
      } else if (token.sub) {
        // console.log(token);

        const credentialUser = await findUserById(token?.sub);
        console.log('credentialUser: ', credentialUser);

        if (credentialUser && session.user) {
          console.log('Session info: ', session);
          session.user.name = credentialUser?.username;
          session.user.image =
            'https://banner2.cleanpng.com/20180722/gfc/kisspng-user-profile-2018-in-sight-user-conference-expo-5b554c0968c377.0307553315323166814291.jpg';
        }
      }

      console.log('token: ', token);

      return session;
    },
    async signIn({ account, profile }) {
      try {
        await connectToDatabase();

        // Handle OAuth provider sign-ins
        if (account?.provider !== 'credentials') {
          const userExists = await User.findOne({ email: profile?.email });
          if (!userExists) {
            await User.create({
              email: profile?.email,
              username: profile?.name?.replace(' ', '').toLowerCase(),
              picture: profile?.picture || profile?.image,
            });
          }
          return true; // Sign-in successful
        }

        // No additional handling needed for credentials sign-ins here
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
