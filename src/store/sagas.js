import { all, fork } from "redux-saga/effects"
import AuthSaga from "./auth/login/saga"
import ProfileSaga from "./auth/profile/saga"
//public
import AccountSaga from "./auth/register/saga"
import LayoutSaga from "./layout/saga"


export default function* rootSaga() {
  yield all([
    //public
    AccountSaga(),
    fork(AuthSaga),
    ProfileSaga(),
    fork(LayoutSaga),
  ])
}
