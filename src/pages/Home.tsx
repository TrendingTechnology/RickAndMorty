import React, { useState } from "react"
import Button from "../components/Button/Button"
import Table from "../components/AllCharsTable/AllCharsTable"
import useAllChars from "../hooks/useAllChars"
import Loader from "react-loader-spinner"

function Home() {
  const [page, setPage] = useState<number>(1)

  // Get all charachters data
  const { data, error, loading } = useAllChars(page)

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

  return (
    <div className="flex flex-col h-screen items-center justify-center bg-red-100">
      <div className="flex flex-col items-center">
        <h1 className="py-10 font-semibold text-2xl">
          Rick and Morty Charchters
        </h1>
        {error ? (
          <span>{error}</span>
        ) : loading ? (
          <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000} //3 secs
          />
        ) : (
          data && <Table data={data} />
        )}

        <div className="w-full flex items-center space-x-5 justify-between my-5">
          <Button
            variant="black"
            className="bg-red-400"
            onClick={prevPageHandler}
          >
            Prev
          </Button>
          <span id="page" className="text-xl ">
            Page: {page}
          </span>
          <Button
            variant="black"
            className="bg-blue-500"
            onClick={nextPageHandler}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Home
