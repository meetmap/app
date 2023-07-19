import { motion } from 'framer-motion'
import React from 'react'

const ErrorIcon = () => {
    return (
        <motion.svg
            initial={{scale: 0}}
            animate={{scale: 1}}
            exit={{scale: 0}}
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect y="0.5" width="16" height="16" rx="8" fill="url(#paint0_linear_188_565)" />
            <path d="M5.2449 12L8 9M10.7551 6L8 9M8 9L5 6L11 12" stroke="white" />
            <defs>
                <linearGradient id="paint0_linear_188_565" x1="8" y1="0.5" x2="8" y2="16.5" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#C81717" />
                    <stop offset="1" stopColor="#EA336A" />
                </linearGradient>
            </defs>
        </motion.svg>

    )
}

export default ErrorIcon