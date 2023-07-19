import { motion } from 'framer-motion'
import React from 'react'

const GeolocationIcon = ({ geoTrackingEnabled = false }: { geoTrackingEnabled?: boolean }) => {
    const pathLength = geoTrackingEnabled ? 0 : 1;
    // const pathOffset = geoTrackingEnabled ? 1 : 0;
    return (
        <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.75 7.70834L11.8333 2.45834L6.58333 13.5417L5.41667 8.87501L0.75 7.70834Z" stroke="#5C5E66" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <motion.path
                animate={{ pathLength }}
                d="M12 10.7083L3.51472 2.22303"
                stroke="white"
                strokeWidth="3.5"
                strokeLinecap="round"
            />
            <motion.path
                animate={{ pathLength }}
                d="M12 10.7083L3.51472 2.22303"
                stroke="#5C5E66"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
        </svg>

    )
}

export default GeolocationIcon