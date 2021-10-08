import { all, call, fork, put, takeEvery } from "redux-saga/effects"
import { apiGetProfile } from "../../../services/apiFunction/Authen"
import { profileError, profileSuccess } from "./actions"
// Login Redux States
import { EDIT_PROFILE, PROFILE_REQUEST } from "./actionTypes"



function* editProfile({ payload: { user } }) {
  try {
    // const response = apiGetProfile()
  } catch (error) {
    yield put(profileError(error))
  }
}


function* getProfile() {
  try {
    const response = yield call(apiGetProfile)
    yield put(profileSuccess(response.data.obj));
  } catch (error) {
    yield put(profileError(error))
  }
}

export function* watchProfile() {
  yield takeEvery(EDIT_PROFILE, editProfile)
  yield takeEvery(PROFILE_REQUEST, getProfile)
}

function* ProfileSaga() {
  yield all([fork(watchProfile)])

}

export default ProfileSaga
