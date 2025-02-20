"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import axios from "axios"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

export default function Signin(){
    const { register, handleSubmit, reset } = useForm()

    const registerUser = async (data: any) => {
        try {
            console.log(data);
            const response = await axios.post('/api/sign-up', data )
            if (response.status == 200) {
                toast.success("User registerd")
                reset
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
            <div className="w-1/3 h-2/3 rounded-lg border border-zinc-800 flex justify-center items-center flex-col p-10 gap-5" >
                <h1 className="text-2xl font-semibold" >Create an account</h1>
                <form onSubmit={handleSubmit(registerUser)} className="w-full h-1/2 flex justify-evenly items-center flex-col " >
                    <Input autoComplete="off" {...register("fullName", {required: true})} placeholder="Name" type="text" className="w-2/3 h-12" />
                    <Input autoComplete="off" {...register("email", {required: true})} placeholder="Email" type="email" className="w-2/3 h-12" />
                    <Input autoComplete="off" {...register("password", {required: true} )} placeholder="Password" type="password" className="w-2/3 h-12" />
                    <Button type="submit" className="w-2/3" >Submit </Button>
                    <p className="text-sm text-zinc-700" >By clicking "Submit", you agree to our Terms & Conditions</p>
                </form>
                <div className="w-full -mt-5 " >
                    <h2 className="text-center" >OR</h2>
                </div>
            </div>
        </div>
        </>
    )
}