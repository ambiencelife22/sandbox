/* VersionContext.tsx */
import React from 'react'

type VersionContextType = {
    version: string
    setVersion?: React.Dispatch<React.SetStateAction<string>>
}

const VersionContext = React.createContext<VersionContextType>({
    version: '1.10.1.22.26.03.25.01'
})

export default VersionContext
