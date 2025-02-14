"use client"
import { Button } from "@/components/ui/button";
import { ChevronLeft, Cross, Github, X } from "lucide-react";

export default function LearnMore(){
    return(
        <>
        <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
        <div className="w-full h-screen px-80 py-20 ">
            <div className="w-full h-14 flex justify-start items-center gap-10" >
                <button onClick={() => history.back()} className="w-10 h-10 bg-zinc-500/30 shadow-md flex justify-center items-center rounded-full" ><ChevronLeft size={32} strokeWidth={1.75} /></button>
                <h1 className="text-4xl font-semibold" >Learn more 'bout JotIT </h1>
            </div>
            <div className="w-full px-20" >
            <section className="my-5 " >
                <h2 className="text-2xl font-semibold">Stay Organized, Stay Productive</h2>
                <p className="mt-2 text-gray-500">
                    Managing tasks has never been easier! JotIT is designed to help you stay organized, track your progress, and boost productivity effortlessly. Whether you're planning your daily schedule, managing a project, or simply jotting down ideas, JotIT ensures you never miss a thing.
                </p>
            </section>
            <section className="my-5">
                <h2 className="text-2xl font-semibold">Key Features</h2>
                <ul className="list-disc list-inside mt-2 text-gray-500">
                <li><strong>Simple & Intuitive Design</strong> – Easily add, edit, and delete tasks with a clean and user-friendly interface.</li>
                <li><strong>Smart Task Management</strong> – Organize tasks by categories, priorities, or deadlines to keep everything in order.</li>
                <li><strong>Reminders & Notifications</strong> – Set reminders so you never forget an important task.</li>
                <li><strong>Collaboration</strong> – Share lists and collaborate with family, friends, or teammates in real time.</li>
                </ul>
            </section>
            <section className="my-5">
                <h2 className="text-2xl font-semibold">Why Choose JotIT?</h2>
                <p className="mt-2 text-gray-500">
                JotIT is lightweight, fast, and free, unlike other task management apps. We prioritize simplicity without compromising powerful features. Whether you’re a student, professional, or entrepreneur, JotIT adapts to your needs seamlessly.
                </p>
            </section>
            <section className="my-5">
                <h2 className="text-2xl font-semibold">How to Get Started</h2>
                <ol className="list-decimal list-inside mt-2 text-gray-500">
                <li><strong>Sign Up</strong> – Create an account with your email or log in using Google.</li>
                <li><strong>Create Tasks</strong> – Start adding tasks with deadlines and categories.</li>
                <li><strong>Set Priorities</strong> – Mark important tasks and track progress.</li>
                <li><strong>Stay Notified</strong> – Enable notifications to receive timely reminders.</li>
                <li><strong>Collaborate & Achieve More</strong> – Share lists and work together effortlessly.</li>
                </ol>
            </section>
            <div className="mt-10 w-full h-10 flex justify-start items-center gap-5" >
                <Button onClick={() => history.back()} >
                    OK
                </Button>
            </div>
            </div>
        </div>
        </>
    )
}