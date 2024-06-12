import { auth, signOut } from "@/auth";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { FaRegSmile } from "react-icons/fa";
import { GiClick } from "react-icons/gi";


export default async function Home() {

  const session = await auth();
  return (
    <div className="container flex justify-center flex-col h-[300px] gap-4">
      <h1 className="text-8xl text-center text-green-400">Welcome to Fiendsters</h1>
      <h2 className="text-xl text-center text-danger">Create Enemies around the world</h2>
      <h3>User Session data</h3>
      {
        session ? (
          <div>
            <pre>{JSON.stringify(session, null, 2)}</pre>
          
          <form action={async ()=>{
            "use server";
            await signOut();

          } }>
            <Button color="primary"  type="submit"
      variant="bordered" startContent={<FaRegSmile size={20}/> } endContent={<GiClick size={20}/>}>sign out</Button>
    
          </form>
          
          </div>
        ):<div>Not sign in</div>
      }
      </div>
  );
}