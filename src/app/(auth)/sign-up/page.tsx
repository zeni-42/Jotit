"use client"

import { SignIn } from "@/components/AuthButton"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

export default function Signup(){
    const { register, handleSubmit, reset } = useForm()
    const router = useRouter()

    const registerUser = async (data: any) => {
        try {
            const response = await axios.post('/api/sign-up', data )
            if (response.status == 200) {
                toast.success("User registerd")
                reset()
                router.push('/sign-in')
            }
        } catch (error: any) {
            console.log(error);
            const errorMsg = error.response?.data?.message;
            toast.error(errorMsg)
        }
    }

    return(
        <>
        <div className="w-full h-screen flex justify-center items-center ">
            <div className="w-1/3 h-2/3 rounded-xl border border-zinc-800 flex justify-center items-center flex-col p-10 gap-5" >
                <h1 className="text-2xl font-semibold" >Create an account</h1>
                <form onSubmit={handleSubmit(registerUser)} className="w-full h-2/3 flex justify-evenly items-center flex-col " >
                    <Input autoComplete="off" {...register("fullName", {required: true})} placeholder="Name" type="text" className="w-2/3 h-12" />
                    <Input autoComplete="off" {...register("email", {required: true})} placeholder="Email" type="email" className="w-2/3 h-12" />
                    <Input autoComplete="off" {...register("password", {required: true} )} placeholder="Password" type="password" className="w-2/3 h-12" />
                    <Button type="submit" className="w-2/3" >Submit </Button>
                    <h2 className="text-sm text-zinc-500" >Already have an account ? <Link href='/sign-in' className="underline " >Sign-in</Link></h2>
                </form>
                <div className="w-full -mt-5 flex justify-center items-center gap-5" >
                    <div className="w-40 bg-zinc-800 h-[1px] "/>
                    <h2>OR</h2>
                    <div className="w-40 bg-zinc-800 h-[1px] "/>
                </div>
                <div className="mt-5 w-full flex justify-center items-center text-sm gap-10" >
                    <SignIn />
                </div>
            </div>
        </div>
        </>
    )
}