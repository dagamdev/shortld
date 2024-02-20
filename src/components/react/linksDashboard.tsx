import { useState, useEffect, type FormEvent } from 'react'
import type { Link } from '@prisma/client'
import LinkCard from './linkCard'

export default function LinksDashboard ({ user }: {
  user: App.Locals['user']
}) {
  const [links, setLinks] = useState<Link[]>([])

  useEffect(() => {
    fetch('api/links').then(res => res.json()).then(data => {
      setLinks(data as Link[])
    }).catch(console.error)
  }, [])

  const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault()

    const link = ev.currentTarget.url.value
    if (typeof link !== 'string') return
    if (user === null) return

    fetch('api/links', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        link,
        userId: user.id
      })
    }).then(res => res.json()).then(data => {
      setLinks(ls => [...ls, data])
    }).catch(console.error)

    ev.currentTarget.url.value = ''
  }

  return (
    <section className="max-w-lg mx-auto my-20 space-y-6">
      <form id="shortenLink-form" onSubmit={handleSubmit}
        className="flex gap-x-3"
      >
        <input id="url"
          className="flex-1 py-2 px-4 rounded-md bg-zinc-400 dark:bg-zinc-700"
          type="url"
          placeholder="Enlace a acortar"
          required
        />
        <button className="py-2 px-4 rounded-md bg-blue-500 hover:bg-blue-600">Acortar</button>
      </form>
      {links.length !== 0 &&
        <section>
          <strong>Enlaces: {links.length}</strong>
          <ul className='mt-3'>
            {links.map(l => <LinkCard key={l.id} link={l} />)}
          </ul>
        </section>
      }
    </section>
  )
}
