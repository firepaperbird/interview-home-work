import axios from "axios";

export async function loginService(username, password) {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ username, password });
  return axios.post('http://localhost:4000/api/user/login', body, config)
    .then(({data}) => {
      //console.log(data)
      localStorage.setItem('ACCESS_TOKEN', data.token);
      return data.token;
    }).catch((err) => {
      console.log("login fail")
      throw(err);
    })
}
