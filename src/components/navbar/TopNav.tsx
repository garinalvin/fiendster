
import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import { auth } from "@/auth";
import UserMenu from "./UserMenu";


export default async function TopNav() {

    const session = await auth();
  return (
    <Navbar  className="bg-primary" classNames={{item:
      "text-sm text-white uppercase"
    }}>
      <NavbarBrand>
      <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
    <path
      clipRule="evenodd"
      d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
        <p className="font-bold text-inherit">ACME</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem as={Link} href={"/"}>
            Home
        </NavbarItem>
        <NavbarItem as={Link} href="/members">
         members
        </NavbarItem>

      </NavbarContent>
      <NavbarContent justify="end">
        {session?.user ? (<UserMenu user={session.user} />
        ):(
          <>
          <Button as={Link} href="/register" color="default" className="text-white" variant="flat">
            Sign Up
          </Button>
     
        
          <Button as={Link} href="/login" color="default"  className="text-white" variant="flat">
            Login
          </Button>

          </>
        )}
      
          
        

      </NavbarContent>
    </Navbar>
  );
}
