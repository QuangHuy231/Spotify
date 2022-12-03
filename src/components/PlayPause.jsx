import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";

const PlayPause = (song, isPlaying, activeSong, handlePause, handlePlay) =>
  isPlaying && activeSong?.title === song.title ? (
    <FaPauseCircle site={35} className="text-gray-300" onClick={handlePause} />
  ) : (
    <FaPlayCircle site={35} className="text-gray-300" onClick={handlePlay} />
  );

export default PlayPause;
