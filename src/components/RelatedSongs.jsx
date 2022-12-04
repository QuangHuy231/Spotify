import { Link } from "react-router-dom";
import SongBar from "./SongBar";

const RelatedSongs = ({
  songRelated,
  artistId,
  isPlaying,
  activeSong,
  handlePause,
  handlePlay,
}) => (
  <div className="flex flex-col">
    <h1 className="font-bold text-3xl text-white">Related Songs:</h1>
    <div className="mt-6 w-full flex flex-col">
      {songRelated?.map((song, i) => (
        <SongBar
          key={`${song.key}`}
          song={song}
          i={i}
          artistId={artistId}
          isPlaying={isPlaying}
          activeSong={activeSong}
          handlePauseClick={handlePause}
          handlePlayClick={() => handlePlay(song, i)}
        />
      ))}
    </div>
  </div>
);

export default RelatedSongs;
