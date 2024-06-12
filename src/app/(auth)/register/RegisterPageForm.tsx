"use client"
import React from 'react';
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import {Input} from "@nextui-org/input";
import {Button} from "@nextui-org/react";
import { FaUserLock } from "react-icons/fa";
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { RegisterSchema, registerSchema } from '@/lib/schemas/registerSchema';
import { zodResolver } from '@hookform/resolvers/zod';

import { registerUser } from '@/app/actions/authActions';


export default function RegisterPageForm() {

    const {register, handleSubmit, setError, formState:{errors, isValid, isSubmitting}}= useForm<RegisterSchema>({
        // resolver: zodResolver(registerSchema),
        mode: "onTouched"
    });

    async function onSubmitFunc(data: RegisterSchema){
        const result = await registerUser(data);
        if ( result.status === "success"){
            console.log("user registered successfully")
        }else{
            //checks if the error is an array of errors
            if(Array.isArray(result.error)){
                //loops through the error and 
                result.error.forEach((e) =>{
                    console.log(e.path)
                    const fieldName = e.path.join(".") as 'email' | "name" | "password"
                    setError(fieldName, {message: e.message})
                })
            }else{
                setError("root.serverError", {message: result.error});
            }
        }
    }

    // const {register, handleSubmit, setError, formState: {errors, isValid, isSubmitting}} = useForm<RegisterSchema>({
    //     // resolver: zodResolver(registerSchema),
    //     mode: "onTouched"
    // })



    //     }else{
    //         if(Array.isArray(result.error)){
    //             result.error.forEach((e: any)=>{
    //                 const fieldName = e.path.join(".") as "email" | "username" | "password";
    //                 setError(fieldName, {message: e.message})
    //             })
    //         }else{
    //             setError("root.serverError", {message: result.error})
    //         }
    //     }
    // }


  return (
    <div className="container min-w-full min-h-full pt-8 ">
        <Card className='max-w-[400px] mx-auto flex flex-col gap-2 items-center justify-start py-2'>
        <CardHeader className="flex justify-center items-center gap-2">
            
        <FaUserLock /> Register

        </CardHeader>
        <CardBody className="flex flex-col gap-2">

        <form 
        onSubmit={handleSubmit(onSubmitFunc)}  
        className="flex flex-col gap-2">
        <Input 
                    defaultValue=''
                    type="text" 
                    label="name" 
                    variant="bordered"
                    {...register("name")}
                 
                    isInvalid={!!errors.name}
                    errorMessage={errors.name?.message}
                    />
                <Input 
                    defaultValue=''
                    type="email" 
                    label="Email" 
                    variant="bordered"
                    {...register("email")}
                    isInvalid={!!errors.email}
                    errorMessage={errors.email?.message}
                    />
                <Input 
                    defaultValue=''
                    type="password" 
                    label="Password" 
                    variant="bordered"
                    {...register("password")}
                    isInvalid={!!errors.password}
                    errorMessage={errors.password?.message} 
                    />
                <Input 
                    defaultValue=''
                    type="password" 
                    label="Password" 
                    variant="bordered"
                    {...register("confirm")}
                    isInvalid={!!errors.confirm}
                    errorMessage={errors.confirm?.message} 
                    />
                {errors.root?.serverError && (
                    <p className="text-danger text-sm">{errors.root.serverError.message}</p>
                )}
                
                <Button 
                isLoading={isSubmitting} 
                color="primary" type="submit" 
                isDisabled={!isValid}
                >Register</Button>
                
            </form>

        </CardBody>
        <CardFooter className='flex justify-center'>
            <Link href="/login">Already have an account? login instead. </Link>
        </CardFooter>
    </Card>

    </div>
    
  )
}
