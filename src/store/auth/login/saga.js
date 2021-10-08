import { call, put, takeEvery, takeLatest } from "redux-saga/effects"

// Login Redux States
import { LOGIN_SUCCESS, LOGIN_USER, LOGOUT_USER, SOCIAL_LOGIN } from "./actionTypes"
import { apiError, loginSuccess, logoutUserSuccess } from "./actions"
import { apiSignin } from "../../../services/apiFunction/Authen"
import httpServices from "../../../services/httpServices";
import { useDispatch } from "react-redux";
import { profileRequest } from "../profile/actions";

function* loginUser({ payload }) {

  try {
    const response = yield call(apiSignin, payload);
    if (response.status == 200) {
      yield put(loginSuccess(response.data))
      console.log("response", response.data.token);
      // httpServices.attachTokenToHeader(response.data.token)
      localStorage.setItem("authUser", response.data.token)

    } else {
      yield put(apiError(response.data))
    }

  } catch (error) {
    yield put(apiError(error))
  }
}

function* logoutUser() {
  try {
    localStorage.removeItem("authUser")
  } catch (error) {
    yield put(apiError(error))
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser)
  yield takeEvery(LOGOUT_USER, logoutUser)

}

export default authSaga
