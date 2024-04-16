import { FaPlus, FaPencilAlt } from "react-icons/fa";
import Link from "next/link";
import { ReusableCardThree } from "@/components/ui/developer-cards";

export default function Dcontent() {
  return (
    <main className=" bg-slate-50 min-h-screen">
      <div className="container mx-auto py-8">
        <div className="mt-10 mb-4 text-center text-2xl font-bold mb-8">
          <h1>
            <span style={{ color: "#071013" }}>Developer </span>
            <span style={{ color: "#6bd3b6" }}>Contents</span>
          </h1>
        </div>
        <div className="ml-48 flex justify-center mt-20 grid grid-cols-3 gap-">
          <div>
            <ReusableCardThree gameLink="" gameName="Tic-Tac-Toe" />
            <ReusableCardThree gameLink="" gameName="Tic-Tac-Toe" />
            <ReusableCardThree gameLink="" gameName="Tic-Tac-Toe" />
          </div>
          <div>
            <ReusableCardThree gameLink="" gameName="Tic-Tac-Toe" />
            <ReusableCardThree gameLink="" gameName="Tic-Tac-Toe" />
            <ReusableCardThree gameLink="" gameName="Tic-Tac-Toe" />
          </div>
          <div>
            <ReusableCardThree gameLink="" gameName="Tic-Tac-Toe" />
            <ReusableCardThree gameLink="" gameName="Tic-Tac-Toe" />
            <ReusableCardThree gameLink="" gameName="Tic-Tac-Toe" />
          </div>
        </div>
        {/* Button to toggle additional row */}
        <div className="mt-10 flex justify-center">
          <Link href={"/pages/developer-content/update-page"}>
            <button className="bg-transparent text-custom-blue-green font-semibold py-2 px-4 border border-custom-teal rounded transition-colors duration-300 hover:bg-custom-blue-green hover:text-custom-teal hover:border-transparent">
              <span style={{ color: "#6bd3b6" }}>Update</span>
            </button>
          </Link>

          <div className="ml-5">
            <Link href="/pages/developer-content/Showcase">
              <button className="bg-transparent text-custom-blue-green font-semibold py-2 px-4 border border-custom-teal rounded transition-colors duration-300 hover:bg-custom-blue-green hover:text-white hover:border-transparent flex items-center">
                <FaPlus style={{ color: "#6bd3b6", fontSize: "1.5rem" }} />
                <span style={{ color: "#6bd3b6" }}></span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
