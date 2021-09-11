/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react"
import { RouteComponentProps, useHistory } from "react-router"
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

const Character = (props: RouteComponentProps<{ id?: string }>) => {
  const [episodes, setEpisodes] = useState<string[]>([])

  const id = Number(props.match.params.id)

  const history = useHistory()

  const { response, loading, error, location, origin } = useAxios(id)

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
        <div className="w-full flex items-center justify-center py-10">
          <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000} //3 secs
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
              <div className="flex flex-col items-center justify-center mx-10 md:mx-5">
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
                <div className="my-10 flex flex-col justify-center space-y-3">
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

                  <div className="pt-10 mx-10 md:mx-auto">
                    <span className="my-3 flex justify-center items-center text-xl font-medium">
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
