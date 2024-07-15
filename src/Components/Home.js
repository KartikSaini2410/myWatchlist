import React, { useCallback, useState, useEffect } from 'react';
import _ from 'lodash';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import WatchListPanel from './WatchListPanel';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

export default function Home() {

  const [showWatchListPanel ,setShowWatchListPanel] = useState(false);
  const [saveWatchList ,setSaveWatchList] = useState({});
  const listUpdated = useSelector((state)=> state?.myLists);
  const navigate = useNavigate();

  useEffect(()=>{
    //when ever movie is removed from watchlist then update the state
    let mailId = localStorage.getItem('email');
    let findUser = _.find(listUpdated, (item) => item?.mail === mailId)
    let toShowList = _.find(findUser?.data, (item) => item?.name === saveWatchList?.name);
    setSaveWatchList(toShowList);
  }, [listUpdated])

  useEffect(()=>{
    //if user try to redirect to home page directly then it redirects to login page
    let mailId = localStorage.getItem('email');
    if(!mailId){
      navigate('/');
    }
  })

  //when user clicks on any saved watchlist
  const showSavedWatchList = useCallback((item)=> {
    setShowWatchListPanel(true);
    setSaveWatchList(item);
  }, [])

  //when user clicks on home option in left panel
  const showAllWatchListMovies = useCallback(()=>{
    setShowWatchListPanel(false);
    setSaveWatchList({});
  }, [])

  return (
    <div className='row text-white' style={{ display: 'flex', height: '100vh' }}>
        <div className='left-side' style={{ width: '25%', backgroundColor: '#fff', color: '#000' }}>
            <LeftPanel showAllWatchListMovies={showAllWatchListMovies} showSavedWatchList={showSavedWatchList}/>
        </div>
        <div className='right-side' style={{ width: '75%', backgroundColor: '#fff' }}>
            {!showWatchListPanel && <RightPanel/>}
            {showWatchListPanel && <WatchListPanel watchList={saveWatchList}/>}
        </div>
    </div>
  
  )
}
