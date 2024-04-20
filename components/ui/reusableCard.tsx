export const ReusableCardTwo = ({
    NewReleasescardLink = "",
    imageSrc = "",
    text = "",
}) => {
    return (
        <div className="relative border-2 border-black-800 h-[300px] w-[230px] overflow-hidden m-2 hover:scale-110 hover:cursor-pointer flex flex-col justify-center items-center">
            <img
                src={imageSrc || "/static/images/developer.png"}
                className="absolute inset-0 h-full w-full object-cover opacity-90 hoveer:opacity-100"
                alt="img"
            />
            <a
                href={NewReleasescardLink}
                className="absolute bottom-50 left-0 right-0 bg-slate-900 h-full text-white flex justify-center items-center text-center hover:opacity-0 hover:bottom-0"
                style={{
                    background:
                        "linear-gradient(to top, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0) 100%)",
                }}
            >
                {text || "Game Name"}
            </a>
        </div>
    );
};
