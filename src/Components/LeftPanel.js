import React , { useState, useCallback } from 'react';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import Modal from './Modal';
import { useSelector } from 'react-redux';
import {add} from "../Redux/Reducers/WatchList";
import { useNavigate } from "react-router-dom";

const LeftPanel = ({showAllWatchListMovies, showSavedWatchList})=> {

    const [selected, setSelected] = useState('home');
    const [openModal, setOpenModal] = useState(false);
    const dispatched = useDispatch();
    const mailId = localStorage.getItem('email');
    const myLists = useSelector((state) => state?.myLists);

    const navigate = useNavigate();

    //when user clicks on home option
    const onSelect = (text) => {
        setSelected(text);
        showAllWatchListMovies();
    }

    //when user clicks on plus icon of my lists option
    const addList = ()=>{
        setOpenModal(true);
    }

    //when user close the modal
    const closeModal = useCallback(() => {
        setOpenModal(false);
    }, [])

    //when user creates a new watchlist
    const ceateList = useCallback((value) => {
        let data = {
            name: value,
            list: []
        }
        //created watchlist dispatched to store
        dispatched(add(data))
        setOpenModal(false);
    }, [])

    //when user clicks on created watchlist
    const showAllWatchList = (list) => {
        setSelected(list?.name);
        showSavedWatchList(list);
    }

    //when user clicks on logout then remove mail of user from local storage
    const logout = () => {
        localStorage.removeItem('email');
        navigate("/");
    }

  return (
    <div className='left-panel'>
        <h3 className='mt-2'>
            WatchLists
        </h3>
        <div className='search'>
            <div className="input-group rounded ml-1">
                <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
            </div>
        </div>
        <div className="listing mt-3">
            <ul className="list-group list-group-flush">
                <li key="li-home" className={`list-group-item ${_.isEqual(selected, 'home') ? 'selected' : ''}`} onClick={()=>onSelect('home')}><i className='fa fa-home '></i> Home</li>
                <hr />
                <div key='my-list' className="list-group-item d-flex justify-content-between"><div>My List</div> <i className='fa fs-5 fa-plus-square-o' onClick={addList}></i> </div>
            </ul>
        </div>
        {_.find(myLists, item => item.mail === mailId)?.data?.map((list, index)=> {
            return(
                <ul className="list-group select-watchList">
                    <li key={index} className={`list-group-item ${_.isEqual(selected, list?.name) ? 'selected' : ''}`} onClick={()=>showAllWatchList(list)}>{list?.name}</li>
                </ul>
            )
        })
        }
        <div className="row logout-btn mt-3">
            <button type="button" className="btn btn-danger" onClick={()=> logout()}>Logout</button>
        </div>
        {openModal && 
            <Modal closeModal={closeModal} ceateList={ceateList}/>
        }
    </div>
  )
}
//memoized the component to stop unneccessary rerendering of component
const MemoizedLeftPanel = React.memo(LeftPanel);

export default MemoizedLeftPanel;
