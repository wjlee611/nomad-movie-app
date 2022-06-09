import { useEffect, useState } from "react";
import Movie from "../components/Movie";

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [rating, setRating] = useState(9.0);
  const onChange = (value) => {
    setRating(value.nativeEvent.target.value);
  };
  const onMouseUp = () => {
    setLoading(true);
    getMovies(rating);
  };
  const getMovies = async (rating) => {
    const response = await fetch(
      `https://yts.mx/api/v2/list_movies.json?minimum_rating=${rating}&sort_by=year`
    );
    const json = await response.json();
    setMovies(json.data.movies);
    setLoading(false);
  };
  useEffect(() => {
    getMovies(rating);
  }, []);
  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <h2>set min rating ({rating})</h2>
          <input
            style={{ width: "12rem" }}
            type="range"
            min={0}
            max={10}
            step={0.5}
            defaultValue={rating}
            onChange={onChange}
            onMouseUp={onMouseUp}
          />
          <hr />
          {movies.map((movie) => (
            <Movie
              key={movie.id}
              id={movie.id}
              coverImg={movie.medium_cover_image}
              title={movie.title}
              summary={movie.summary}
              genres={movie.genres}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
