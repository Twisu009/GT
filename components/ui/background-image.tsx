import Image from "next/image";

interface ImageWithTextProps {
    imageUrl: string;
    text: string;
}

const BackgroundImage: React.FC<ImageWithTextProps> = ({ imageUrl, text }) => {
    return (
        <div>
            <div
                className="absolute inset-0 -z-10"
                style={{
                    backgroundImage: `url(${imageUrl})`,
                    backgroundSize: "cover",
                    width: "100%",
                    height: "100%",
                    opacity: 1,
                }}
            />
        </div>
    );
};

export default BackgroundImage;
