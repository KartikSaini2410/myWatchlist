import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

const initialState = [];

export const watchListSlice = createSlice({
  name: 'addWatchList',
  initialState,
  reducers: {
    add: (state, action) => {
      if (action?.payload?.[0]?.Title) {
        let mailId = localStorage.getItem("email");
        let findUser = _.find(state, { mail: mailId });
        let targetListItem = _.find(findUser.data, { name: action?.payload?.[1]?.name });
        if (targetListItem) {
            targetListItem?.list?.push(action?.payload[0]);
        }
      } else {
        let mailId = localStorage.getItem("email");
        let userSelf = _.find(state, { mail: mailId });
        if(userSelf){
            userSelf.data.push(action?.payload)
        }
        else{
            let newUserData = {
                mail: mailId,
                data: [action?.payload]
            }
            state.push(newUserData)
        }
      }
    },
    remove: (state, action) => {
        let mailId = localStorage.getItem("email");
        let findUser = _.find(state, { mail: mailId });
        let targetListItem = _.find(findUser.data, { name: action?.payload?.[1]?.name });
        if (targetListItem) {
            _.remove(targetListItem.list, item => _.isEqual(item, action.payload[0]));
        }
    },
  },
});

// Action creators are generated for each case reducer function
export const { add, remove } = watchListSlice.actions;

export default watchListSlice.reducer;
