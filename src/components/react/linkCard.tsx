import { useState } from 'react'
import type { Link } from '@/types'

const copyIcon = (
  <svg xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z" />
    <path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1" />
  </svg>
)

const copyCheckIcon = (
  <svg xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z" />
    <path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1" />
    <path d="M11 14l2 2l4 -4" />
  </svg>
)

export default function LinkCard ({ link }: {
  link: Link
}) {
  const [copied, setCopied] = useState(false)

  const handleClick = async () => {
    if (!copied) {
      try {
        await navigator.clipboard.writeText(`${location.origin}/${link.code}`)
      } catch (error) {
        console.error(error)
      }

      setCopied(true)
      setTimeout(() => {
        setCopied(false)
      }, 4_000)
    }
  }

  return (
    <li className='flex justify-between py-2 px-4 rounded-lg transition hover:bg-gray-500'>
      <p className='space-x-4'>
        <strong>{link.code}</strong>
        <em>{link.link}</em>
      </p>
      <button onClick={handleClick}>{copied ? copyCheckIcon : copyIcon}</button>
    </li>
  )
}