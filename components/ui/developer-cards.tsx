import Link from "next/link";

export const ReusableCardThree = ({ gameLink = "", gameName = "" }) => {
  return (
    <div className="flex border-2 border-black-800 h-[200px] w-[150px] overflow-hidden m-2 hover:scale-110 hover:cursor-pointer relative">
      <div className="absolute inset-0 flex flex-col justify-center items-center">
        <Link legacyBehavior href={gameLink}>
          <a className="text-custom-blue-green font-bold text-sm hover:text-custom-teal transition-colors duration-300">
            {gameName}
          </a>
        </Link>
      </div>
      <div className="absolute top-0 right-full flex flex-col justify-center items-center w-2/3 bg-black bg-opacity-50 h-full">
        <span className="text-white font-bold text-sm">{gameName}</span>
      </div>
    </div>
  );
};
