import React from 'react';
import { useHistory } from 'react-router-dom';
import { Character } from '../../interfaces/types';

interface TableProps {
  data: Character[];
}

const Table: React.FC<TableProps> = ({ data }) => {
  const history = useHistory();

  const openCharacter = (id: number) => {
    history.push(`/charachter/${id}`, '_blank');
  };
  return (
    <div className='w-full flex justify-center'>
      {data?.length ? (
        <table className='border-2 border-black'>
          <thead className='p-2 uppercase'>
            <th className=''>Id</th>
            <th>Name</th>
            <th>Status</th>
            <th>species</th>
          </thead>
          <tbody className='p-2'>
            {data?.map((item: Character, i: number) => (
              <tr
                className='text-center cursor-pointer'
                key={item?.id}
                onClick={() => openCharacter(item.id)}>
                <td className='bg-blue-400'>{item.id}</td>
                <td className='bg-yellow-500'>{item?.name}</td>
                <td className='bg-yellow-600'>{item?.status}</td>
                <td className='bg-yellow-700'>{item?.species}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        'There is no data'
      )}
    </div>
  );
};

export default Table;
