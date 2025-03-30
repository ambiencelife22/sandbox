/* ActionOutcomeIcons */
import React from 'react'

export const CorrectActionIcon: React.FC = () => {
  return (
    <svg
      width='400'
      height='400'
      viewBox='0 0 2500 2500'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M1250 208.333C677.083 208.333 208.333 677.083 208.333 1250C208.333 1822.92 677.083 2291.67 1250 2291.67C1822.92 2291.67 2291.67 1822.92 2291.67 1250C2291.67 677.083 1822.92 208.333 1250 208.333ZM1250 2083.33C791.667 2083.33 416.667 1708.33 416.667 1250C416.667 791.667 791.667 416.667 1250 416.667C1708.33 416.667 2083.33 791.667 2083.33 1250C2083.33 1708.33 1708.33 2083.33 1250 2083.33Z'
        fill='#907AD6'
      />
      <path
        d='M1583.33 822.917L1135.42 1447.92L906.25 1218.75C812.5 1114.58 656.25 1260.42 760.417 1364.58L1072.92 1677.08C1114.58 1718.75 1197.92 1718.75 1229.17 1666.67L1750 937.5C1833.33 833.333 1666.67 708.333 1583.33 822.917Z'
        fill='#907AD6'
      />
    </svg>
  )
}

export const IncorrectActionIcon: React.FC = () => {
  return (
    <svg
      width='400'
      height='400'
      viewBox='0 0 2500 2500'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle cx='1250' cy='1250' r='800' stroke='#FF0000' strokeWidth='121' fill='none' />
      <g transform='rotate(45 1250 1250)'>
        <line x1='650' y1='1250' x2='1850' y2='1250' stroke='#FF0000' strokeWidth='121' />
        <line x1='1250' y1='650' x2='1250' y2='1850' stroke='#FF0000' strokeWidth='121' />
      </g>
    </svg>
  )
}

