"use client"

import { SignIn } from "@/components/AuthButton"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

export default function Signin(){
    const { register, handleSubmit, reset } = useForm()
    const router = useRouter()

    const registerUser = async (data: any) => {
        try {
            const response = await axios.post('/api/sign-in', data )
            if (response.status == 200) {
                toast.success("Welcome")
                reset()
                router.push('/home')
                localStorage.setItem("userId", response.data?.data._id)
                localStorage.setItem("avatar",response.data?.data?.avatar)
                localStorage.setItem("fullName",response.data?.data?.fullName)
            }
        } catch (error: any) {
            const errorMsg = error.response?.data?.message;
            toast.error(errorMsg)
        }
    }


    return(
        <>
        <div className="w-full h-screen flex justify-center items-center ">
            <div className="w-1/3 h-2/3 rounded-lg border border-zinc-800 flex justify-center items-center flex-col p-10 gap-5" >
                <h1 className="text-2xl font-semibold" >Login to your account</h1>
                <form onSubmit={handleSubmit(registerUser)} className="w-full h-1/2 flex justify-evenly items-center flex-col " >
                    <Input autoComplete="off" {...register("email", {required: true})} placeholder="Email" type="email" className="w-2/3 h-12" />
                    <Input autoComplete="off" {...register("password", {required: true} )} placeholder="Password" type="password" className="w-2/3 h-12" />
                    <Button type="submit" className="w-2/3" >Submit </Button>
                    <h2 className="text-sm text-zinc-500" >Don't have an account ? <Link href='/sign-up' className="underline " >Sign-up</Link></h2>
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