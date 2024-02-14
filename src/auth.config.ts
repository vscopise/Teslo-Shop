import NextAuth, { Session, type NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcryptjs from 'bcryptjs';
import { z } from 'zod';

import prisma from './lib/prisma';



export const authConfig: NextAuthConfig = {
    pages: {
        signIn: '/auth/login',
        newUser: '/auth/new-account',
    },

    callbacks: {

        authorized({ auth, request: { nextUrl } }) {
            console.log({auth})
           
            
            return true;
        },

        jwt({ token, user }) {
            if (user) {
                token.data = user;
            }

            return token;
        },

        //session({ session, token, user }) {
        session({session, token}:{session: Session; token?: any}) {
            session.user = token.data as any;
            return session;
        },

    },

    providers: [

        Credentials({
            async authorize(credentials) {

                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);


                if (!parsedCredentials.success) return null;

                const { email, password } = parsedCredentials.data;

                
                // Buscar el email
                const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
                if (!user) return null;

                // Chequear si coincide el password
                if (!bcryptjs.compareSync(password, user.password)) return null;

                // Validación correcta, regreso el usuario (sin el password)
                const { password: _, ...rest } = user;
                
                return rest;
            },
        }),

    ]
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);