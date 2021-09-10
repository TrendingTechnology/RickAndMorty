/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect } from "react"
import axios from "axios"
import { Character, DataTypes } from "../interfaces/types"

const useAllChars = (page: number) => {
  const [data, setData] = useState<Character[]>([])
  const [error, setError] = useState("")
  const [loading, setloading] = useState(true)

  const fetchData = (page: number) => {
    axios
      .get<DataTypes>(`/character/?page=${page}`)

      .then((res) => {
        setData(res.data.results)
      })
      .catch((err) => setError("Can't fetch data"))
      .finally(() => {
        setTimeout(() => {
          setloading(false)
        }, 1500)
      })
  }

  useEffect(() => {
    if (page) {
      fetchData(page)
    }
  }, [page])

  // custom hook returns value
  return { data, error, loading }
}

export default useAllChars
