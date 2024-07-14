import React from 'react';
import _ from "lodash";


const MovieCard = ({ movie, addToWatchList, removeFromWatchList }) => {

  return (
    <div className="card movie-card mt-3" style={{width: "12rem", height: "300px"}}>
        <img src={movie?.Poster} className="card-img-top" alt="..." style={{objectFit:"fill"}} />
        <i className='fa fa-bookmark' title={removeFromWatchList ? 'Remove' : 'Add'} onClick={()=> removeFromWatchList ? removeFromWatchList(movie) : addToWatchList(movie)} />
        <div className="card-body">
            <h5 className="card-title">{_.truncate(movie?.Title, { 'length': 25 })}</h5>
            <div>{`(${movie?.Year})`}</div>
        </div>
    </div>
  )
}

// Memoize the MovieCard component
const MemoizedMovieCard = React.memo(MovieCard);

export default MemoizedMovieCard;
