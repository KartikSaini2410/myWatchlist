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
  const [deviceType, setDeviceType] = useState(getDeviceType);
  const [openRightPanel, setOpenRightPanel] = useState(true);
  const listUpdated = useSelector((state)=> state?.myLists);
  const navigate = useNavigate();

  useEffect(()=>{
    //when ever movie is removed from watchlist then update the state
    let mailId = localStorage.getItem('email');
    let findUser = _.find(listUpdated, (item) => item?.mail === mailId)
    let toShowList = _.find(findUser?.data, (item) => item?.name === saveWatchList?.name);
    setSaveWatchList(toShowList);
  }, [listUpdated])

  function getDeviceType() {
    if (typeof window !== "undefined" && window.innerWidth) {
      const viewportWidth = window.innerWidth;
      if (viewportWidth < 992) {
        // Adjust the breakpoint as needed
        return "mobile";
      }
    }
    return "desktop";
  }

  useEffect(()=>{
    //if user try to redirect to home page directly then it redirects to login page
    let mailId = localStorage.getItem('email');
    if(!mailId){
      navigate('/');
    }
    const handleResize = () => {
      const type = getDeviceType();
      setDeviceType(type);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  },[])

  //when user clicks on any saved watchlist
  const showSavedWatchList = useCallback((item)=> {
    setOpenRightPanel(true);
    setShowWatchListPanel(true);
    setSaveWatchList(item);
  }, [])

  //when user clicks on home option in left panel
  const showAllWatchListMovies = useCallback(()=>{
    setOpenRightPanel(true);
    setShowWatchListPanel(false);
    setSaveWatchList({});
  }, [])
  
  //function to open left panel in mobile
  const goBack = useCallback(()=>{
    setOpenRightPanel(false);
  },[])

  return (
    <div className='row text-white' style={{ display: 'flex', height: '100vh' }}>
        <div className={`left-side${openRightPanel && _.isEqual(deviceType, "mobile") ? ' d-none' : ''}`} style={{ width: !openRightPanel && _.isEqual(deviceType, "mobile") ? '100%' : '25%', backgroundColor: '#fff', color: '#000' }}>
            <LeftPanel showAllWatchListMovies={showAllWatchListMovies} showSavedWatchList={showSavedWatchList}/>
        </div>
        <div className={`right-side ${!openRightPanel && _.isEqual(deviceType, "mobile") ? 'd-none' : ''}`} style={{ width: openRightPanel && _.isEqual(deviceType, "mobile") ? '100%' : '75%', backgroundColor: '#fff' }}>
            {!showWatchListPanel && <RightPanel deviceType={deviceType} goBack={goBack}/>}
            {showWatchListPanel && <WatchListPanel watchList={saveWatchList} deviceType={deviceType} goBack={goBack}/>}
        </div>
    </div>
  
  )
}
