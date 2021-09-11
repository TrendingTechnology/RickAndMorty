/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react"
import { RouteComponentProps, useHistory } from "react-router"
import Loader from "react-loader-spinner"
import { ImArrowLeft } from "react-icons/im"
import { useCharLocation, useCharOrigin, useEpisodes, useAxios } from "../hooks"
import { CharDetail, CharTable, Layout } from "../components"

const Character = (props: RouteComponentProps<{ id?: string }>) => {
  const [episodes, setEpisodes] = useState<string[]>([])

  const id = Number(props.match.params.id)

  const history = useHistory()

  // Get character data
  const { response, loading, error, location, origin } = useAxios(id)

  // Get character location data
  const { locationData, errorLocation } = useCharLocation(location)

  // Get character origin data
  const { originData, errorOrigin } = useCharOrigin(origin)

  // Get character episodes data
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
                  <CharDetail data={response?.name} title="Location: " />

                  {errorLocation ? (
                    <span>{errorLocation}</span>
                  ) : (
                    locationData && (
                      <div className="flex flex-col space-y-3">
                        <CharDetail
                          data={locationData?.residents?.length as number}
                          title="Amount of residents: "
                          list
                        />

                        <CharDetail
                          data={locationData?.dimension as string}
                          title="Dimension: "
                          list
                        />
                        <CharDetail
                          data={locationData?.type as string}
                          title="Type: "
                          list
                        />
                      </div>
                    )
                  )}

                  <CharDetail
                    data={response?.origin.name}
                    className="pt-5"
                    title="Origin: "
                  />
                  {errorOrigin ? (
                    <span>{errorOrigin}</span>
                  ) : (
                    originData && (
                      <div className="flex flex-col space-y-3">
                        <CharDetail
                          data={originData?.residents?.length as number}
                          title="Amount of residents: "
                          list
                        />
                        <CharDetail
                          data={originData?.dimension as string}
                          title="Dimension: "
                          list
                        />
                        <CharDetail
                          data={originData?.type as string}
                          title="Type: "
                          list
                        />
                      </div>
                    )
                  )}

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
