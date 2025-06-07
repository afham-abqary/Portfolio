'use client';

import Image from "next/image";
import { useState } from "react";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Blog from "@/components/Blog";


export default function Home() {
  const [display, setDisplay] = useState("About");

  return (
    <main className=" p-14 overflow-hidden">

      <h1 className="text-4xl text-center font-bold mb-10 mx-auto">Hi, My Name is Afham</h1>
      <nav className="mx-auto lg:w-300" style={{ height: "6.25vh" }}>
        <div className="flex justify-evenly font-semibold w-full">
          <button
            className="hover:text-indigo-400 hover:font-bold transition duration-300 ease-in-out cursor-pointer"
            onClick={() => {setDisplay("About");}}
            >About</button>
          <button
             className="hover:text-indigo-400 hover:font-bold transition duration-300 ease-in-out cursor-pointer"
             onClick={() => {setDisplay('Projects');}}
             >Projects</button>
          <button
             className="hover:text-indigo-400 hover:font-bold transition duration-300 ease-in-out cursor-pointer"
             onClick={() => {setDisplay("Experience");}}
             >Experience</button>
          <div className="grid grid-cols-4 gap-2">
            <a href="https://github.com/afham-abqary" target="_blank">
              <Image src="/resume.png" width={28} height={28} alt="Resume" className="col-span-2 opacity-50 hover:opacity-100" />
            </a>
            <a href="https://github.com/afham-abqary" target="_blank">
              <Image src="/github.svg" width={28} height={28} alt="GitHub" className="col-span-3 opacity-50 hover:opacity-100" />
            </a>
            <a href="https://www.linkedin.com/in/afham-abqary/" target="_blank">
              <Image src="/linkedin.svg" width={28} height={28} alt="LinkedIn" className="col-span-4 opacity-50 hover:opacity-100" />
            </a>
          </div>
        </div>
      </nav>

      <div className="relative lg:mx-5 mx-20  pt-10">
        {display == "About" ? <About /> : <p></p>}
        {display == "Projects" ? <Projects /> : <p></p>}
        {display == "Experience" ? <Blog /> : <p></p>}
      </div>
    </main>

  );
}
