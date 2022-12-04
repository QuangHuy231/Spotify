import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
} from "../redux/services/shazamCore";
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import { DetailsHeader, Loader, RelatedSongs } from "../components";

const SongDetails = () => {
  const dispath = useDispatch();
  const { songid } = useParams();

  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data: songData, isFetching: isFetchingSongData } =
    useGetSongDetailsQuery({ songid });
  const {
    data,
    isFetching: isFetchingSongRelated,
    error,
  } = useGetSongRelatedQuery({ songid });

  if (isFetchingSongData || isFetchingSongRelated)
    return <Loader title="Searching song details" />;
  if (error) return <Error />;
  const handlePauseClick = () => {
    dispath(playPause(false));
  };
  const handlePlayClick = (song, i) => {
    dispath(setActiveSong({ song, i, data }));
    dispath(playPause(true));
  };
  return (
    <div className="flex flex-col">
      <DetailsHeader artistId="" songData={songData} />
      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Lyrics:</h2>

        <div className="mt-5">
          {songData?.sections[1].type === "LYRICS" ? (
            songData?.sections[1]?.text.map((line, i) => (
              <p
                key={`lyrics-${line}-${i}`}
                className="text-gray-400 text-base my-1"
              >
                {line}
              </p>
            ))
          ) : (
            <p className="text-gray-400 text-base my-1">
              Sorry, No lyrics found!
            </p>
          )}
        </div>
      </div>
      <RelatedSongs
        data={data}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePause={handlePauseClick}
        handlePlay={handlePlayClick}
      />
    </div>
  );
};
export default SongDetails;
