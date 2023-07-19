import { motion } from 'framer-motion'
import React from 'react'

const Logo = () => {
    return (
        <svg width="50" height="45" viewBox="0 0 50 45" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M36.9482 16.5718L20.5497 20.3928L20.5817 20.7122C21.3556 28.442 21.1102 36.24 19.8516 43.9058C30.7085 40.1387 38.5023 30.3611 39.6304 18.9247C39.778 17.4288 38.4121 16.2307 36.9482 16.5718Z" fill="url(#paint0_linear_2_1315)" />
            <path d="M5.40452 21.0176C2.66662 10.3702 10.7075 0 21.7013 0H23.1133C35.466 0 43.5002 12.9996 37.9759 24.0482V24.0482C35.9372 28.1256 32.3128 31.1865 27.9515 32.5138L26.6007 32.9249C17.4338 35.7149 7.79086 30.2978 5.40452 21.0176V21.0176Z" fill="url(#paint1_radial_2_1315)" />
            <path d="M19.0218 24.4565C16.9217 24.3921 17.3814 21.1166 17.4149 20.0246C17.4485 18.9325 17.483 21.0921 19.5831 21.1565C21.6832 21.221 23.9689 19.3768 23.9354 20.4688C23.9019 21.5609 21.1219 24.521 19.0218 24.4565Z" fill="url(#paint2_radial_2_1315)" />
            <ellipse cx="15.7609" cy="14.1305" rx="3.80435" ry="5.43478" fill="url(#paint3_radial_2_1315)" />
            <ellipse cx="15.7609" cy="14.1305" rx="3.80435" ry="5.43478" fill="url(#paint4_radial_2_1315)" />
            <ellipse cx="27.7174" cy="14.1305" rx="3.80435" ry="5.43478" fill="url(#paint5_radial_2_1315)" />
            <ellipse cx="27.7174" cy="14.1305" rx="3.80435" ry="5.43478" fill="url(#paint6_radial_2_1315)" />
            <motion.g initial={{ x: 0 }} animate={{ x: [0, 3, -1, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                <ellipse
                    cx="13.5869"
                    cy="14.1305"
                    rx="3.80435"
                    ry="5.43478"
                    fill="url(#paint7_radial_2_1315)"
                />
                <ellipse
                    cx="25.5435"
                    cy="14.1305"
                    rx="3.80435"
                    ry="5.43478"
                    fill="url(#paint8_radial_2_1315)"
                />
            </motion.g>
            <path d="M19.5652 26.0869C17.6251 26.0869 16.5507 24.3555 16.342 22.8241C16.3015 22.5267 16.5476 22.2826 16.8478 22.2826C17.148 22.2826 17.386 22.5302 17.4671 22.8192C17.8402 24.1499 19.5038 25.1373 20.4984 23.1683C20.604 22.9593 20.7867 22.7924 21.0139 22.7356C21.9344 22.5055 22.8579 23.2329 22.494 24.1092C21.9349 25.4555 20.75 26.0869 19.5652 26.0869Z" fill="url(#paint9_radial_2_1315)" />
            <defs>
                <linearGradient id="paint0_linear_2_1315" x1="33.1522" y1="23.913" x2="15.7609" y2="43.4782" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#004BE0" />
                    <stop offset="0.602519" stopColor="#3485FF" />
                    <stop offset="0.778338" stopColor="#65ACFF" />
                    <stop offset="1" stopColor="#88D4FF" />
                </linearGradient>
                <radialGradient id="paint1_radial_2_1315" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(27.1739 1.08696) rotate(113.86) scale(30.9019 28.7498)">
                    <stop stopColor="#004BE0" />
                    <stop offset="0.808741" stopColor="#3485FF" />
                    <stop offset="1" stopColor="#65ACFF" />
                    <stop offset="1" stopColor="#65ACFF" />
                </radialGradient>
                <radialGradient id="paint2_radial_2_1315" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(19.5725 23.1344) rotate(-89.6911) scale(1.97788 3.38307)">
                    <stop stopColor="#2D68DF" />
                    <stop offset="1" stopColor="#3369D3" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="paint3_radial_2_1315" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(15.7609 14.1305) rotate(90) scale(5.43478 3.63432)">
                    <stop stopColor="#2558BF" />
                    <stop offset="1" stopColor="#2E4E8E" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="paint4_radial_2_1315" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(15.7609 14.1305) rotate(90) scale(5.43478 3.63432)">
                    <stop stopColor="#2558BF" />
                    <stop offset="1" stopColor="#2E4E8E" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="paint5_radial_2_1315" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(27.7174 14.1305) rotate(90) scale(5.43478 3.63432)">
                    <stop stopColor="#2558BF" />
                    <stop offset="1" stopColor="#2E4E8E" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="paint6_radial_2_1315" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(27.7174 14.1305) rotate(90) scale(5.43478 3.63432)">
                    <stop stopColor="#2558BF" />
                    <stop offset="1" stopColor="#2E4E8E" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="paint7_radial_2_1315" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(15.8695 9.29954) rotate(110.334) scale(10.948 7.32106)">
                    <stop stopColor="#74BCFF" />
                    <stop offset="1" stopColor="white" />
                </radialGradient>
                <radialGradient id="paint8_radial_2_1315" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(27.8261 9.29954) rotate(110.334) scale(10.948 7.32106)">
                    <stop stopColor="#74BCFF" />
                    <stop offset="1" stopColor="white" />
                </radialGradient>
                <radialGradient id="paint9_radial_2_1315" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(22.2826 20.6522) rotate(125.375) scale(6.66531 6.83859)">
                    <stop offset="0.310831" stopColor="#ADD8FF" />
                    <stop offset="1" stopColor="white" />
                </radialGradient>
            </defs>
        </svg>

    )
}

export default Logo