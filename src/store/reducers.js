import { combineReducers } from "redux"
// Authentication
import Login from "./auth/login/reducer"
import Profile from "./auth/profile/reducer"
import Account from "./auth/register/reducer"
// Front
import Layout from "./layout/reducer"







const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  Account,
  Profile,
})

export default rootReducer
