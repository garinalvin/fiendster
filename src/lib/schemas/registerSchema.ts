import {z} from "zod";

export const registerSchema = z.object({
    name: z.string().min(4, {message: "name must be atleast 4 characters"}),
    email: z.string().email(),
    password: z.string().min(6, {message: "Password must be atleast 6 characters"}),
    confirm: z.string().min(6,{message: "Password must be atleast 6 characters"})
}).refine((data=>data.password===data.confirm),{message:"Passwords do not matched", path:["confirm"]})


export type RegisterSchema = z.infer<typeof registerSchema>