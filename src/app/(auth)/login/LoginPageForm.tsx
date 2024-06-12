"use client";

import React from 'react';
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import {Input} from "@nextui-org/input";
import {Button} from "@nextui-org/react";
import { FaUserLock } from "react-icons/fa";
import Link from 'next/link';
import {useForm} from "react-hook-form";
import {loginSchema, LoginSchema} from "@/lib/schemas/loginSchema";
import {zodResolver} from "@hookform/resolvers/zod"
import { signInUser } from '@/app/actions/authActions';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { signInUser } from '@/app/actions/authActions';
// import { useRouter } from 'next/navigation';


export default function LoginPageForm() {
    
    const router = useRouter();

    // const {register, handleSubmit,formState: {errors, isValid, isSubmitting }}=useForm<LoginSchema>(
    //   {
    //     resolver: zodResolver(loginSchema),
    //     mode: "onTouched"
    // }
// );

// const {register, handleSubmit} = useForm();

const {register, handleSubmit, formState: {errors, isValid, isSubmitting}} = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched"
});

    const onSubmitFunc = async (data:LoginSchema)=>{

        const result = await signInUser(data);
        if(result.status === "success"){
            router.push("/members");
            router.refresh();
            
        }else{
            // console.log(result.error);
            toast.error(result.error as string);
        }
    }


  return (
    <div className="container min-w-full min-h-full pt-8 ">
        <Card className='max-w-[400px] mx-auto flex flex-col gap-2 items-center justify-start py-2'>
        <CardHeader className="flex justify-center items-center gap-2">
            
        <FaUserLock /> login

        </CardHeader>
        <CardBody>

            <form 
            onSubmit={handleSubmit(onSubmitFunc)}  
            className="flex flex-col gap-2">
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
                <Button 
                color="primary" type="submit" 
                isDisabled={!isValid}
                isLoading={isSubmitting} 
                >Login</Button>
                
            </form>
        
        </CardBody>
        <CardFooter className='flex justify-center'>
            <Link href="/register">Create a new account</Link>
        </CardFooter>
    </Card>

    </div>
    
  )
}

