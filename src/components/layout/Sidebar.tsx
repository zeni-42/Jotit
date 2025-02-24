"use client"
import { Bell, CalendarCheck, CalendarClock, CalendarDays, CirclePlus, DownloadIcon, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function Sidebar(){
    const [storedAvatar, setStoredAvatar] = useState<string | null>(null)
    const [name, setName] = useState<string | null>(null)

    useEffect(() => {
        setStoredAvatar(localStorage.getItem("avatar"))
        setName(localStorage.getItem("fullName"))

        return (() => {
            setStoredAvatar(null)
            setName(null)
        })
    },[])

    return (
        <>
        <div className="fixed left-0 w-1/5 h-screen border-r border-zinc-700 bg-zinc-900 flex justify-between items-center flex-col">
            <div className="w-full h-14 flex justify-center items-center p-1">
                <Link href={'/profile'} className="hover:bg-zinc-800 px-3 w-1/2 h-full rounded flex justify-start items-center gap-3" >
                {
                    storedAvatar && (
                        <Image src={storedAvatar} alt="pfp" width={300} height={300} className="w-7 h-7 rounded-lg border border-zinc-100 " />
                    )
                }
                <h1>{name}</h1>
                </Link>
                <div className="w-1/2 h-full flex justify-end items-center px-3 gap-1">
                    <button className="hover:bg-zinc-800 w-11 h-full flex justify-center items-center rounded text-zinc-300 " ><Bell size={20} /></button>
                    <button className="hover:bg-zinc-800 w-11 h-full flex justify-center items-center rounded text-zinc-300 " ><CalendarDays size={20} /></button>
                </div>
            </div>
            <div className="w-full h-full p-3 ">
                <section className="w-full ">
                    <button className="px-10 w-full h-10 flex justify-start items-center gap-2 hover:bg-zinc-800 rounded-lg"><span><CirclePlus size={20} /></span> Add task</button>
                    <Link href='/' className="px-10 w-full h-10 flex justify-start items-center gap-2 hover:bg-zinc-800 rounded-lg "><span><CalendarCheck size={20} /></span>Today</Link>
                    <Link href='/' className="px-10 w-full h-10 flex justify-start items-center gap-2 hover:bg-zinc-800 rounded-lg "><span><CalendarClock size={20} /></span>Upcoming</Link>
                </section>
            </div>
            <div className="w-full h-16 p-2">
                <button className="w-full h-full hover:bg-zinc-800 flex justify-center items-center gap-1 rounded"> <Plus /> Add team </button>
            </div>
        </div>
        </>
    )
}