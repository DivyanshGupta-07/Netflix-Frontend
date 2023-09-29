import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import styled from 'styled-components'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { onAuthStateChanged} from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import { getUserlikedMovies } from '../store'

const UserLiked = () => {
    const isloading = useSelector((state)=>state.netflix.isloading);
    const [isScrolled,setIsScrolled] = useState(false);
    const movies = useSelector((state)=>state.netflix.movies);
    const [email,setEmail] = useState(undefined);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(()=>{
        onAuthStateChanged(firebaseAuth,(currentUser)=>{
            if(currentUser)setEmail(currentUser.email);
            else navigate('/login');
        });
    },[])
    
    
    useEffect(()=>{
        if(email){
            dispatch(getUserlikedMovies(email));
        }
    },[email]);

    window.onscroll = ()=>{
        setIsScrolled(window.scrollY === 0 ? false:true);
    }
  return (
    <Container>
        <Navbar isScrolled={isScrolled}/>
        {
            isloading ? <Loader /> : (
                <div className="content flex column">
                    <h1>My List</h1>
                    <div className="grid flex">
                        {
                            movies.length>0 ? (movies.map((movie,index)=>{
                                return <Card moviedata={movie} index={index} key={movie.id} isLiked={true}/>
                            })) : (<h1>Add Your Favourite 💖 Movies...</h1>)
                            
                        }
                    </div>
                </div>
            )
        }
    </Container>
  )
}

const Container = styled.div`
    .content{
        margin: 2.3rem;
        margin-top: 8rem;
        gap: 3rem;
        h1{
            margin-left: 3rem;
        }
        .grid{
            flex-wrap: wrap;
            gap: 1rem;
        }
    }
`

export default UserLiked