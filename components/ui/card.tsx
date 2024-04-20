export const ReusableCard = ({ cardLink = "", imageSrc = "", text = "" }) => {
  return (
    <div style={{ display: "flex" }}>
      <div className="relative border-2 border-black-800 h-[250px] w-[250px] overflow-hidden m-2  hover:scale-110 hover:cursor-pointer">
        <img
          src={imageSrc || "/static/images/developer.png"}
          className="absolute inset-0 h-full w-full object-cover"
        ></img>
        <a
          href={cardLink}
          className="absolute bottom-0 left-0 right-0 bg-slate-900 h-[50px] text-white opacity-80 flex justify-center items-center"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0) 100%)",
            opacity: 0.8,
            display: "responsive",
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          {text || "Name"}
        </a>
      </div>
    </div>
  );
};
