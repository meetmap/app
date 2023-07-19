import { motion } from 'framer-motion'
import React from 'react'

const CheckSmIcon = () => {
    return (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <motion.path
                d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0, strokeLinecap: "round", strokeLinejoin: "round" }}
                animate={{ pathLength: 1 }} 
            />
        </svg>
    )
}

export default CheckSmIcon