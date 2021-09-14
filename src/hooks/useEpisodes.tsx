import { useState, useEffect } from "react"
import axios from "axios"

type EpisodesType = {
  id: number
  name: string
  date: string
}

const useEpisodes = (allEpisodes: string[]) => {
  const [errorEpisodes, setErrorEpisodes] = useState("")

  const [loadingEpisodes, setLoadingEpisodes] = useState(true)

  const [episodesData, setEpisodesData] = useState<EpisodesType[]>()

  const fetchData = (epAll: string[]) => {
    if (allEpisodes?.length > 0) {
      let allEp = allEpisodes.map((ep) => axios.get(ep))

      axios
        .all(allEp)
        .then(
          axios.spread((...allData) => {
            const data = allData.map((item) => ({
              id: item?.data?.id,
              name: item?.data?.name,
              date: item.data.air_date,
            }))
            setEpisodesData(data)
          })
        )
        .catch((err) => {
          setErrorEpisodes(err)
          console.log("error: ", err)
        })
        .finally(() => {
          setTimeout(() => {
            setLoadingEpisodes(false)
          }, 1500)
        })
    }
  }

  useEffect(() => {
    if (allEpisodes) {
      fetchData(allEpisodes)
    }
  }, [allEpisodes])

  // custom hook returns value
  return { episodesData, errorEpisodes, loadingEpisodes }
}

export default useEpisodes
