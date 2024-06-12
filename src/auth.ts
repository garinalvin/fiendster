import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
// Your own logic for dealing with plaintext password strings; be careful!
import bcryptjs from "bcryptjs"
import { loginSchema } from "./lib/schemas/loginSchema"
import { getUserByEmail } from "./app/actions/authActions"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./lib/prisma"

 
export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    async session({token, session}){
     if(token.sub && session.user){
      session.user.id = token.sub;
     }
      return session;
    
  }},
  adapter: PrismaAdapter(prisma),
  session: {strategy: "jwt"},
  providers: [Credentials({
    //this a little different from the authjs.dev site bec. instead of setting the initial value of emails, passwords 
    //we use the credentials to pass those va;ues in the authActions;

    /*
    //this how it the "credentials" is used in the authActions.
    const result = await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false
        });
    
    */

      name: "credentials"
      ,
      authorize: async (creds) => {
        //this comes from zod
        const validated = loginSchema.safeParse(creds);


        if (validated.success){

          const {email, password} = validated.data;

          const user = await getUserByEmail(email);

          //checks if the user with the given email exist and if the password is correct
          if (!user || !(await bcryptjs.compare(password, user.passwordHash))) return null
          return user;
          

        }else{
          return null
        }
 
      },
    }),
  ],
})