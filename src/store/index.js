import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import axios from "axios";
import { API_KEY, TMDB_BASE_URL } from "../utils/constants";

const initialState = {
  movies: [],
  genres: [],
  genresLoaded: false,
  isloading:false,
};

export const getGenres = createAsyncThunk(
  "netflix/genres",
  async () => {
    const {data : {genres}} = await axios.get(`${TMDB_BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
    return genres;
  }
);

const createArrayFromRawData = (array, moviearray, genres) => {
  array.forEach((movie) => {
    const movieGenres = [];
    movie.genre_ids.forEach((genre) => {
      const name = genres.find(({id}) => id===genre);
      if(name)movieGenres.push(name.name);
    });
    if(movie.backdrop_path){
      moviearray.push({
        id:movie.id,
        name:movie.original_name ? movie.original_name : movie.original_title,
        image:movie.backdrop_path,
        genres:movieGenres.slice(0,3),
      });
    }
  });
};

const getRawData = async (api, genres, paging) => {
  const moviesArray = [];
  for (let i = 1;moviesArray.length<60 && i < 20; i++) {
  const {data : {results}} = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
    createArrayFromRawData(results, moviesArray, genres);
  }
  //console.log(moviesArray);
  return moviesArray;
};

export const fetchMovies = createAsyncThunk(
  "netflix/trending",
  async ({type}, thunkApi) => {
    const {
      netflix: { genres },
    } = thunkApi.getState();
    return await getRawData(
      `${TMDB_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`,
      genres,
      true
    );
  }
);

export const fetchDataByGenre = createAsyncThunk(
  "netflix/moviesByGenres",
  async ({genre,type}, thunkApi) => {
    const {
      netflix: { genres },
    } = thunkApi.getState();
    return await getRawData(
      `${TMDB_BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genre}`,
      genres,
    );
  }
);

export const getUserlikedMovies = createAsyncThunk(
  "netflix/getLiked",
  async (email)=>{
    const {data:{movies}} = await axios.get(`https://netflix-backend-xuep.vercel.app/api/user/liked/${email}`);
    return movies;
  }
);


export const removeFromLikedMovies = createAsyncThunk(
  "netflix/deleteLiked",
  async ({email,movieId})=>{
    const {data:{movies}} = await axios.put(`https://netflix-backend-xuep.vercel.app/api/user/delete`,{
      email,
      movieId,
    });
    return movies;
  }
);

const NetflixSlice = createSlice({
  name: "Netflix",
  initialState,
  extraReducers: (builder) =>{
    builder
    .addCase(getGenres.fulfilled,(state,action)=>{
      state.genres = action.payload;
      state.genresLoaded = true;
    })
    .addCase(fetchMovies.fulfilled,(state,action)=>{
      state.movies = action.payload;
      state.isloading = false;
    })
    .addCase(fetchMovies.pending,(state,action)=>{
      state.isloading = true;
    })
    .addCase(fetchDataByGenre.fulfilled,(state,action)=>{
      state.movies = action.payload;
      state.isloading = false;
    })
    .addCase(fetchDataByGenre.pending,(state,action)=>{
      state.isloading = true;
    })
    .addCase(getUserlikedMovies.fulfilled,(state,action)=>{
      state.movies = action.payload;
      state.isloading = false;
    })
    .addCase(getUserlikedMovies.pending,(state,action)=>{
      state.isloading = true;
    })
    .addCase(removeFromLikedMovies.fulfilled,(state,action)=>{
      state.movies = action.payload;
      state.isloading = false;
    })
    .addCase(removeFromLikedMovies.pending,(state,action)=>{
      state.isloading = true;
    })
  },
});

export const store = configureStore({
  reducer: {
    netflix: NetflixSlice.reducer,
  },
});
