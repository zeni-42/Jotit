"use client"
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Calendar, Check, CheckCheck, Plus, Trash } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Home() {
    const { data } = useSession()
    const [addForm, setAddForm] = useState(false)
    const [task, setTask] = useState<string>("")
    const [fetchedTask, setFetchedTasks] = useState<any[]>([])
    const [page, setPage] = useState(1)
    const [maxPage, setMaxPage] = useState<number>()

    const registerGithubUser = async () => {
        const newData = {
            fullName: data?.user?.name!,
            email: data?.user?.email!,
            avatar: data?.user?.image!
        }
        console.log(newData);
        // try {
        //     const response = await axios.post('/api/sign-up', newData )
        //     if (response.status == 200) {
        //         console.log("Registerd");
        //     }
        // } catch (error) {
        //     console.log("Somthing went wrong");
        //     toast.error("failed to save")
        // }
    }

    useEffect( () => {
        if (data?.user) {
            registerGithubUser()
        }
    } ,[data])

    const fetchTasks = async () => {
        const userId = localStorage.getItem("userId")
        const response = await axios.post('http://localhost:3000/api/get-task', { taskId: "", userId, page })
        setFetchedTasks(response.data?.data?.data)
        setMaxPage(response.data?.data?.pagination?.totalPages)
    }

    const addData = async () => {
        try {
            const userId = localStorage.getItem("userId")
            const response = await axios.post('/api/add-task', { userId, content: task })
            if (response.status == 200) {
                toast.success("Task added")
                setTask("")
                setAddForm(false)
                fetchTasks()
            }
        } catch (error: any) {
            const errMsg = error.response?.data?.message;
            toast.error(errMsg)
        }
    }

    const handleNextSetOfData = async () => {
        if (page == maxPage) {
            toast.success("No more data")
            return
        }
        try {
            setPage((page) => page + 1)
            const userId = localStorage.getItem("userId")
            const nextPage = page + 1
            const response = await axios.post('http://localhost:3000/api/get-task', { taskId: "", userId, page: nextPage })
            setFetchedTasks(response.data?.data?.data)
        } catch (error) {
            console.log("Failed");
        }
    }

    const handlePrevSetOfData = async () => {
        if (page <= 1) {
            toast.error("This is the first page")
            return
        }
        try {
            setPage((page) => page -1 )
            const userId = localStorage.getItem("userId")
            const prevPage = page - 1
            const response = await axios.post('http://localhost:3000/api/get-task', { taskId: "", userId, page: prevPage })
            setFetchedTasks(response.data?.data?.data)
        } catch (error) {
            console.log("Failed");
        }
    }

    const updateComplete = async (taskId: any) => {
        try {
            const response = await axios.put(`http://localhost:3000/api/update-complete?taskId=${taskId}`)
            if (response.status == 200) {
                toast.success("Completed")
                fetchTasks()
            }
        } catch (error) {
            toast.error("Failed to update")
        }
    }

    const deleteTask = async (taskId: any) => {
        try {
            const res = await axios.delete(`http://localhost:3000/api/delete-task?taskId=${taskId}`)
            if (res.status == 200) {
                toast.success("Deleted")
                fetchTasks()
            }
        } catch (error) {
            toast.error("!Deleted")
        }
    }

    const listCompleted = () => {
        console.log("Logic");
    }

    useEffect(() => {
        fetchTasks();
    },[])

    return (
        <>
            <div className="flex h-screen">
                <div className="w-1/5 h-screen">
                    <Sidebar />
                </div>
                <div className="w-4/5 p-4">
                    <div className="px-2 w-full h-20 flex justify-between items-center font-semibold" >
                        <h1 className="text-2xl" >All Tasks</h1>
                        <div className="w-1/5 flex justify-evenly items-center">
                            <Button onClick={() => setAddForm((e) => !e)}>
                                <Plus /> ADD TASKS
                            </Button>
                            <Button variant="ghost">
                                <Calendar />
                            </Button>
                            <Button variant="ghost" onClick={() => listCompleted()}>
                                <CheckCheck />
                            </Button>
                        </div>
                    </div>
                    <div className="w-full h-[85vh] flex justify-start items-center flex-col gap-5" >
                    {
                        fetchedTask.length > 0 ? (
                            fetchedTask.map((task, index) => (
                                <div className="text-white w-full h-14 bg-zinc-900 border border-zinc-800 flex justify-start items-center px-5 rounded-lg" key={task._id}>
                                    <div className="w-1/2 flex justify-start items-center gap-5" >
                                        <p>
                                            {index + 1}.
                                        </p>
                                        <p>
                                            { task.isCompleted ? (
                                                <s>{task.task}</s>
                                            ) : (
                                                <>{task.task}</>
                                            ) }
                                        </p>
                                    </div>
                                    <div className="w-1/2 flex justify-end items-center gap-5 ">
                                        <Button variant="secondary" onClick={() => updateComplete(task._id)} ><Check /></Button>
                                        <Button variant="destructive" className="bg-red-700" onClick={() => deleteTask(task._id)} ><Trash /></Button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div>No active task</div>
                        )
                    }
                    </div>
                    <div className="w-full flex justify-end items-center gap-5" >
                        { fetchedTask.length > 0 ? (
                            <>
                                <Button variant="link" onClick={() => handlePrevSetOfData() } >Previous</Button>
                                <div>{page}</div>
                                <Button variant="link" onClick={() => handleNextSetOfData() } >Next</Button>
                            </>
                        ): (
                            <></>
                        ) }
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
                                        <Button variant="secondary" onClick={() => {
                                                setAddForm(e => !e);
                                                setTask("")
                                            }} >Cancel</Button>
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
