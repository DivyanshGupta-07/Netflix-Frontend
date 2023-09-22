import React, { useState } from "react";
import styled from "styled-components";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [showpass, setshowpass] = useState(false);

  const [formvalues, setformvalues] = useState({
    email: "",
    password: "",
  });

  const handleSignIn = async () => {
    try {
      const { email, password } = formvalues;
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      console.log(error.message);
      alert(error.message)
    }
  };
  const navigate = useNavigate();
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate("/");
  });

  return (
    <Container>
      <BackgroundImage />
      <div className="content">
        <Header login />
        <div className="body flex column a-center j-center">
          <div className="text flex column">
            <h1>Unlimited Movies,TV shows and more</h1>
            <h4>Watch anywhere, Cancel anytime</h4>
            <h6>ready to watch? Enter your Email to create and restart</h6>
          </div>
          <div className="form">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formvalues.email}
              onChange={(e) =>
                setformvalues({
                  ...formvalues,
                  [e.target.name]: e.target.value,
                })
              }
            />
            {showpass && (
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formvalues.password}
                onChange={(e) =>
                  setformvalues({
                    ...formvalues,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            )}
            {!showpass && (
              <button onClick={() => setshowpass(true)}>Get Started</button>
            )}
          </div>
          <button onClick={handleSignIn}>Sign Up</button>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  .content {
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.5);
    display: grid;
    grid-template-rows: 15vh 85vh;

    .body {
      gap: 1rem;
      .text {
        gap: 1rem;
        text-align: center;
        font-size: 2rem;
        h1 {
          padding: 0 25rem;
        }
      }
      .form {
        display: grid;
        grid-template-columns: ${({ showpass }) =>
          showpass ? "1fr 1fr" : "2fr 1fr"};
        width: 60%;
        input {
          color: black;
          font-size: 1.5rem;
          border: 1px solid black;
          padding: 1.5rem;
          &:focus {
            outline: none;
          }
        }
        button {
          padding: 0.5rem 1rem;
          background-color: #e50914;
          border: none;
          outline: none;
          color: white;
          cursor: pointer;
          font-weight: bolder;
          font-size: 1.05rem;
        }
      }
      button {
        padding: 0.5rem 1rem;
        background-color: #e50914;
        border: none;
        outline: none;
        color: white;
        cursor: pointer;
        border-radius: 0.2rem;
        font-weight: bolder;
        font-size: 1.05rem;
      }
    }
  }
`;

export default Signup;
