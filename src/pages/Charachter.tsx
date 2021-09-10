/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react"
import { RouteComponentProps, useHistory } from "react-router"
import useAxios from "../hooks/useAxios"
import Loader from "react-loader-spinner"
import { ImArrowLeft } from "react-icons/im"
import CharDetail from "../components/CharDetail/CharDetail"
import useCharLocation from "../hooks/useCharLocation"
import useCharOrigin from "../hooks/useCharOrigin"
import useEpisodes from "../hooks/useEpisodes"

type EpisodesType = {
  id: number
  name: string
  date: string
}

const Charachter = (props: RouteComponentProps<{ id?: string }>) => {
  const [episodes, setEpisodes] = useState<string[]>([])

  const id = Number(props.match.params.id)

  const history = useHistory()

  const { response, loading, error, location, origin } = useAxios(id)

  const { locationData, errorLocation } = useCharLocation(location)

  const { originData, errorOrigin } = useCharOrigin(origin)

  const { episodesData, errorEpisodes } = useEpisodes(episodes)

  useEffect(() => {
    setEpisodes(response?.episode as string[])
  }, [id, response])

  const handleHomePage = () => {
    history.push("/")
  }

  return (
    <div className="bg-red-100 min-h-screen min-w-screen">
      <div className="p-5 cursor-pointer" onClick={handleHomePage}>
        <ImArrowLeft className="w-10 h-6 fixed" />
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
                      Chapters that {response.name} featured on{" "}
                    </span>

                    {errorEpisodes ? (
                      <span>{errorEpisodes}</span>
                    ) : (
                      episodesData && (
                        <table className="border border-black">
                          <thead className="p-2 uppercase">
                            <th className="">Id</th>
                            <th>Name</th>
                            <th>Date</th>
                          </thead>
                          <tbody className="p-2">
                            {episodesData?.map(
                              (item: EpisodesType, i: number) => (
                                <tr
                                  className="text-center cursor-pointer"
                                  key={item?.id}
                                >
                                  <td className="bg-blue-400">{item.id}</td>
                                  <td className="bg-yellow-500">
                                    {item?.name}
                                  </td>
                                  <td className="bg-yellow-600">
                                    {item?.date}
                                  </td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>
                      )
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default React.memo(Charachter)
