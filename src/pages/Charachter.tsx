/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import useAxios from '../hooks/useAxios';
import { LocationTypes, OriginTypes } from '../interfaces/types';
import Loader from 'react-loader-spinner';
import { ImArrowLeft } from 'react-icons/im';
import CharDetail from '../components/CharDetail/CharDetail';

type EpisodesType = {
  id: number;
  name: string;
  date: string;
};

const Charachter = () => {
  const [locationData, setLocationData] = useState<LocationTypes>();
  const [originData, setOriginData] = useState<OriginTypes>();
  const [episodes, setEpisodes] = useState<string[]>([]);
  const [episodesData, setEpisodesData] = useState<EpisodesType[]>();

  const { id }: any = useParams();
  const history = useHistory();

  const { response, loading, error, location, origin } = useAxios(id);

  useEffect(() => {
    setEpisodes(response?.episode as string[]);
  }, [id, response]);

  const fetchLocation = async (location: string) => {
    await axios
      .get<LocationTypes>(location)
      .then((res) => {
        setLocationData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchOrigin = async (origin: string) => {
    await axios
      .get<OriginTypes>(origin)
      .then((res) => {
        setOriginData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchAllEpisodes = () => {
    if (episodes?.length > 0) {
      let allEp = episodes.map((ep) => axios.get(ep));

      axios
        .all(allEp)
        .then(
          axios.spread((...allData) => {
            const data = allData.map((item) => ({
              id: item?.data?.id,
              name: item?.data?.name,
              date: item.data.air_date,
            }));
            setEpisodesData(data);
          })
        )
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    fetchAllEpisodes();
  }, [id, episodes]);

  useEffect(() => {
    fetchLocation(location);
  }, [id, location]);

  useEffect(() => {
    fetchOrigin(origin);
  }, [id, origin]);

  const handleHomePage = () => {
    history.push('/');
  };

  return (
    <div className='bg-red-100 min-h-screen w-full'>
      <div className='p-5 cursor-pointer' onClick={handleHomePage}>
        <ImArrowLeft className='w-10 h-6' />
      </div>
      {loading ? (
        <div className='w-full flex items-center justify-center py-10'>
          <Loader
            type='Puff'
            color='#00BFFF'
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
              <div className='flex flex-col items-center justify-center w-full mx-5'>
                <h2 className='my-10 text-2xl font-medium'>{response?.name}</h2>

                <div className='hover:animate-pulse'>
                  <img src={response?.image} alt={response?.name} />
                </div>
                <div className='my-10 flex flex-col justify-center space-y-3'>
                  <CharDetail data={response?.species} title='Species: ' />
                  <CharDetail data={response?.gender} title='Gender: ' />
                  <CharDetail data={response?.status} title='Status: ' />
                  <CharDetail data={response?.name} title='Location: ' />

                  <div className='flex flex-col space-y-3'>
                    <CharDetail
                      data={locationData?.residents?.length as number}
                      title='Amount of residents: '
                      list
                    />

                    <CharDetail data={locationData?.dimension as string} title='Dimension: ' list />
                    <CharDetail data={locationData?.type as string} title='Type: ' list />
                  </div>

                  <CharDetail data={response?.origin.name} className='pt-5' title='Origin: ' />

                  <div className='flex flex-col space-y-3'>
                    <CharDetail
                      data={originData?.residents?.length as number}
                      title='Amount of residents: '
                      list
                    />
                    <CharDetail data={originData?.dimension as string} title='Dimension: ' list />
                    <CharDetail data={originData?.type as string} title='Type: ' list />
                  </div>

                  <div className='pt-10 mx-10 md:mx-auto'>
                    <span className='my-3 flex justify-center items-center text-xl font-medium'>
                      Chapters that {response.name} featured on{' '}
                    </span>
                    <table className='border border-black'>
                      <thead className='p-2 uppercase'>
                        <th className=''>Id</th>
                        <th>Name</th>
                        <th>Date</th>
                      </thead>
                      <tbody className='p-2'>
                        {episodesData?.map((item: EpisodesType, i: number) => (
                          <tr className='text-center cursor-pointer' key={item?.id}>
                            <td className='bg-blue-400'>{item.id}</td>
                            <td className='bg-yellow-500'>{item?.name}</td>
                            <td className='bg-yellow-600'>{item?.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Charachter;
