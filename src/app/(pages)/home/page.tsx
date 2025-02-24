"use client"
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Plus, Settings2 } from "lucide-react";
import { useState } from "react";

export default function Home() {
    const [addForm, setAddForm] = useState(false)

    return (
        <>
            <div className="flex h-screen">
                <div className="w-1/5 h-screen">
                    <Sidebar />
                </div>
                <div className="w-4/5 p-4">
                    <div className="px-2 w-full h-20 flex justify-between items-center font-semibold" >
                        <h1 className="text-2xl" >All Tasks</h1>
                        <div className="w-1/6 flex justify-evenly items-center" >
                            <Button onClick={() => setAddForm((e) => !e )} >
                                <Plus /> Add task
                            </Button>
                            <Button variant="ghost" >
                                <Settings2 />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            {
                addForm && (
                    <>
                    <div className="fixed top-0 w-full h-screen backdrop-blur-md bg-zinc-950/50" >

                    </div>
                    </>
                )
            }
        </>
    );
}
