import { GET_TEAM_SUCCESS, ADD_TEAM_SUCCESS,RESET_TEAM_ADD,ADD_TEAM_FAIL } from '../constants';

//LATEST_API_SUCCESS,
const initialState = {
  myTeams:[],
  team_add_status:undefined,
  team_add_err_msg:''
};

const handlers = {
  [GET_TEAM_SUCCESS] : (state,action) => {
    debugger;
    return {myTeams : action.result.results};
  },
  [ADD_TEAM_SUCCESS] : (state,action) => {
    debugger;
      if(action.result.insertedCount > 0) {
        debugger;
        return {myTeams : state.myTeams.concat(action.result.ops),team_add_status : ADD_TEAM_SUCCESS, team_add_err_msg:''};
      }
      else if(action.result.LimitedHits > 0) {
        return {team_add_status :ADD_TEAM_FAIL, team_add_err_msg : 'Team already exists'};
      }
  },
  [RESET_TEAM_ADD] : (state,action) => {
    debugger;
     return {team_add_status : undefined, team_add_err_msg:''};
  }
};

export default function teamReducer(state = initialState, action) {
  let handler = handlers[action.type];
  if (!handler) return state;
  return { ...state, ...handler(state, action) };
}

