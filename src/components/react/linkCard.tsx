import type { Link } from '@prisma/client'
import CopyButton from './copyButton'

export default function LinkCard ({ link }: {
  link: Link
}) {
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
      <CopyButton textToCopy={`${location.origin}/${link.code}`} />
    </li>
  )
}
