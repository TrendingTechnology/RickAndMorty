import ReactDOM from "react-dom"
import "./styles/index.css"
import "./styles/styles.css"
import "./styles/index.scss"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import axios from "axios"

axios.defaults.baseURL = "https://rickandmortyapi.com/api"

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
)
