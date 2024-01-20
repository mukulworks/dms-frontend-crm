import {
  fetchUserDetailService,
  fetchUserMenuRightsService,
} from "../services/userService";
import { put, call } from "redux-saga/effects";
import * as types from "../actions";

export function* fetchUserDetailSaga(payload) {
  try {
    yield put({ type: types.SHOW_LOADER });
    const response = yield call(fetchUserDetailService, payload);
    yield put({ type: types.FETCH_USER_DETAIL_SUCCESS, response });
    yield put({ type: types.HIDE_LOADER });
  } catch (error) {
    localStorage.removeItem("token");
    window.location.href =
      window.location.origin + `/OrbitDmsIdentity/${window.brandCode || ""}`;
    yield put({ type: types.FETCH_USER_DETAIL_FAIL, error });
    yield put({ type: types.HIDE_LOADER });
  }
}

export function* fetchUserMenuRightSaga(payload) {
  try {
    yield put({ type: types.SHOW_LOADER });
    const response = yield call(fetchUserMenuRightsService, payload);
    yield put({ type: types.FETCH_USER_MENU_RIGHTS_SUCCESS, response });
    yield put({ type: types.HIDE_LOADER });
  } catch (error) {
    yield put({ type: types.FETCH_USER_MENU_RIGHTS_FAIL, error });
    yield put({ type: types.HIDE_LOADER });
  }
}
