"use client"
import { Bell, CalendarCheck, CalendarClock, CalendarDays, ChevronRight, CirclePlus, ListTodo, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "motion/react"
import { Toggle } from "@/components/ui/toggle";

export default function Sidebar(){
    const [storedAvatar, setStoredAvatar] = useState<string | null>(null)
    const [name, setName] = useState<string | null>(null)
    const [open, setOpen] = useState(false)

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
            <div className="w-full h-14 px-3 my-3 ">
                <Link href={'/profile'} className="hover:bg-zinc-800 px-3 w-full h-12 rounded-lg flex justify-start items-center gap-3" >
                {
                    storedAvatar && (
                        <Image src={storedAvatar} alt="pfp" width={300} height={300} className="w-8 h-8 rounded-lg border border-zinc-100 " />
                    )
                }
                <h1>{name}</h1>
                </Link>
            </div>
            <div className="w-full h-[1px] bg-zinc-700 " />
            <div className="w-full h-full ">
                <section className="w-full px-3 my-3">
                    <Link href='/home' className="px-2 w-full h-10 flex justify-start items-center gap-2 hover:bg-zinc-800 rounded-lg "><span><ListTodo size={20} strokeWidth={1.5} /></span>All Tasks</Link>
                    <Link href='/today' className="px-2 w-full h-10 flex justify-start items-center gap-2 hover:bg-zinc-800 rounded-lg "><span><CalendarCheck size={20} strokeWidth={1.5} /></span>Today</Link>
                    <Link href='/upcoming' className="px-2 w-full h-10 flex justify-start items-center gap-2 hover:bg-zinc-800 rounded-lg "><span><CalendarClock size={20} strokeWidth={1.5} /></span>Upcoming</Link>
                </section>
            </div>
            <div className="w-full h-16 p-2">
                <button className="w-full h-full hover:bg-zinc-800 flex justify-center items-center gap-1 rounded"> <Plus /> Add team </button>
            </div>
        </div>
        </>
    )
}