export function handleError (error: unknown) {
  return new Response(JSON.stringify({
    message: error instanceof Error ? error.message : 'Have you made a mistake when making the request?'
  }), {
    status: 400,
    statusText: 'bad request',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
