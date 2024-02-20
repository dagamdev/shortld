const headers = {
  'Content-Type': 'application/json'
}

export function handleError (error: unknown) {
  return new Response(JSON.stringify({
    error: error instanceof Error ? error.message : 'Have you made a mistake when making the request?'
  }), {
    status: 400,
    statusText: 'bad request',
    headers
  })
}

export function createJsonRes (body: any, init?: ResponseInit) {
  if (init !== undefined) {
    init.headers = headers
  }
  return new Response(JSON.stringify(body), init)
}

export function generateCode () {
  let code = ''

  for (let i = 0; i < 6; i++) {
    const randomChar = (Math.floor(Math.random() * 21)).toString(20)
    code += randomChar
  }

  return code
}
