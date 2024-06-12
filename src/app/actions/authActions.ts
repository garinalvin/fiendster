"use server"

import { signIn, signOut } from "@/auth";
import { prisma } from "@/lib/prisma";
import { LoginSchema } from "@/lib/schemas/loginSchema";
import { RegisterSchema, registerSchema } from "@/lib/schemas/registerSchema";
import { ActionResult } from "@/types";
import { User } from "@prisma/client";
import bcryptjs from "bcryptjs"
import { AuthError } from "next-auth";

//function for signing in users:
export async function signInUser(data: LoginSchema): Promise<ActionResult<string>>{
    try {
        const result = await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false
        });
        return {status: "success", data: "Logged In"}
    } catch (error) {
        console.log(error);
        if (error instanceof AuthError){
            switch (error.type) {
                case "CredentialsSignin":
                    return {status: "error", error: "Invalid credentials"}
            
                default:
                    return {status: "error", error: "Something went wronf"}
                    break;
            }
        }else{
            return {status: "error", error: "Something else went wrong"}
        }
    }
}

//signout user
export async function signOutUser(){
    await signOut({redirectTo: "/"});
}




//function for registering users
export async function registerUser(data: RegisterSchema): Promise<ActionResult<User>>{
try {  
    const validated = registerSchema.safeParse(data);

    if(!validated.success){
        return {status: "error", error: validated.error.errors}
    }

    const {name, email, password } = validated.data;

    const existingUser = await prisma.user.findUnique({where: {email}})
    if (existingUser) return {status: "error", error: "user already exists"};

    //hash the password
    const hashedPassword = await bcryptjs.hash(password, 10);

    //create user // add user to the database
    const user = await prisma.user.create(
        {
            data: {
                name, 
                email, 
                passwordHash: hashedPassword
            }
        }
    )
    return {status:"success", data: user}

} catch (error) {
    console.log(error)  
    return {status: "error", error: "something went wrong"}  
}

    // database for possible existing user //email: email
}

export async function getUserByEmail(email: string){
    return prisma.user.findUnique({where: {email}})
}

export async function getUserById(id: string){
    return prisma.user.findUnique({where: {id}})
}