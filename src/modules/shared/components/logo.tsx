'use client'
import { AiOutlinePlus } from 'react-icons/ai'

import { roboto, tourney } from '@/config/fonts'
export default function Logo() {
  return (
    <div className={'font-sans h-auto flex-center gap-3'}>
      <div className="flex gap-2.5">
        <span
          className={`${tourney.className} text-white bg-black text-4xl font-extrabold size-10 flex-center scale-x-120 scale-y-105`}
        >
          U
        </span>
        <span
          className={`${tourney.className} text-white bg-black py-2 text-4xl font-extrabold size-10 flex-center scale-x-120 scale-y-105`}
        >
          T
        </span>
        <span
          className={`${tourney.className} text-white bg-black py-2 text-4xl font-extrabold size-10 flex-center scale-x-120 scale-y-105`}
        >
          P
        </span>
      </div>
      <div className="flex-center gap-2">
        <div className="relative size-7 overflow-hidden bg-background flex-center z-10">
          <AiOutlinePlus
            strokeWidth={60}
            className={'text-[#FE3A5C] text-5xl absolute'}
          />
        </div>

        <span
          className={`${roboto.className} text-black text-4xl font-extrabold tracking-tighter -ml-1.5 z-20`}
        >
          cafetín
        </span>
      </div>
    </div>
  )
}
