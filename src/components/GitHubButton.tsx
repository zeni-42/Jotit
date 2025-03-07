"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";

export default function GitHubButton(){
    const { data } = useSession()

    if(data){
        return (
            <>
            <Button variant="secondary" onClick={() => signOut()} >Sign out</Button>
            </>
        )
    }

    return(
        <><Button variant="secondary" onClick={() => signIn()} >Sign in with GitHub</Button></>
    )
}