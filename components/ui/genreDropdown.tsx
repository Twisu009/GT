"use client";

import Link from "next/link";
import { SetStateAction, useState } from "react";

const ReusableGenreDropdowns = () => {
  const genres = [
    {
      name: "Action",
      image: "/static/images/actionDrop.jpg",
      description: (
        <div className="text-justify ml-5">
          <p>
            <strong>Description:</strong>
          </p>
          <ul>
            <li>
              Action games are characterized by fast-paced gameplay, requiring
              quick reflexes and hand-eye coordination.
            </li>
            <li>
              They often involve combat, shooting, or other physical challenges.
            </li>
            <li>
              <br></br>
              <strong>
                <u>Examples include:</u>
              </strong>{" "}
              "Call of Duty," "Grand Theft Auto," and "Assassin's Creed."
            </li>
          </ul>
          <br></br>
          <p>
            <strong>Note:</strong> Genres can be mixed, such as action-adventure
            games, which combine action elements with exploration and
            puzzle-solving.
          </p>
          <br></br>
        </div>
      ),
    },
    {
      name: "Adventure",
      image: "/static/images/advDrop.jpg",
      description: (
        <div className="text-justify ml-5">
          <p>
            <strong>Description:</strong>
          </p>
          <ul>
            <li>
              Adventure games emphasize exploration, storytelling, and
              puzzle-solving.
            </li>
            <li>
              Players typically control a character who progresses through a
              narrative-driven experience.
            </li>
            <br></br>
            <li>
              <strong>
                <u>Examples include:</u>
              </strong>{" "}
              "The Legend of Zelda," "Uncharted," and "Tomb Raider."
            </li>
          </ul>
          <br></br>
          <p>
            <strong>Note:</strong> Adventure games may include elements of other
            genres, such as action or role-playing.
          </p>
          <br></br>
          <br></br>
        </div>
      ),
    },
    {
      name: "Horror",
      image: "/static/images/horrorDrop.jpg",
      description: (
        <div className="text-justify ml-5">
          <p>
            <strong>Description:</strong>
          </p>
          <ul>
            <li>
              Horror games are designed to evoke fear and suspense in players.
            </li>
            <li>
              They often feature dark atmospheres, eerie soundtracks, and
              terrifying creatures or situations.
            </li>
            <br></br>
            <li>
              <strong>
                <u>Examples include:</u>
              </strong>{" "}
              "Resident Evil," "Silent Hill," "Amnesia: The Dark Descent."
            </li>
          </ul>
          <br></br>
          <p>
            <strong>Note:</strong> Genres can be mixed, such as survival-horror,
            where horror elements are blended with gameplay focused on survival
            challenges.
          </p>
          <br></br>
        </div>
      ),
    },
    {
      name: "Multiplayer",
      image: "/static/images/multiDrop.jpg",
      description: (
        <div className="text-justify ml-5">
          <p>
            <strong>Description:</strong>
          </p>
          <ul>
            <li>
              Multiplayer games allow multiple players to interact and compete
              with each other in the same game environment.
            </li>
            <li>
              They often include various modes such as cooperative, competitive,
              or team-based gameplay.
            </li>
            <br></br>
            <li>
              <strong>
                <u>Examples include:</u>
              </strong>
              "Fortnite," "Call of Duty: Warzone," and "League of Legends."
            </li>
          </ul>
          <br></br>
          <p>
            <strong>Note:</strong> Multiplayer games can span various genres,
            including action, adventure, and sports.
          </p>
          <br></br>
        </div>
      ),
    },
  ];

  // State to manage selected genre index and popup visibility
  const [selectedGenreIndex, setSelectedGenreIndex] = useState(-1);
  const [showPopup, setShowPopup] = useState(false);

  // Function to handle selecting the next genre
  const handleNextGenre = () => {
    setSelectedGenreIndex((prevIndex) =>
      prevIndex === genres.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Function to handle selecting the previous genre
  const handlePrevGenre = () => {
    setSelectedGenreIndex((prevIndex) =>
      prevIndex === 0 ? genres.length - 1 : prevIndex - 1
    );
  };

  // Function to handle clicking on a genre
  const handleGenreClick = (index: SetStateAction<number>) => {
    setSelectedGenreIndex(index);
    setShowPopup(true);
  };

  // Function to handle closing the popup
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div>
      <div className="relative">
        <div className="flex items-center border-t border-b border-gray-300">
          {/* Button to select previous genre */}
          <div className="p-2 cursor-pointer" onClick={handlePrevGenre}>
            &#x25B2;
          </div>
          {/* Display selected genre name */}
          <div
            className="p-2 cursor-pointer hover:bg-gray-100 flex-grow"
            onClick={() => handleGenreClick(selectedGenreIndex)}
          >
            <h2 className="text-center font-semibold">
              {selectedGenreIndex !== -1 && genres[selectedGenreIndex].name}
            </h2>
          </div>
          {/* Button to select next genre */}
          <div className="p-2 cursor-pointer" onClick={handleNextGenre}>
            &#x25BC;
          </div>
        </div>
        {/* Popup displaying genre details */}
        {showPopup && (
          <div className="absolute inset-x-0 top-full bg-white shadow border border-t-0 border-gray-300 rounded-b-md p-4 flex">
            {/* Left side: Image */}
            <div className="flex-1">
              <img
                src={genres[selectedGenreIndex].image}
                alt={genres[selectedGenreIndex].name}
                className="mx-auto mb-4"
              />
            </div>
            {/* Right side: Description */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-4">
                {/* Genre name and close button */}
                <h2 className="text-lg font-semibold"></h2>
                <button
                  className="text-gray-500 hover:text-gray-600 focus:outline-none"
                  onClick={handleClosePopup}
                >
                  Close
                </button>
              </div>
              {/* Genre description */}
              <p>{genres[selectedGenreIndex].description}</p>
              <div className="mt-4">
                <Link className="text-blue-500 hover:underline" href={""}>
                  Visit Page
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReusableGenreDropdowns;
