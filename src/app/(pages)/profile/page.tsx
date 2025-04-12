"use client"
import Sidebar from "@/components/layout/Sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import axios from "axios"
import { signOut, useSession } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

export default function Profile() {
    const { data } = useSession()
    const [image, setImage] = useState<string>("")
    const router = useRouter()
    const [changePass, setChangePass] = useState(false);
    const [sure, setSure] = useState(false)
    const { register, handleSubmit, reset } = useForm()

    const fetchData = async () => {
        try {
            const storedUserId = localStorage.getItem(data?.user ? "gitHubUserId" : "userId");
            if (!storedUserId) {
                return
            }
            const response = await axios.get(`/api/get-user?userId=${storedUserId}`)
            setImage(response.data?.data?.avatar!)
        } catch (error: any) {
            const errMsg = error.response?.data?.message;
            toast.error(errMsg)
        }
    }

    const handleSignOut = async () => {
        if (data) {
            signOut()
            router.push('/sign-in')
            return
        }
        try {
            const resposne = await axios.get('/api/sign-out')
            if (resposne.status == 200) {
                router.push('/sign-in')
                localStorage.removeItem("userId")
                localStorage.removeItem("avatar")
                localStorage.removeItem("fullName")
                localStorage.removeItem("email")
            }
        } catch (error) {
            console.log("Sign-out denied");
        }
    }

    const handleChangePassword = async (data: any) => {
        if (!data.oldPass || !data.newPass || !data.cnfPass) {
            toast.error("All fields are required")
        }

        if (data.oldPass == data.newPass) {
            toast.error("New password cannot be same as old password")
        }

        if (data.newPass !== data.cnfPass) {
            toast.error("New Password does not match")
        }

        try {
            const userId = localStorage.getItem('userId')
            if (!userId) {
                return;
            }
            const response = await axios.put(`/api/update-password?userId=${userId}&oldPass=${data.oldPass}&newPass=${data.cnfPass}`)
            if (response.status == 200) {
                toast.success("Password updated");
                reset()
                setChangePass((prev) => !prev)
            }
        } catch (error: any) {
            const errorMsg = error.response?.data?.message;
            toast.error(errorMsg)
        } finally {
            reset()
        }
    }

    useEffect(() => {
        fetchData()
    },[data])

    const handleDeleteAccount = async () => {
        const userId = localStorage.getItem("userId")
        try {
            const response = await axios.delete(`/api/delete-account?userId=${userId}`);
            if (response.status == 200) {
                toast.success("Soon!");
                router.push('/sign-up')
            }
        } catch (error) {
            toast.error("Failed :)")
        }
    }

    return (
        <>
        <div className="flex h-screen">
            <div className="w-1/5 h-screen">
                <Sidebar />
            </div>
            <div className="w-4/5" >
                <div className="w-full h-screen flex justify-start items-center flex-col gap-5" >
                    <div className="w-2/3 h-fit flex justify-between items-center py-5 mt-10 border-b border-zinc-800 ">
                        <div>
                            <h1 className="text-2xl font-semibold" >{localStorage.getItem("fullName")! || data?.user?.name}</h1>
                            <p className="text-lg font-normal" >{localStorage.getItem("email")! || data?.user?.email}</p>
                            <p>{data?.user?.id}</p>
                        </div>
                        <div>    
                            {   image ? (
                                    <Image src={image} alt="avatar" width={1000} height={1000} className="w-40 h-40 rounded-full" />
                                ) : (
                                    <p className="text-gray-500">No Avatar</p>
                            )}
                        </div>
                    </div>
                    <div className="w-2/3 border-b border-zinc-800">
                        <h1 className="text-2xl font-semibold" >Account Settings</h1>
                        <div className="w-full flex justify-between items-center my-5 " >
                            <p>Password</p>
                            <Button onClick={() => setChangePass((prev) => !prev)} variant="secondary" disabled={!!data?.user} > Change Password </Button>
                        </div>
                        <div className="w-full flex justify-between items-center my-5 " >
                            <p>Delete Account</p>
                            <Button variant="destructive" className="bg-red-700" disabled={!!data?.user} onClick={() => setSure((e) => !e )} > Delete Account :( </Button>
                        </div>
                    </div>
                    <div className="w-2/3 flex justify-start items-center" >
                        <Button variant="secondary" onClick={() => handleSignOut()} >Sign out</Button>
                    </div>
                </div>
            </div>
        </div>
        {
            changePass && (
                <>
                <div className="fixed top-0 w-full h-screen backdrop-blur-2xl flex justify-center items-center" >
                    <div className="w-1/3 h-1/2 rounded-xl bg-black shadow-xl">
                        <form action="" className="w-full h-full flex justify-center items-center flex-col gap-5" >
                            <h1 className="text-2xl font-semibold">Update your password</h1>
                            <Input {...register("oldPass")} autoComplete="off" placeholder="Old Password" className="w-4/5 h-12 " />
                            <Input {...register("newPass")} autoComplete="off" placeholder="New Password" className="w-4/5 h-12 " />
                            <Input {...register("cnfPass")} autoComplete="off" placeholder="Confirm Password" className="w-4/5 h-12 " />
                            <div className="w-full flex justify-center items-center gap-10" >
                                <Button variant="secondary" className="w-40 h-10" onClick={() => setChangePass((prev) => !prev)} > Cancel </Button>
                                <Button type="submit" className="w-40 h-10" onClick={handleSubmit(handleChangePassword)} > Update </Button>
                            </div>
                        </form>
                    </div>
                </div>
                </>
            )
        }
        {
            sure && (
                <>
                <div className="w-full h-screen backdrop-blur-2xl fixed top-0 flex justify-center items-center" >
                    <div className="w-1/3 h-1/3 rounded-xl bg-black shadow-xl flex justify-center items-center flex-col gap-10">
                        <h1>Are you sure want to delete you account ?</h1>
                        <div className="w-full flex justify-center items-center gap-10" >
                            <Button variant="secondary" className="w-40 h-10" onClick={() => setSure((prev) => !prev)} > Cancel </Button>
                            <Button variant="destructive" type="submit" className="w-40 h-10 bg-red-700" onClick={() => handleDeleteAccount()} > Delete </Button>
                        </div>
                    </div>
                </div>
                </>
            )
        }
        </>
    )
}