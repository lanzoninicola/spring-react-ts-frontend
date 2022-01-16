import "./styles.css";

import axios, { AxiosRequestConfig } from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Movie } from "types/movie";
import { BASE_URL } from "utils/requests";
import { validateEmail } from "utils/validate";

type Props = {
  movieId: string;
};

export default function Form({ movieId }: Props) {
  const navigate = useNavigate();

  const [movie, setMovie] = useState<Movie>();

  useEffect(() => {
    axios.get(`${BASE_URL}/movies/${movieId}`).then((res) => {
      setMovie(res.data);
    });
  }, [movieId]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const email = (event.target as any).email.value;
    const score = (event.target as any).score.value;

    if (!validateEmail(email)) {
      return;
    }

    const config: AxiosRequestConfig = {
      baseURL: BASE_URL,
      method: "PUT",
      url: "/scores",
      data: {
        email: email,
        movieId: movieId,
        score: score,
      },
    };

    axios(config).then((res) => {
      navigate("/");
    });
  };

  return (
    <div
      className="dsmovie-form-wrapper"
      style={{
        backgroundImage: `url(${movie?.image})`,
        backgroundPosition: "center, left",
        backgroundSize: "cover",
      }}
    >
      <div className="row h-100 m-0">
        <div className="col-lg-6 p-0">
          <div className="dsmovie-form-container">
            {/* <img
              className="dsmovie-movie-card-image"
              src={movie?.image}
              alt={movie?.title}
            /> */}
            <div className="dsmovie-card-bottom-container">
              <h3 className="dsmovie-form-title">Deixe sua avaliação</h3>
              <form className="dsmovie-form" onSubmit={handleSubmit}>
                <div className="form-group dsmovie-form-group">
                  <label htmlFor="email">Informe seu email</label>
                  <input type="email" className="form-control" id="email" />
                </div>
                <div className="form-group dsmovie-form-group">
                  <label htmlFor="score">Informe sua avaliação</label>
                  <select className="form-control" id="score">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </div>
                <div className="dsmovie-form-btn-container">
                  <button type="submit" className="btn btn-primary dsmovie-btn">
                    Salvar
                  </button>
                </div>
              </form>
              <Link to="/">
                <button className="btn btn-primary dsmovie-btn mt-3">
                  Cancelar
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="col-lg-6 p-0 dsmovie-title-container">
          <h1 className="dsmovie-movie-title">{movie?.title}</h1>
        </div>
      </div>
    </div>
  );
}
