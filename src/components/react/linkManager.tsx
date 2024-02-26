import { useState, type ChangeEvent } from 'react'
import type { Link } from '@prisma/client'
import { customFetch } from '@/lib/client'
import CopyButton from './copyButton'

export default function LinkManager ({ link, origin }: {
  link: Link
  origin: string
}) {
  const [change, setChange] = useState(false)
  const [url, setUrl] = useState(link.url)

  const handleChange = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => {
    setUrl(value)

    if (value === link.url) {
      if (change) setChange(false)
    } else {
      setChange(true)
    }
  }

  const deleteLink = () => {
    customFetch(`links/${link.id}`, {
      method: 'DELETE'
    }).then(() => {
      location.assign('/dashboard/links')
    }).catch(console.error)
  }

  const saveChanges = () => {
    customFetch(`links/${link.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url })
    }).then(data => {
      if ('id' in data) setChange(false)
    }).catch(console.error)
  }

  return (
    <>
      <label htmlFor="url">
        <strong className='block mb-2'>URL de redirección:</strong>
        <input
          className='w-full py-2 px-3 rounded-md border border-gray-300 dark:border-gray-500 text-gray-900 dark:text-gray-100 placeholder-gray-600/80 dark:placeholder-gray-400/80 focus:ring-blue-500 focus:border-blue-500 bg-zinc-200 dark:bg-zinc-700'
          onChange={handleChange} type="url" value={url} id='url'
        />
      </label>
      <section>
        <strong className='block mb-2'>Codigo:</strong>
        <p className='flex justify-between items-center rounded-md py-2 px-3 border border-gray-300 dark:border-gray-500 bg-zinc-200 dark:bg-zinc-700'>
          <span>{link.code}</span>
          <CopyButton textToCopy={link.code} />
        </p>
      </section>
      <section>
        <strong className='block mb-2'>Enlace acortado:</strong>
        <p className='flex justify-between items-center rounded-md py-2 px-3 border border-gray-300 dark:border-gray-500 bg-zinc-200 dark:bg-zinc-700'>
          <span>{origin}/{link.code}</span>
          <CopyButton textToCopy={`${origin}/${link.code}`} />
        </p>
      </section>
      <section className='flex justify-between'>
        <p>
          <strong className='block mb-w'>Creado:</strong>
          <span>{link.createdAt.toLocaleString()}</span>
        </p>
        <p className='text-end'>
          <strong className='block mb-w'>Ultima actualización:</strong>
          <span>{link.updatedAt.toLocaleString()}</span>
        </p>
      </section>
      <section className='space-x-4 mb-10'>
        {change && <button className='py-1.5 px-3 rounded-md text-lg font-semibold border-2 transition border-emerald-500 bg-emerald-500 text-gray-100 hover:bg-emerald-600' onClick={saveChanges}>Guardar cambios</button>}
        <button className='py-1.5 px-3 rounded-md text-lg font-semibold border-2 transition border-red-500 text-red-500 hover:bg-red-500 hover:text-gray-100' onClick={deleteLink}>Elimiar link</button>
      </section>
    </>
  )
}
