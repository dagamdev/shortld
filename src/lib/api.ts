import { Prisma } from './prisma'

const headers = {
  'Content-Type': 'application/json'
}
const CHARS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

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
  return new Response(JSON.stringify(body), {
    headers,
    ...init
  })
}

function getCodeLength (codes: string[]) {
  let codeLength = 1

  for (let l = 1; l < 6; l++) {
    const numberOfCodes = (CHARS.length ** l)
    const codesByLength = codes.filter(c => c.length === l).length

    if (codesByLength < numberOfCodes) return l
    if (codesByLength >= numberOfCodes) codeLength++
  }

  return codeLength
}

function generateCode (codes: string[]) {
  const codeLength = getCodeLength(codes)
  let code = ''

  for (let i = 0; i < codeLength; i++) {
    code += CHARS[Math.floor(Math.random() * CHARS.length)]
  }

  return code
}

export async function getCode () {
  const codes = (await Prisma.link.findMany({
    select: {
      code: true
    }
  })).map(l => l.code)
  let code = generateCode(codes)

  while (codes.some(s => s === code)) {
    code = generateCode(codes)
  }

  return code
}

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
