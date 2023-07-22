import React from 'react'
import { Path, Svg } from 'react-native-svg'

const MoreIcon = () => {
    return (
        <Svg
        width={20}
        height={18}
        fill="none"
      >
        <Path
          stroke="#7A7B84"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.538}
          d="M10.5 11.333a.833.833 0 1 0 0-1.666.833.833 0 0 0 0 1.666ZM10.5 5.5a.833.833 0 1 0 0-1.667.833.833 0 0 0 0 1.667ZM10.5 17.167a.833.833 0 1 0 0-1.667.833.833 0 0 0 0 1.667Z"
        />
      </Svg>
    )
}

export default MoreIcon