import React from "react";
//import reindeer from "/static/images/reindeer.png";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import Link from "next/link";

interface GenreBoxProps {
  id: number;
  genre: string;
  imageSrc?: string;
}

const ReusableGenreBox: React.FC<GenreBoxProps> = ({ id, genre, imageSrc }) => {
  return (
    <Link href={`/pages/genre/${id}`} className="relative m-2">
      <Card sx={{ maxWidth: 300 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image="/static/images/reindeer.png"
            // image={imageSrc}
            alt="genre"
          />
          {/* Box container with padding */}
          {/* <a
                        href={`/${genre.toLowerCase()}`}
                        className="text-gray-700 font-semibold"
                    >
                        {genre}
                    </a> */}
          <CardContent className="text-center">
            <Typography gutterBottom variant="h6" component="div">
              {genre}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};

export default ReusableGenreBox;
