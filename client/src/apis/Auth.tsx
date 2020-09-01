import axios from 'axios';
import * as authActions from '../modules/Auth';
import store from '..';

const serverIp = 'localhost:3000';

export function signup(
  email: string,
  password: string,
  username: string,
  history: any,
) {
  return axios
    .post(`http://${serverIp}/user/signup`, {
      email,
      password,
      username,
    })
    .then((res) => {
      history.push('/main');
      console.log(res);
    })
    .catch((err) => console.log(err.response));
}

export function signin(email: string, password: string, history: any) {
  return axios
    .post(`http://${serverIp}/user/signin`, {
      email,
      password,
    })
    .then((res) => {
      store.dispatch(authActions.setToken({ token: res.data.token }));
      store.dispatch(authActions.user_sign_in());
      history.push('/channel');
    })
    .catch((err) => console.log(err.response));
}

export function createRoom(roomname: string, history: any) {
  return axios
    .post(
      `http://${serverIp}/user/channel`,
      {
        roomname,
      },
      {
        headers: {
          Authorization: store.getState().Auth.token,
        },
      },
    )
    .then((res) => {
      history.push(`/greenroom/${res.data.id}`);
    })
    .catch((err) => console.log(err.response));
}

export function inRoom(roomId: number, history: any) {
  console.log(store.getState().Auth.token);
  return axios
    .post(
      `http://${serverIp}/user/greenroom/${roomId}`,
      {},
      {
        headers: {
          Authorization: store.getState().Auth.token,
        },
      },
    )
    .then((res) => {
      history.push(`/greenroom/${roomId}`);
    })
    .catch((err) => console.log(err.response));
}
