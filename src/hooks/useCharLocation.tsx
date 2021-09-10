/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect } from "react"
import axios from "axios"
import { LocationTypes } from "../interfaces/types"

const useCharLocation = (url: string) => {
  const [errorLocation, setErrorLocation] = useState("")
  const [loadingLocation, setLoadingLocation] = useState(true)
  const [locationData, setLocationData] = useState<LocationTypes>()

  const fetchData = (url: string) => {
    axios
      .get<LocationTypes>(url)
      .then((res) => {
        setLocationData(res.data)
      })
      .catch((err) => {
        setErrorLocation("No location url provided")
      })
      .finally(() => {
        setTimeout(() => {
          setLoadingLocation(false)
        }, 1500)
      })
  }

  useEffect(() => {
    if (url) {
      fetchData(url)
    }
  }, [url])

  // custom hook returns value
  return { locationData, errorLocation, loadingLocation }
}

export default useCharLocation
