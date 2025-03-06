"use client"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"

export function SignIn() {
    return <Button variant="secondary" onClick={() => signIn("github", { redirectTo: "/home" })}><Github /> GitHub</Button>
}