import { useState } from 'react'
import CopyIcon from '@/icons/react/copy'
import CopyCheckIcon from '@/icons/react/copyCheck'

export default function CopyButton ({ textToCopy }: {
  textToCopy: string
}) {
  const [copied, setCopied] = useState(false)

  const handleClick = async () => {
    if (!copied) {
      try {
        await navigator.clipboard.writeText(textToCopy)
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
    <button className='p-1.5 flex rounded-md hover:bg-zinc-400/60 dark:hover:bg-zinc-500/60' onClick={handleClick}>{copied ? <CopyCheckIcon className='stroke-green-500' /> : <CopyIcon />}</button>
  )
}
