import React, { useState, useEffect, useCallback } from 'react';
import _ from "lodash";
import MovieCard from './MovieCard';
import { useSelector, useDispatch } from 'react-redux';
import {add} from "../Redux/Reducers/WatchList";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = "http://www.omdbapi.com?apikey=b6777573"

export default function RightPanel() {

    const [movies, setMovies] = useState([]);
    const [searchedMovieName, setSearchedMovieName] = useState("");
    const [selectedMovie, setSelectedMovie] = useState({});
    const [openListSelectionBox, setOpenListSelectionBox] = useState(false);

    const myWatchList = useSelector((state)=> state?.myLists);
    const dispatch = useDispatch();
    const mailId = localStorage.getItem('email');

    const searchMovies = useCallback(async (title) => {
        let searchFor = title ? title : "2024";
        const response = await fetch(`${API_URL}&s=${searchFor}`);
        const data = await response.json();
        if(!_.isEmpty(data?.Search)){
            setMovies(data?.Search);
        }
        if(data.Error){
            toast(`Error: ${data.Error}`)
        }
    }, [])

    useEffect(()=>{
        searchMovies("2024");
    }, [])

    const handleChange = (e) => {
        e.preventDefault();
        setSearchedMovieName(e.target.value);
    }

    const addToWatchList = useCallback((movie) => {
        setSelectedMovie(movie);
        setOpenListSelectionBox(true);
    }, [])

    const selectedListItem = (listItem) =>{
        setOpenListSelectionBox(false);
        dispatch(add([selectedMovie, listItem]));
        toast(`${selectedMovie?.Title} is added in your ${listItem?.name} list`);
    }

  return (
    <div className='right-panel text-black'>
        <div className="row">
            <div className="col-sm-12">
                <div className="card welcome-card mt-4">
                    <div className="card-body">
                        <h5 className="card-title heading">Welcome to <span className='make-red'>Watchlists</span></h5>
                        <p className="card-text">Browse movies, add them to watchlists and share them with friends.</p>
                        <p>Just click the <i className='fa fa-bookmark'></i> icon to add a movie, the poster to see more details, or the checkmark to mark the movie as watched.</p>
                    </div>
                </div>
                <div className="input-group search mt-4">
                    <input type="search" onChange={handleChange} className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                    <button type="button" className="text-white btn btn-outline-danger bg-danger" data-mdb-ripple-init onClick={()=>searchMovies(searchedMovieName)}>search</button>
                </div>
                <div className='container'>
                        <div className='row mb-3'>
                        {
                            _.map(movies, (movie, index)=> {
                                return(
                                    <div key={`index-${index}`} className='col-12 col-md-6 col-lg-3'>
                                        <MovieCard movie={movie} addToWatchList={addToWatchList}/>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                {openListSelectionBox && 
                    <div className="modal text-white" tabIndex="-1" role="dialog">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Select Watchlist to add</h5>
                                </div>
                                <div className="modal-body listing-options">
                                    <ul className="list-group select-watchList">
                                        {_.find(myWatchList, list => list.mail === mailId)?.data?.map((item, index)=> {
                                            return(
                                                <li key={index} className="list-group-item" onClick={()=>selectedListItem(item)}>{item?.name}</li>
                                            )
                                        })}
                                        {_.isEmpty(myWatchList) &&
                                            <h4>Please create watchlist first.</h4>
                                        }
                                    </ul>
                                </div>
                                <div className="modal-footer">
                                    {/* <button type="button" className="btn btn-danger" onClick={()=>ceateList(value)}>Create</button> */}
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={()=>setOpenListSelectionBox(false)}>Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
        <ToastContainer />
    </div>
  )
}
