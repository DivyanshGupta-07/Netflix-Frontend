import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import SelectGenre from '../components/SelectGenre'
import Slider from '../components/Slider'
import Notaval from '../components/Notaval'
import { fetchMovies, getGenres } from '../store'
import Loader from '../components/Loader'

const TvShows = () => {
    const dispatch = useDispatch()
    const [isScrolled,setIsScrolled] = useState(false)
    const genresLoaded = useSelector((state)=>state.netflix.genresLoaded)
    const movies = useSelector((state)=>state.netflix.movies)
    const genres = useSelector((state)=>state.netflix.genres)
    const isloading = useSelector((state)=>state.netflix.isloading);
    window.onscroll = () => {
        setIsScrolled(window.scrollY === 0 ? false : true)
        return ()=>(window.onscroll = null)
    }
    useEffect(()=>{
        dispatch(getGenres());
    },[])
    useEffect(()=>{
        if(genresLoaded) dispatch(fetchMovies({type : "tv"}));
    },[genresLoaded])
  return (
    <Container>
        <div className="navbar">
            <Navbar isScrolled={isScrolled}/>
        </div>
        {
            isloading === true ? <Loader /> : (
            <div className="data">
            <SelectGenre genres={genres} type="tv"/>
            {
                movies.length >0 ? <Slider movies={movies}/> : <Notaval />
            }
            </div>
            )
        }
        
    </Container>
  )
}
const Container = styled.div`
    .data{
        margin-top: 8rem;
        .not-aval{
            text-align: center;
            color: white;
            margin-top: 2rem;
            margin-left: 2rem;
        }
    }
`
export default TvShows