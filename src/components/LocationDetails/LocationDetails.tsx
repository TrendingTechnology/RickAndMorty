import { Character, LocationTypes } from "interfaces/types"
import React from "react"
import { CharDetail } from "../index"

interface LocationDetailsProps {
  mainData?: LocationTypes
  error: string
  response: Character
}

const LocationDetails: React.FC<LocationDetailsProps> = ({
  mainData,
  error,
  response,
}) => {
  return (
    <>
      <CharDetail data={response?.name} title="Location: " />

      {error ? (
        <span>{error}</span>
      ) : (
        mainData && (
          <div className="flex flex-col space-y-3">
            <CharDetail
              data={mainData?.residents?.length as number}
              title="Amount of residents: "
              list
            />

            <CharDetail
              data={mainData?.dimension as string}
              title="Dimension: "
              list
            />
            <CharDetail data={mainData?.type as string} title="Type: " list />
          </div>
        )
      )}
    </>
  )
}

export default LocationDetails
