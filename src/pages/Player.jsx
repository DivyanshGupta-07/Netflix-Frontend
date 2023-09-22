import React from "react";
import styled from "styled-components";
import { BsArrowLeft } from "react-icons/bs";
import video from "../assets/video1.webm";
import { useNavigate } from "react-router-dom";

const Player = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <div className="player">
        <div className="back">
          <BsArrowLeft onClick={() => navigate(-1)} />
        </div>
        <video src={video} autoPlay loop controls muted></video>
      </div>
    </Container>
  );
};
const Container = styled.div`
  .player {
    height: 100vh;
    width: 100vw;
    .back {
      position: absolute;
      padding: 2rem;
      z-index: 3;
      svg {
        font-size: 1.8rem;
      }
    }
    video {
      width: 100vw;
      height: 100vh;
      object-fit: cover;
    }
  }
`;

export default Player;
