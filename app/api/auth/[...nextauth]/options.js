import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import connectDb from '@/db/connectDb';
import User from '@/models/User';
import NextAuth from 'next-auth/next';

export const authOptions =NextAuth({
    providers:[
        CredentialsProvider({
            id:"credential",
            name:"Credential",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials){
                await connectDb();
                try {
                    const user=await User.findOne({email:credentials.identifier});
                    if(!user){
                        return null
                    }
                } catch (error) {
                    throw new Error(error)
                }
            }
        })
    ]
})