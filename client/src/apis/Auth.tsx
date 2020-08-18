import axios from 'axios';

const serverIp = 'localhost:3001';

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
      history.push('/selectCharacter');
      console.log(res);
    })
    .catch((err) => console.log(err.response));
}
