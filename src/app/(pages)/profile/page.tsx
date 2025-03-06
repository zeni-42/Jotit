"use client"
import Sidebar from "@/components/layout/Sidebar"
import axios from "axios"
import Image from "next/image"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export default function Profile() {
    const [data, setData] = useState({})
    const image = localStorage.getItem('avatar')!

    const fetchData = async () => {
        try {
            const storedUserId = localStorage.getItem("userId")
            const response = await axios.get(`http://localhost:3000/api/get-user?userId=${storedUserId}`)
            setData(response.data?.data)
        } catch (error: any) {
            console.log("Failed to fetch user data");
            const errMsg = error.response?.data?.message;
            toast.error(errMsg)
        }
    }

    useEffect(() => {
        fetchData()
    },[])

    return (
        <>
        <div className="flex h-screen">
            <div className="w-1/5 h-screen">
                <Sidebar />
            </div>
            <div className="w-4/5" >
                <div className="w-full h-screen p-4" >
                    <Image src={image} alt="avatar" width={1000} height={10000} className="w-40 h-40 rounded-full" />
                </div>
            </div>
        </div>
        </>
    )
}