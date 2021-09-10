import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useAxios from '../hooks/useAxios';
import { LocationTypes, OriginTypes } from '../interfaces/types';

const Charachter = () => {
  const [locationData, setLocationData] = useState<LocationTypes>();
  const [originData, setOriginData] = useState<OriginTypes>();
  const [episodes, setEpisodes] = useState<string[]>();

  const { id }: any = useParams();

  const { response, loading, error, location, origin } = useAxios(id);

  useEffect(() => {
    setEpisodes(response?.episode);
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

  useEffect(() => {
    fetchLocation(location);
  }, [id, location]);

  useEffect(() => {
    fetchOrigin(origin);
  }, [id, origin]);

  return (
    <div className='bg-red-100 min-h-screen w-screen'>
      {loading ? (
        <p>loading...</p>
      ) : (
        <div>
          {error && (
            <div>
              <p>{error}</p>
            </div>
          )}
          <div>
            {response && (
              <div className='flex flex-col items-center justify-center'>
                <h2 className='my-10 text-2xl font-medium'>{response?.name}</h2>
                <div className='hover:animate-pulse'>
                  <img src={response?.image} alt={response?.name} />
                </div>
                <div className='my-10 flex flex-col justify-center space-y-3'>
                  <span className=' text-xl font-medium'>Species: {response?.species} </span>
                  <span className=' text-xl font-medium'>Gender: {response?.gender} </span>
                  <span className=' text-xl font-medium'>Status: {response?.status} </span>
                  <span className=' text-xl font-medium pt-3'>Location: {locationData?.name} </span>
                  <div className='flex flex-col space-y-3'>
                    <li className=' text-xl font-medium'>
                      Amount of residents: {locationData?.residents?.length}
                    </li>
                    <li className=' text-xl font-medium'>Dimension: {locationData?.dimension}</li>
                    <li className=' text-xl font-medium'>Type: {locationData?.type}</li>
                  </div>

                  <span className=' text-xl font-medium pt-5'>
                    Origin: {response?.origin.name}{' '}
                  </span>

                  <div className='flex flex-col space-y-3'>
                    <li className=' text-xl font-medium'>
                      Amount of residents: {originData?.residents?.length}
                    </li>
                    <li className=' text-xl font-medium'>Dimension: {originData?.dimension}</li>
                    <li className=' text-xl font-medium'>Type: {originData?.type}</li>
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
