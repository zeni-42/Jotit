"use client"
import Bottombar from "@/components/layout/Bottombar";
import Nabvar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const headings = ["A Million-Dollar Product,", "Yours for Free"]

  const router = useRouter()

  return (
    <>
    <Nabvar />
    <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <div className="w-full h-[90vh] text-center flex justify-center items-center flex-col gap-2 " >
        <div>
        {
          headings.map((items, index) => (
            <h1 key={index} className={` text-6xl font-medium leading-[3vw] bg-gradient-to-tr from-slate-100 to-zinc-300 bg-clip-text text-transparent`}>
                {items}
            </h1>
          ))
        }
        </div>
        <h3 className="text-xl text-slate-400 mt-5 px-[30vw] " > A powerful tool to boost your productivity, and improve your efficiency and what can be great than a personalized reminder.</h3>
        <div className="w-full h-14 flex justify-center items-center gap-10 mt-5" >
          <Button onClick={() => router.push('/learn-more')} variant={"secondary"} >Learn More</Button>
          <Button onClick={() => router.push('/sign-up')}>Get started</Button>
        </div>
      </div>
    <Bottombar />
    </>
  );
}
