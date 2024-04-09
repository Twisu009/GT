import Link from "next/link";
import bgAbout from "../public/static/images/bgAbout.png";
import Image from "next/image";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-teal-950 text-white">
      <div className="container mx-auto py-12">
        <div className="flex flex-col md:flex-row justify-center items-center">
          <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Welcome to Our World of Games!
            </h1>
            <p className="text-lg md:text-xl mb-6">
              We are more than just a game discovery platform. We are a
              community of passionate gamers, dedicated to bringing you the best
              gaming experiences.
            </p>
            <p className="text-lg md:text-xl">
              Our mission is to ignite your gaming passion and connect you with
              games that inspire, challenge, and entertain.
            </p>
            <div className="mt-8">
              <button className="bg-teal-950 text-teal-400 font-semibold py-2 px-4 border rounded border-transparent transition-all duration-300 hover:text-slate-100 hover:border-teal-300 flex items-center">
                Back to browsing games
              </button>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <Image
              src={"/static/images/banner.png"}
              alt="About Us"
              className="rounded-lg shadow-lg"
              width={500}
              height={500}
            />

            <div className="absolute bottom-0 right-0 mb-4 mr-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
