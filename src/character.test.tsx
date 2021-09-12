import { cleanup, render, screen, waitFor } from "@testing-library/react"
import { renderHook } from "@testing-library/react-hooks"

import toJson from "enzyme-to-json"

import { Router, Route } from "react-router-dom"
import { createMemoryHistory } from "history"
import Enzyme from "enzyme"
import Adapter from "@wojtekmaj/enzyme-adapter-react-17"
import Character from "pages/Character"
import { useAxios, useEpisodes } from "hooks"
import { act } from "react-dom/test-utils"

Enzyme.configure({ adapter: new Adapter() })
afterEach(cleanup)

test("click on button", async () => {
  const history = createMemoryHistory()
  history.push("/character/1")

  // const { getByText } = render(
  //   <Router history={history} >
  //     <Character  />
  //   </Router>
  // )

  const id = 1

  const { result } = renderHook(() => useAxios(id))

  // const { result: res2 } = renderHook(() =>
  //   useEpisodes(result.current.response?.episode)
  // )

  const { getByText, container } = render(
    <Router history={history}>
      <Route path="/character/:id">
        <Character />
      </Route>
    </Router>
  )

  //
  // act(() => {
  // })

  act(() => {
    console.log("response: ", result.current.response)
  })

  // test if chardetail component props is a text

  // expect(screen.getByAltText("Species:")).toHaveTextContent("Human")
})
