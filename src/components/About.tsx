import Image from "next/image";

export default function About() {
    return (
    <section>
        <section>
          <h2 className="lg:text-3xl text-2xl text-center font-semibold text-indigo-400 mb-4 ">Cybersecurity Engineer | Software Developer</h2>
          <p className="lg:text-xl text-md text-center italic mb-10">"Doing my best to achieve my dream - one commit at a time."</p>
        </section>
        <section className="h-full mx-5">
            <h1 className="lg:text-3xl text-xl text-center font-semibold mb-4">About Me 🧑‍💻 </h1>
            <p className="lg:text-xl/8 text-md/8 max-w-200 lg:mx-auto opacity-80">
              Hi, I'm Afham. I'm currently pursuing my Bachelor's in Computer Science (Hons.) at MMU.
              Specializing in Cybersecurity, I’m also passionate about Software Development and InfoSec.
              My dream is to work at top companies such as Microsoft and Mercari — and I’m committed to making it happen.
            </p>
        </section>
    </section>  
    )

}