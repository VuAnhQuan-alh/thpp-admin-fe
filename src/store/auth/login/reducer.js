import {
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  API_ERROR,
} from "./actionTypes"

const initialState = {
  error: "",
  loading: false,
  data: {}
}

const login = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        loading: true,
        data: action.payload

      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload
      }
    case LOGOUT_USER:
      return {
        ...state,
        error: "",
        loading: false,
        data: {}
      }
    case API_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    default:
      return state
  }
}

export default login
