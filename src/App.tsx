import { Route, Switch } from "react-router"
import Charachter from "./pages/Charachter"
import Home from "./pages/Home"

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/charachter/:id" component={Charachter} />
      </Switch>
    </>
  )
}

export default App
