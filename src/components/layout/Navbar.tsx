"use client"

import { Github } from "lucide-react"

export default function Nabvar(){
    return (
        <>
        <div className="w-full h-14 fixed top-0 px-[25vw] flex justify-end items-center ">
            <a href="https://www.github.com/zeni-42" target="_blank">
                <Github />
            </a>
        </div>
        </>
    )
}