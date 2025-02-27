"use client"
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Calendar, Plus, Settings2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Home() {
    const [addForm, setAddForm] = useState(false)
    const [task, setTask] = useState<string>("")
    const [userId, setUserId] = useState<string | null>(null)

    useEffect(() => {
        const storedId = localStorage.getItem("userId");
        if (storedId) setUserId(storedId);
    }, []);

    const addData = async () => {
        console.log(task);
        try {
            const response = await axios.post('/api/add-task', { userId, content: task })
            if (response.status == 200) {
                toast.success("Task added")
                setTask("")
            }
        } catch (error: any) {
            console.log(error);
            const errMsg = error.response?.data?.message;
            toast.error(errMsg)
        }
    }

    return (
        <>
            <div className="flex h-screen">
                <div className="w-1/5 h-screen">
                    <Sidebar />
                </div>
                <div className="w-4/5 p-4">
                    <div className="px-2 w-full h-20 flex justify-between items-center font-semibold" >
                        <h1 className="text-2xl" >All Tasks</h1>
                        <div className="w-1/6 flex justify-evenly items-center">
                            <Button onClick={() => setAddForm((e) => !e)}>
                                <Plus /> ADD TASKS
                            </Button>
                            <Button variant="ghost">
                                <Settings2 />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            {
                addForm && (
                    <>
                        <div className="fixed top-0 w-full h-screen flex justify-center items-center backdrop-blur-2xl bg-zinc-900/80" >
                            <div className="w-1/2 h-1/3 bg-zinc-950 border border-zinc-800 rounded-xl fixed top-40 flex justify-center items-center flex-col px-28 gap-5 ">
                                <div className="w-full h-12 flex justify-evenly items-start flex-col" >
                                    <h1 className="text-xl font-semibold" >Enter your task</h1>
                                </div>
                                    <Input className="h-12" placeholder="eg. Purchase stuff from Medical" value={task} onChange={(e) => setTask(e.target.value)} />
                                <div className="w-full flex justify-between items-center" >
                                    <div>
                                        <Button variant="outline" ><Calendar /></Button>
                                    </div>
                                    <div className="w-1/2 flex justify-end items-center gap-5">
                                        <Button variant="secondary" onClick={() => setAddForm(e => !e)} >Cancel</Button>
                                        <Button onClick={ addData } >Add Task</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
        </>
    );
}
