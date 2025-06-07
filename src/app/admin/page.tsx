'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { User } from '@supabase/supabase-js';

type Post = {
  id: number;
  created_at: string;
  title: string;
  content: string;
};


export default function Admin() {
    const [displayPost, setDisplayPost] = useState(true);
    const [ form, setForm ] = useState({ email: '', password: ''});
    const [ user, setUser ] = useState<User | null>(null);
    const [ error, setError ] = useState("");
    const [posts, setPosts] = useState<Post[]>([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect( () => {
        const checkUser = async () => {
            const { data } = await supabase.auth.getUser();
            if (data?.user) {
                setUser(data.user);
            }
        };

        checkUser();
        fetchPosts();
    }, []);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { data, error } = await supabase.auth.signInWithPassword({
            email: form.email,
            password: form.password
        });

        if (error) {
            alert('Wrong Info!')
            setError(error.message);
        } else {
            alert('Logged in!');
            if (data?.user) {
                setUser(data.user);
            }
            
        }
    }

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error("Logout error: ", error.message);
        } else {
            setUser(null);
            setDisplayPost(false);
            alert("Logged out!");
        }
    }

    
    const fetchPosts = async () => {
        const { data, error } = await supabase
            .from("blogs")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            console.error(error);
        } else {
            setPosts(data);
        }
    }


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { data, error } = await supabase
            .from("blogs")
            .insert([{title, content}]);

            if (error) {
                setError(error.message);
            } else {
                setTitle("");
                setContent("");
                setError("");
                fetchPosts();
            }
    };
    
    const handleDelete = async (id: number) => {
        const { error } = await supabase
            .from('blogs')
            .delete()
            .eq('id', id)

        if (error) {
            console.error('Delete error:', error.message)
        } else {
            fetchPosts();
        }
    }

    return (
        <main className="p-14 overflow-hidden">
            <nav className="relative" style={{ height: "6.25vh" }}>
                    <div className="flex justify-evenly font-semibold w-full">
                        <Link href="/">Go back</Link>
                        <button className="hover:text-indigo-400 hover:font-bold transition duration-300 ease-in-out cursor-pointer"
                                onClick={() => {setDisplayPost(true);}}>
                            Posts
                        </button>
                        <button className="hover:text-indigo-400 hover:font-bold transition duration-300 ease-in-out cursor-pointer"
                                onClick={() => {setDisplayPost(false);}}>
                            Log In
                        </button>
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
                { displayPost ? 
                <section className="flex justify-center">
                    { user ? (<div className="flex w-full">
                        <div className="basis-1/3 p-4">
                            <h1>Posts</h1>
                            {posts.map((post) => (
                                <div key={post.id} className="my-3">
                                    <div className="flex justify-between">
                                        <h2 className="font-bold text-xl">{post.title}</h2>
                                        <button onClick={() => handleDelete(post.id)}>
                                            <Image src="/delete.png" width={28} height={28} alt="delete" className="opacity-50 hover:opacity-100 hover:cursor-pointer"/>
                                        </button>
                                    </div>
                                    <small>{new Date(post.created_at).toLocaleString()}</small>

                                </div>
                            ))}
                        </div>
                        <div className="basis-2/3 p-4">
                            <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
                                <label>
                                    Title: 
                                    <input className="border rounded-lg ml-9 w-1/2" 
                                           type="text"
                                           placeholder="Post title"
                                           value={title}
                                           onChange={(e) => setTitle(e.target.value)}
                                    />
                                </label>
                                <label>
                                    Content:
                                    <textarea
                                        className="border rounded-lg mt-4 w-full resize-none overflow-hidden whitespace-pre-wrap break-words"
                                        rows={1}
                                        onInput={(e) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            target.style.height = "auto";
                                            target.style.height = `${target.scrollHeight}px`;
                                        }}
                                        onChange={(e) => setContent(e.target.value)}
                                    />
                                </label>
                                <button type="submit" 
                                        className="border rounded-lg w-23 cursor-pointer">
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>) : (<div>
                        Please Log In
                    </div>)}

                </section> : user ? 
                (<section className="grid grid-rows-1 gap-4 text-center justify-center">
                    <p>{form.email}</p>
                    <button type="submit" 
                            className="border rounded-lg w-40 cursor-pointer"
                            onClick={handleLogout}
                    >
                        Log Out
                    </button>   
                </section>
            
            ) : (
                <section className="flex items-center justify-center">
                    <form className="grid grid-cols-1 gap-4" onSubmit={handleLogin}>
                        <label>
                            Email:  
                            <input 
                                type="text"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                className="border rounded-lg ml-9 p-1"
                            />
                        </label>
                        <label>
                            Password:  
                            <input 
                                type="password"
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                className="border rounded-lg m-2 p-1"
                            />
                        </label>
                        <div className="flex justify-center">
                            <button type="submit" 
                                    className="border rounded-lg w-40 cursor-pointer"
                            >
                                Log In
                            </button>
                        </div>
                    </form>
                </section>
                )}
        </main>
    )
}