import { motion } from 'framer-motion'
import React from 'react'

const VerticalArrowIcon = ({ up }: { up: boolean }) => {
    return (
        <motion.svg
            animate={{ rotate: up ? 0 : 180 }}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M18 15L12 9L6 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
    )
}

export default VerticalArrowIcon