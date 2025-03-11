"use client"
import Sidebar from "@/components/layout/Sidebar"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { signOut, useSession } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export default function Profile() {
    const { data } = useSession()
    const [image, setImage] = useState<string>("")
    const router = useRouter()

    const fetchData = async () => {
        try {
            const storedUserId = localStorage.getItem(data?.user ? "gitHubUserId" : "userId");
            if (!storedUserId) {
                return
            }
            const response = await axios.get(`http://localhost:3000/api/get-user?userId=${storedUserId}`)
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

    useEffect(() => {
        fetchData()
    },[data])

    const handleDeleteAccount = async () => {
        const userId = localStorage.getItem("userId")
        try {
            const response = await axios.delete(`/api/delete-account?userId=${userId}`);
            if (response.status == 200) {
                toast.success("Soon!")
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
                            <Button variant="secondary" disabled={!!data?.user} > Change Password </Button>
                        </div>
                        <div className="w-full flex justify-between items-center my-5 " >
                            <p>Delete Account</p>
                            <Button variant="destructive" className="bg-red-700" disabled={!!data?.user} onClick={() => handleDeleteAccount()} > Delete Account :( </Button>
                        </div>
                    </div>
                    <div className="w-2/3 flex justify-start items-center" >
                        <Button variant="secondary" onClick={() => handleSignOut()} >Sign out</Button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}