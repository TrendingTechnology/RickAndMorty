import { Character, OriginTypes } from "interfaces/types"
import React from "react"
import { CharDetail } from "../index"

interface OriginDetailsProps {
  mainData?: OriginTypes
  error: string
  response: Character
}

const OriginDetails: React.FC<OriginDetailsProps> = ({
  mainData,
  error,
  response,
}) => {
  return (
    <>
      <CharDetail
        data={response?.origin.name}
        className="pt-5"
        title="Origin: "
        dataTestid="origin"
      />
      {error ? (
        <span>{error}</span>
      ) : (
        mainData && (
          <div className="flex flex-col space-y-3">
            <CharDetail
              data={mainData?.residents?.length as number}
              title="Amount of residents: "
              list
              dataTestid="amount of residents "
            />
            <CharDetail
              data={mainData?.dimension as string}
              title="Dimension: "
              list
              dataTestid="dimension"
            />
            <CharDetail
              dataTestid="type"
              data={mainData?.type as string}
              title="Type: "
              list
            />
          </div>
        )
      )}
    </>
  )
}

export default OriginDetails
