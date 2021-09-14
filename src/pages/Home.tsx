import Button from "../components/Button/Button"
import Table from "../components/AllCharsTable/AllCharsTable"
import useAllChars from "../hooks/useAllChars"
import Loader from "react-loader-spinner"
import Layout from "../components/Layout/Layout"
import usePagination from "../hooks/usePagination"

function Home() {
  const { page, nextPageHandler, prevPageHandler } = usePagination()

  const { data, error, loading } = useAllChars(page)

  return (
    <Layout className="home-layout">
      <div className="home-layout_container">
        <h1 className="home-layout_container_title">
          Rick and Morty Characters
        </h1>
        {error ? (
          <span>{error}</span>
        ) : loading ? (
          <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000}
          />
        ) : (
          data && <Table data={data} />
        )}

        <div className="home-layout_buttons">
          <Button className="bg-red-400 " onClick={prevPageHandler}>
            Prev
          </Button>
          <span id="page">Page: {page}</span>
          <Button className="bg-blue-400" onClick={nextPageHandler}>
            Next
          </Button>
        </div>
      </div>
    </Layout>
  )
}

export default Home
