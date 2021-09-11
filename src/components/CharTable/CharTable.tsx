import React from "react"

type EpisodesType = {
  id: number
  name: string
  date: string
}

interface CharTableProps {
  data: EpisodesType[]
}

const CharTable: React.FC<CharTableProps> = ({ data }) => {
  return (
    <table className="border border-black">
      <thead className="p-2 uppercase">
        <th className="">Id</th>
        <th>Name</th>
        <th>Date</th>
      </thead>
      <tbody className="p-2">
        {data?.map((item: EpisodesType) => (
          <tr className="text-center" key={item?.id}>
            <td className="bg-blue-400">{item.id}</td>
            <td className="bg-yellow-500">{item?.name}</td>
            <td className="bg-yellow-600">{item?.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default CharTable
