import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchMovies, getGenres } from "../store";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import Notaval from "../components/Notaval";
import SelectGenre from "../components/SelectGenre";
import Loader from "../components/Loader";

const Movies = () => {
  const dispatch = useDispatch();
  const [isScrolled, setIsScrolled] = useState(false);
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
  const movies = useSelector((state) => state.netflix.movies);
  const genres = useSelector((state) => state.netflix.genres);
  const isloading = useSelector((state)=>state.netflix.isloading)

  window.onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoaded) dispatch(fetchMovies({ type: "movie" }));
  }, [genresLoaded]);


  return <Container>
    <div className="navbar">
        <Navbar isScrolled={isScrolled}/>
    </div>
    {
      isloading === true ? <Loader /> : (
        <div className="data">
        <SelectGenre genres={genres} type="movie"/>  
            {
                movies.length>0 ? <Slider movies={movies}/> : <Notaval />
            }
        </div>
      )
    }
    
  </Container>;
};

const Container = styled.div`
    .data{
        margin-top: 8rem;
        .not-aval{
            text-align: center;
            color: white;
            margin-top: 6rem;
            margin-left: 2rem;
        }
    }
`;

export default Movies;
