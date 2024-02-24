export async function customFetch (path: string, init?: RequestInit) {
  const response = await fetch(`${location.origin}/api/${path}`, init)
  const contenType = response.headers.get('Content-Type')

  if (contenType !== 'application/json') {
    return {
      error: 'The response type is not json'
    }
  }

  return await response.json()
}
