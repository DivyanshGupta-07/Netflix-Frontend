import React from 'react'
import CardSlider from './CardSlider'

const Slider = ({movies}) => {
    //console.log(movies)
    const getMoviesFromRange=(from,to)=>{
        return movies.slice(from,to)
    }

  return (
    <div>
        <CardSlider title="Trending Now" data={getMoviesFromRange(0,10)}/>
        <CardSlider title="New Relesases" data={getMoviesFromRange(10,20)}/>
        <CardSlider title="Blockbuster Movies" data={getMoviesFromRange(20,30)}/>
        <CardSlider title="Popular Movies" data={getMoviesFromRange(30,40)}/>
        <CardSlider title="Editors Choice" data={getMoviesFromRange(40,50)}/>
        <CardSlider title="Epic Movies" data={getMoviesFromRange(50,60)}/>
    </div>
  )
}

export default Slider