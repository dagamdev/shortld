import { useState } from 'react'
import type { Link } from '@prisma/client'
import CopyIcon from '@/icons/react/copy'
import CopyCheckIcon from '@/icons/react/copyCheck'

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
      }, 2_000)
    }
  }

  return (
    <li className='flex items-center justify-between py-2.5 px-4 gap-x-3 rounded-lg transition bg-zinc-200 dark:bg-zinc-700'>
      <a href={`/dashboard/links/${link.id}`}
        className='truncate'
      >
        <p>
          <strong>{link.code}</strong>
          <em className='block ml-1 truncate'>{link.url}</em>
        </p>
      </a>
      <button className='p-1.5 flex rounded-md hover:bg-zinc-400/60 dark:hover:bg-zinc-500/60' onClick={handleClick}>{copied ? <CopyCheckIcon className='stroke-green-500' /> : <CopyIcon />}</button>
    </li>
  )
}
