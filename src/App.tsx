import { Route, Switch } from "react-router"
import Character from "./pages/Character"
import Home from "./pages/Home"

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/character/:id" component={Character} />
      </Switch>
    </>
  )
}

export default App
