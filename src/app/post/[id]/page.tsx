'use client';

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

type Post = {
  id: number;
  created_at: string;
  title: string;
  content: string;
};


export default function Post() {
    const {id} = useParams();

    const [ post, setPost ] = useState<Post | null>(null);

    const fetchPost = async () => {
        const { data, error } = await supabase
            .from("blogs")
            .select("*")
            .eq("id", id)
            .maybeSingle();

        if (error) {
            alert(error.message);
        } else {
            setPost(data);
        }
    }

    useEffect(() => {
        fetchPost();
    })

    return (
        <main className="p-14 overflow-hidden">

            <nav className="relative" style={{ height: "6.25vh" }}>
                <div className="flex justify-evenly font-semibold w-full">
                <Link href="/">Go Back</Link>
                <div className="grid grid-cols-4 gap-2">
                    <Link href="/admin">
                    <button className="">
                        <Image src="/resume.png" width={28} height={28} alt="Resume" className="col-span-1 opacity-0" />
                    </button>
                    </Link>
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
            <section className="">
                { post ? (
                    <div className="grid grid-cols-1 place-items-center">
                        <h1 className="text-4xl text-center">{post.title}</h1>
                        <p className="leading-relaxed  mt-10 w-1/2 ">{post.content}</p>
                    </div>
                
                ) : (<div>
                    Unavailable to get post
                </div>)}
            </section>

            


        </main>
    )
}