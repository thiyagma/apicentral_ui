import { CLIENT_APP_SUCESS, CLIENT_APP_REGISTER_SUCCESS, CLIENT_APP_REGISTER_FAIL, CLEAR_CLIENT_APP, GET_CONSUMERS_SUCCESS,UPDATE_CONSUMERS_SUCCESS,
         CLIENT_APP_UPDATE_SUCCESS,RESET_CLIENT_APP_UPDATE } from '../constants';

//LATEST_API_SUCCESS,
const initialState = {
  client_app_registration_status : undefined,
  client_app_registration_msg:undefined,
  client_app_updated:undefined,
  consumers:[]
};

const handlers = {
  [CLIENT_APP_SUCESS] : (state,action) => {
    if(action.result.LimitedHits == 1 || action.result.TotalHits == 1) {
          return { client_app_registration_status : CLIENT_APP_REGISTER_FAIL, client_app_registration_msg: 'User Already Exists'};
    }
    else {
      return {client_app_registration_status : CLIENT_APP_REGISTER_SUCCESS};
    }
  },
  [CLEAR_CLIENT_APP] : (state,action) => {
    return {client_app_registration_status : undefined , client_app_registration_msg: undefined};
  },
  [GET_CONSUMERS_SUCCESS] : (state,action) => {
    debugger;
    return {consumers : action.result.results};
  },
  [UPDATE_CONSUMERS_SUCCESS] : (state,action) => {
    debugger;
    if(action.result.LimitedHits > 0) {
      const updatedConsumer = action.result.results[0];
      let consumerCopy = state.consumers.concat();
      for(let i=0; i < state.consumers.length; i++) {
        if(state.consumers[i].consumer_id == updatedConsumer.consumer_id) {
           consumerCopy[i] = updatedConsumer;
           return { consumers : consumerCopy,client_app_updated : CLIENT_APP_UPDATE_SUCCESS};
           break;
        }
      }
    }
  },
  [RESET_CLIENT_APP_UPDATE] : (state,action) => {
    debugger;
    return {client_app_updated : undefined}
    
  }
};

export default function clientAppReducer(state = initialState, action) {
  let handler = handlers[action.type];
  if (!handler) return state;
  return { ...state, ...handler(state, action) };
}

