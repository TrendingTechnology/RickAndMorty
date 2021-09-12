import { cleanup, render, screen } from "@testing-library/react"
import { Router, Route } from "react-router-dom"
import { createMemoryHistory } from "history"
import Character from "pages/Character"
import { act } from "react-dom/test-utils"
import useAxios from "./hooks/useAxios"
import useEpisodes from "./hooks/useEpisodes"
import useCharOrigin from "./hooks/useCharOrigin"
import useCharLocation from "./hooks/useCharLocation"
import mockedCharacter from "./mockCharacterResponse.json"
import { Character as CharacterType } from "./interfaces/types"

jest.mock("./hooks/useAxios")
jest.mock("./hooks/useEpisodes")
jest.mock("./hooks/useCharOrigin")
jest.mock("./hooks/useCharLocation")

afterEach(cleanup)

test("mock axios fetch", async () => {
  const history = createMemoryHistory()
  history.push("/character/1")

  const mockedUseAxios = useAxios as jest.MockedFunction<typeof useAxios>

  mockedUseAxios.mockImplementation(() => ({
    response: mockedCharacter.data as CharacterType,
    error: "",
    loading: false,
    location: "",
    origin: "",
  }))

  const mockedUseEpisodes = useEpisodes as jest.MockedFunction<
    typeof useEpisodes
  >
  mockedUseEpisodes.mockImplementation(() => ({
    episodesData: [],
    errorEpisodes: "",
    loadingEpisodes: false,
  }))

  const mockedUseCharOrigin = useCharOrigin as jest.MockedFunction<
    typeof useCharOrigin
  >
  mockedUseCharOrigin.mockImplementation(() => ({
    originData: {
      name: "",
      created: new Date(),
      dimension: "",
      id: 1,
      residents: [],
      type: "",
    },
    errorOrigin: "",
    loadingOrigin: false,
  }))

  const mockedUseCharLocation = useCharLocation as jest.MockedFunction<
    typeof useCharLocation
  >
  mockedUseCharLocation.mockImplementation(() => ({
    locationData: {
      created: new Date(),
      dimension: "",
      id: 1,
      name: "",
      residents: [],
      type: "",
    },
    errorLocation: "",
    loadingLocation: false,
  }))

  act(() => {
    render(
      <Router history={history}>
        <Route path="/character/:id">
          <Character />
        </Route>
      </Router>
    )
  })

  expect(screen.getByTestId("species")).toHaveTextContent("Human")
})
