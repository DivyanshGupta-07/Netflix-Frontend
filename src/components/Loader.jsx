import React from 'react'
import styled from 'styled-components'

const Loader = () => {
  return (
    <Container>
        <div className="loader">
            
        </div>
    </Container>
  )
}

const Container = styled.div`
.loader{
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loader::after{
  content:"";
  width: 100px;
  height: 100px;
  border: 10px solid black;
  border-top-color: red;
  border-radius: 50%;
  animation: loading 1.1s linear infinite;
}

@keyframes loading{
  from{
    transform: rotate(0deg);
  }
  to{
    transform: rotate(360deg);
  }
}
`

export default Loader