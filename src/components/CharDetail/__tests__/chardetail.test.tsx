import { render } from "@testing-library/react"
import { CharDetail } from "components"

describe("test CharDetail component", () => {
  it("component has right result ", () => {
    const props = {
      title: "Species:",
      data: "Human",
      dataTestid: "species",
    }

    const { container } = render(<CharDetail {...props} />)
    expect(container.innerHTML).toMatch("Species: Human")
  })
})
