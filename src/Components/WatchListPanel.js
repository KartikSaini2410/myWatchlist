import React from 'react';
import MovieCard from './MovieCard';
import _ from "lodash";
import { remove } from '../Redux/Reducers/WatchList';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function WatchListPanel({watchList}) {
    const dispatch = useDispatch();

    const removeFromWatchList = (item) => {
        toast(`${item?.Title} is removed from your ${watchList?.name} list`)
        dispatch(remove([item, watchList]));
    }
  return (
    <div className='text-black'>
        <h2 className='mt-2 ml-1'>{watchList?.name}</h2>
        <p className='mt-3 fw-bold'>About this watchlist</p>
        <p className='mt-3'>Enjoy your watchlist—a personalized collection of movies and TV shows waiting to be explored. Dive into your curated picks, discover new favorites, and savor every moment of entertainment at your fingertips. Happy watching!</p>
        <p className='mt-3'>Click on <i className='fa fa-bookmark'></i> to remove movie from the list.</p>
        <div className='container'>
            <div className='row mb-3'>
                {
                    _.map(watchList?.list, (movie, index)=> {
                        return(
                            <div key={`index-${index}`} className='col-12 col-md-6 col-lg-3'>
                                <MovieCard movie={movie} removeFromWatchList={removeFromWatchList}/>
                            </div>
                        )
                    })
                }
            </div>
            {_.isEmpty(watchList?.list) && 
                <div className="row empty-list">
                    <h3>This watchlist is empty.</h3>
                </div>
            }
        </div>
        <ToastContainer/>
    </div>
  )
}
