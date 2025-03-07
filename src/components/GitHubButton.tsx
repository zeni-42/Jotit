"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import { Button } from "./ui/button"
import { Github } from "lucide-react"

export default function SignIn() {
    const { data } = useSession()

    if (data) {
        <Button variant="secondary"  onClick={() => signOut}>Sign out</Button>
    }

    return <Button variant="secondary" onClick={() => signIn("github")}>Continue with Github </Button>
}
