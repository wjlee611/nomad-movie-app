import { useEffect, useState } from "react";
import Movie from "../components/Movie";
import styles from "./Home.module.css";

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
      <div className={styles.rate_slider}>
        <h2>Set min rating - {rating}</h2>
        <input
          style={{ width: "12rem" }}
          type="range"
          min={0}
          max={9}
          step={0.5}
          defaultValue={rating}
          onChange={onChange}
          onMouseUp={onMouseUp}
        />
      </div>
      <hr />
      <div className={styles.container}>
        {loading ? (
          <div className={styles.loader}>
            <span>Loading...</span>
          </div>
        ) : (
          <div className={styles.movies}>
            {movies.map((movie) => (
              <Movie
                key={movie.id}
                id={movie.id}
                year={movie.year}
                coverImg={movie.medium_cover_image}
                title={movie.title}
                summary={movie.summary}
                genres={movie.genres}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
