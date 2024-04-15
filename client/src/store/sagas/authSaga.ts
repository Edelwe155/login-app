import { call, put, takeLatest } from "redux-saga/effects";
import {
  login,
  loginFailure,
  loginSuccess,
  register,
  registerFailure,
  registerSuccess,
  logout,
  logoutSuccess,
  logoutFailure,
} from "../reducers/authSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { clearPersistor } from "../../utils/cleanUpPersistor";

interface LoginSagaProps {
  user: {
    email: string;
    reEmail?: string;
    password: string;
  };
  onSuccess: () => void;
}

function* loginSaga(action: PayloadAction<LoginSagaProps>) {
  try {
    const { email, password } = action.payload.user;

    //@ts-ignore
    const response = yield call(axios.post, "http://localhost:8000/login", {
      email,
      password,
    });

    yield put(loginSuccess(response.data.user));
    action.payload.onSuccess();
  } catch (error: any) {
    yield put(loginFailure(error.message));
  }
}

function* registerSaga(action: PayloadAction<LoginSagaProps>) {
  try {
    const { email, reEmail, password } = action.payload.user;

    //@ts-ignore
    const response = yield call(axios.post, "http://localhost:8000/register", {
      email,
      reEmail,
      password,
    });

    yield put(registerSuccess(response.data.user));
    action.payload.onSuccess();
  } catch (error: any) {
    yield put(registerFailure(error.message));
  }
}

function* logoutSaga(action: PayloadAction<LoginSagaProps>) {
  try {
    // Make an API call to invalidate the token on the server-side

    clearPersistor();

    yield put(logoutSuccess());
    action.payload.onSuccess();
  } catch (error: any) {
    clearPersistor();

    yield put(logoutFailure());
    action.payload.onSuccess();
  }
}

export function* authSaga() {
  //@ts-ignore
  yield takeLatest(login().type, loginSaga);
  //@ts-ignore
  yield takeLatest(logout().type, logoutSaga);
  //@ts-ignore
  yield takeLatest(register().type, registerSaga);
}
