import { cleanup, render } from "@testing-library/react"
import App from "./App"
import Home from "./pages/Home"
import Enzyme from "enzyme"
import Adapter from "@wojtekmaj/enzyme-adapter-react-17"
import toJson from "enzyme-to-json"
import { Router } from "react-router-dom"
import { createMemoryHistory } from "history"

Enzyme.configure({ adapter: new Adapter() })
afterEach(cleanup)

describe("snapshot test", () => {
  const history = createMemoryHistory()

  it("snapshot test Home page", () => {
    const wrapper = Enzyme.shallow(<Home />)

    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it("renders text in home page", () => {
    const { container } = render(
      <Router history={history}>
        <App />
      </Router>
    )

    expect(container.textContent).toMatch("Rick and Morty Charchters")
  })
})
