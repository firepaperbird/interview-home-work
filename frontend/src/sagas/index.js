import {
  call,
  cancel,
  cancelled,
  fork,
  put,
  take,
} from "redux-saga/effects";
import { loginService } from "../service/loginService";

// function* fetchDataSaga() {
//     yield put(USER_INTERACTED_WITH_UI, data);
// }

export function* authorize(user, password) {
  try {
    const token = yield call(loginService, user, password);
    yield put({ type: "LOGIN_SUCCESS" });
    yield put({ type: "SAVE_TOKEN", token });
    yield put({ type: "SAVE_USERNAME", user });
  } catch (error) {
    yield put({ type: "LOGIN_ERROR", error });
  } finally {
    if (yield cancelled()) {
      yield put({ type: "LOGIN_CANCELLED" });
    }
  }
}
export function* loginFlow() {
  while (true) {
    const { user, password } = yield take("LOGIN_REQUEST");
    const task = yield fork(authorize, user, password);
    const action = yield take(["LOGOUT", "LOGIN_ERROR"]);
    if (action.type === "LOGOUT") {
      yield cancel(task);
      yield put({ type: "DELETE_TOKEN" });
    }
  }
}
export function* logActions() {
  while (true) {
    const action = yield take("*");
    console.log(action.type);
  }
}
