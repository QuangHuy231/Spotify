import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetArtistDetailsQuery } from "../redux/services/shazamCore";

import { DetailsHeader, Loader, RelatedSongs } from "../components";

const ArtistDetails = () => {
  const dispath = useDispatch();
  const { id: artistId } = useParams();

  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const {
    data: artistData,
    isFetching: isFetchingArtist,
    error,
  } = useGetArtistDetailsQuery(artistId);

  if (isFetchingArtist) return <Loader title="Searching artist details" />;
  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <DetailsHeader artistId={artistId} artistData={artistData} />

      <RelatedSongs
        data={Object.values(artistData?.songs)}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
      />
    </div>
  );
};
export default ArtistDetails;
