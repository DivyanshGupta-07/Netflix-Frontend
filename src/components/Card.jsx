import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import video from "../assets/video1.webm";
import {IoPlayCircleSharp} from 'react-icons/io5'
import {BsCheck} from 'react-icons/bs'
import {RiThumbUpFill,RiThumbDownFill} from 'react-icons/ri'
import {AiOutlinePlus} from 'react-icons/ai'
import {BiChevronDown} from 'react-icons/bi'
import { onAuthStateChanged} from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { removeFromLikedMovies } from '../store';


const Card = ({moviedata,isLiked = false}) => {
    const [email,setEmail] = useState(undefined);
    const [isHovered,setIsHovered] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate();

    useEffect(()=>{
        onAuthStateChanged(firebaseAuth,(currentUser)=>{
            if(currentUser)setEmail(currentUser.email);
            else navigate('/login');
        })
    },[]);

    const addToList = async ()=>{
        try {
            await axios.post("http://localhost:5000/api/user/add",{email,data:moviedata})
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <Container onMouseEnter={()=>setIsHovered(true)} onMouseLeave={()=>setIsHovered(false)}>
        <img src={`https://image.tmdb.org/t/p/w500${moviedata.image}`} alt="movie" />
        {
            isHovered && (
                <div className="hover">
                    <div className="image-video-container">
                        <img onClick={()=>navigate('/player')} src={`https://image.tmdb.org/t/p/w500${moviedata.image}`} alt="movie" />
                        <video src={video} autoPlay loop muted onClick={()=>navigate('/player')}/>
                    </div>
                    <div className="info-container flex column">
                        <h3 className="name" onClick={()=>navigate('/player')}>{moviedata.name}</h3>
                        <div className="icons flex j-between">
                            <div className="controls flex">
                                <IoPlayCircleSharp title='play' onClick={()=>navigate('/player')}/>
                                <RiThumbUpFill title='like'/>
                                <RiThumbDownFill title='dislike'/>
                                {
                                    isLiked ? (
                                        <BsCheck title='remove from list' onClick={()=>dispatch(removeFromLikedMovies({movieId:moviedata.id,email}))}/>
                                    ):(
                                        <AiOutlinePlus title='add to my list' onClick={addToList}/>
                                    )
                                }
                            </div>
                            <div className="info">
                                <BiChevronDown title='more info'/>
                            </div>
                        </div>
                        <div className="genres flex">
                            <ul className="flex">
                                {
                                    moviedata.genres.map((genre)=>(
                                        <li key={genre}>{genre}</li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            )
        }
    </Container>
  )
}

const Container = styled.div`
    max-width: 230px;
    width: 230px;
    height: 100%;
    cursor: pointer;
    position: relative;
    img{
        border-radius: 0.5rem;
        width: 100%;
        height: 100%;
        z-index: 10;
    }
    .hover{
        z-index: 90;
        height: max-content;
        position: absolute;
        width: 20rem;
        top: -18vh;
        left: 0;
        border-radius: 0.5rem;
        box-shadow: rgba(0,0,0,0.75) 0px 3px 10px;
        background-color: #181818;
        transition: 0.3s ease-in-out;
        .image-video-container{
            position: relative;
            height: 140px;
            img{
                width: 100%;
                height: 140px;
                object-fit: cover;
                border-radius: 0.3rem;
                top: 0;
                z-index: 4;
                position: absolute;
            }
            video{
                width: 100%;
                height: 140px;
                object-fit: cover;
                border-radius: 0.3rem;
                top: 0;
                z-index: 5;
                position: absolute;
            }
        }
        .info-container{
            padding: 1rem;
            gap: 0.5rem;
            .icons{
                .controls{
                    display: flex;
                    gap: 1rem;
                    svg{
                        font-size: 2rem;
                        cursor: pointer;
                        transition: 0.3s ease-in-out;
                        &:hover{
                            color: #b8b8b8;
                        }
                    }
                }
            }
            .genres{
                ul{
                    gap: 1rem;
                    li{
                        padding-right: 0.7rem;
                        &:first-of-type{
                            list-style-type: none;
                        }
                    }
                }
            }
        }
    }
`;

export default Card