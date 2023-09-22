import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import styled from 'styled-components'
import Loader from '../components/Loader'
import { useSelector } from 'react-redux'

const UserLiked = () => {
    const isloading = useSelector((state)=>state.netflix.isloading);
  return (
    <Container>
        <Navbar isScrolled={false}/>
        {
            isloading === true ? <Loader /> : (
                <h1>This Feature is not avalable yet .</h1>
            )
        }
    </Container>
  )
}

const Container = styled.div`
    h1{
        margin-top: 8rem;
        margin-left: 4rem;
    }
`

export default UserLiked