import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Button from '../components/Button/Button';
import Table from '../components/Table/Table';
import { Character, DataTypes } from '../interfaces/types';

function Home() {
  const [data, setData] = useState<Character[]>([]);

  const [page, setPage] = useState<number>(1);

  const getData = async (page = 1) => {
    await axios
      .get<DataTypes>(`/character/?page=${page}`)

      .then((res) => {
        setData(res.data.results);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData(page);
  }, [page]);

  const nextPageHandler = () => {
    setPage((prev) => prev + 1);
  };
  const prevPageHandler = () => {
    setPage((prev) => {
      if (prev - 1 > 0) {
        return prev - 1;
      } else {
        return prev;
      }
    });
  };

  return (
    <div className='flex flex-col h-screen items-center justify-center text-white bg-gradient-to-br from-gray-600 via-teal-700 to-gray-800'>
      <div className='flex flex-col items-center'>
        <Table data={data} />
        <div className='w-11/12 flex items-center justify-between my-5'>
          <Button variant='black' className='bg-red-400' onClick={prevPageHandler}>
            Prev
          </Button>
          <span className='text-xl '>{page}</span>
          <Button variant='black' className='bg-blue-500' onClick={nextPageHandler}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Home;
