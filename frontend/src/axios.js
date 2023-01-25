import axios from "axios";

const instance = axios.create({
  baseURL: "https://itshop-sklep.herokuapp.com",
});

export default instance;
