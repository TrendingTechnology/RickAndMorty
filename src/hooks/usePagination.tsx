import { useState } from "react"

const usePagination = (initPage = 1) => {
  const [page, setPage] = useState<number>(initPage)

  const nextPageHandler = () => {
    setPage((prev) => prev + 1)
  }

  const prevPageHandler = () => {
    setPage((prev) => {
      if (prev - 1 > 0) {
        return prev - 1
      } else {
        return prev
      }
    })
  }

  return { page, nextPageHandler, prevPageHandler }
}
export default usePagination
