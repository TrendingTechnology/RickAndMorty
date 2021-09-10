/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect } from "react"
import axios from "axios"
import { OriginTypes } from "../interfaces/types"

const useCharOrigin = (url: string) => {
  const [errorOrigin, setErrorOrigin] = useState("")
  const [loadingOrigin, setLoadingOrigin] = useState(true)
  const [originData, setOriginData] = useState<OriginTypes>()
  const fetchData = (url: string) => {
    axios
      .get<OriginTypes>(url)
      .then((res) => {
        setOriginData(res.data)
      })
      .catch((err) => {
        setErrorOrigin("There is no origin url")
      })
      .finally(() => {
        setTimeout(() => {
          setLoadingOrigin(false)
        }, 1500)
      })
  }

  useEffect(() => {
    if (url) {
      fetchData(url)
    }
  }, [url])

  // custom hook returns value
  return { originData, errorOrigin, loadingOrigin }
}

export default useCharOrigin
