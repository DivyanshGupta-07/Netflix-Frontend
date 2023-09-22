import React, { useState } from "react";
import styled from "styled-components";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formvalues, setformvalues] = useState({ 
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    try {
      const { email, password } = formvalues;
      await signInWithEmailAndPassword(firebaseAuth, email, password);
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
        <Header />
        <div className="form-container flex column a-center j-center">
          <div className="form flex column a-center j-center">
            <div className="tittle">
              <h3>Login</h3>
            </div>
            <div className="flex column container">
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

              <button onClick={handleLogin}>Login</button>
            </div>
          </div>
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
  }
  .form-container {
    height: 85vh;
    gap: 2rem;
    .form {
      width: 25vw;
      padding: 2rem;
      gap: 2rem;
      background-color: #000000b0;
      color: white;
      .tittle {
        width: 100%;
        text-align: center;
      }
      .container {
        gap: 2rem;
        input {
          padding: 0.5rem 1rem;
          width: 15rem;
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
  }
`;

export default Login;
