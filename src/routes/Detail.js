import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detail() {
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState([]);
  const { id } = useParams();
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setDetail(json.data.movie);
    setLoading(false);
  };
  useEffect(() => {
    getMovie();
  }, []);
  console.log(detail);
  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <h1>Detail</h1>
          <div style={{ display: "flex" }}>
            <img src={detail.medium_cover_image} alt={detail.title} />
            <div style={{ marginLeft: "1rem" }}>
              <h2>
                {detail.title} ({detail.year})
              </h2>
              <p>{detail.description_full}</p>
              <h3>Genres</h3>
              <ul>
                {detail.genres.map((genre, index) => (
                  <li key={index}>{genre}</li>
                ))}
              </ul>
              <h3>Rating: {detail.rating}</h3>
              <h3>Runtime: {detail.runtime} mins</h3>
            </div>
          </div>
          <h3>Downloads (Torrent)</h3>
          <ul>
            {detail.torrents.map((torrent, index) => (
              <li key={index}>
                <a href={torrent.url}>{torrent.hash}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Detail;
