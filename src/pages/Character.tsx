/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import Loader from "react-loader-spinner"
import { ImArrowLeft } from "react-icons/im"
import { useCharLocation, useCharOrigin, useEpisodes, useAxios } from "../hooks"
import {
  CharDetail,
  CharTable,
  Layout,
  LocationDetails,
  OriginDetails,
} from "../components"

const Character = () => {
  const [episodes, setEpisodes] = useState<string[]>([])

  const { id }: any = useParams()

  const history = useHistory()

  const { response, loading, error, location, origin } = useAxios(+id)

  const { locationData, errorLocation } = useCharLocation(location)

  const { originData, errorOrigin } = useCharOrigin(origin)

  const { episodesData, errorEpisodes } = useEpisodes(episodes)

  useEffect(() => {
    if (response) {
      setEpisodes(response?.episode)
    }
  }, [id, response])

  const handleHomePage = () => {
    history.push("/")
  }

  return (
    <Layout className="char-layout">
      <div className="char-layout--icon" onClick={handleHomePage}>
        <ImArrowLeft />
      </div>
      {loading ? (
        <div className="char-layout--loader">
          <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000}
          />
        </div>
      ) : (
        <div>
          {error && (
            <div>
              <p>{error}</p>
            </div>
          )}
          <div>
            {response && (
              <div className="char-layout_details">
                <h2 id="title" className="my-10 text-2xl font-medium">
                  {response?.name}
                </h2>

                <div className="hover:animate-pulse">
                  <img
                    src={response?.image}
                    alt={response?.name}
                    loading="lazy"
                  />
                </div>
                <div className="char-layout_details_texts">
                  <CharDetail data={response?.species} title="Species: " />
                  <CharDetail data={response?.gender} title="Gender: " />
                  <CharDetail data={response?.status} title="Status: " />

                  <LocationDetails
                    response={response}
                    mainData={locationData}
                    error={errorLocation}
                  />

                  <OriginDetails
                    response={response}
                    mainData={originData}
                    error={errorOrigin}
                  />

                  <div className="char-layout_details_texts_table">
                    <span className="">
                      Chapters that {response.name} featured on
                    </span>

                    {errorEpisodes ? (
                      <span>{errorEpisodes}</span>
                    ) : (
                      episodesData && <CharTable data={episodesData} />
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </Layout>
  )
}

export default React.memo(Character)
