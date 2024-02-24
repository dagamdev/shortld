import { useState, useEffect, type FormEvent } from 'react'
import type { Link } from '@prisma/client'
import LinkCard from './linkCard'
import { customFetch } from '@/lib/client'

export default function LinksDashboard ({ user }: {
  user: App.Locals['user']
}) {
  const [links, setLinks] = useState<Link[]>([])

  useEffect(() => {
    customFetch('links').then(data => {
      console.log(data)
      if (Array.isArray(data)) setLinks(data as Link[])
    }).catch(console.error)
  }, [])

  const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault()

    const link = ev.currentTarget.url.value
    if (typeof link !== 'string') return
    if (user === null) return

    customFetch(`${location.origin}/api/links`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        link,
        userId: user.id
      })
    }).then(data => {
      if ('id' in data && 'code' in data) setLinks(ls => [...ls, data])
    }).catch(console.error)

    ev.currentTarget.url.value = ''
  }

  return (
    <section className="max-w-lg mx-auto my-20 space-y-6">
      <form id="shortenLink-form" onSubmit={handleSubmit}
        className="flex gap-x-3"
      >
        <input id="url"
          className="flex-1 py-2 px-4 rounded-md border border-gray-300 dark:border-gray-500 text-gray-900 dark:text-gray-100 placeholder-gray-600/80 dark:placeholder-gray-400/80 focus:ring-blue-500 focus:border-blue-500 bg-zinc-200 dark:bg-zinc-700"
          type="url"
          placeholder="Enlace a acortar"
          required
        />
        <button className="py-2 px-4 rounded-md font-semibold text-gray-200 bg-blue-500 hover:bg-blue-600">Acortar</button>
      </form>
      {links.length !== 0 &&
        <section>
          <strong className='text-lg text-gray-700 dark:text-gray-400'>Enlaces: {links.length}</strong>
          <ul className='mt-3 space-y-3'>
            {links.map(l => <LinkCard key={l.id} link={l} />)}
          </ul>
        </section>
      }
    </section>
  )
}
