import React from "react";
import Box from "@mui/material/Box";
//import reindeer from "/static/images/reindeer.png";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";

interface GenreBoxProps {
  genre: string;
  imageSrc?: string;
}

const ReusableGenreBox: React.FC<GenreBoxProps> = ({ genre, imageSrc }) => {
  return (
    <div className="relative m-2">
      <Card sx={{ maxWidth: 300 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image="/static/images/reindeer.png"
            //image={imageSrc}
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
    </div>
  );
};

export default ReusableGenreBox;
