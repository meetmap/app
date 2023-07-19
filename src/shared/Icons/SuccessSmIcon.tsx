import { motion } from 'framer-motion'
import React from 'react'

const SuccessSmIcon = () => {
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
            <rect y="0.5" width="16" height="16" rx="8" fill="url(#paint0_linear_188_561)" />
            <path d="M4.66663 8.2407L7.04758 10.8333L11.3333 6.16663" stroke="white" />
            <defs>
                <linearGradient id="paint0_linear_188_561" x1="8" y1="0.5" x2="8" y2="16.5" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#17C852" />
                    <stop offset="1" stopColor="#29E07D" />
                </linearGradient>
            </defs>
        </motion.svg>

    )
}

export default SuccessSmIcon