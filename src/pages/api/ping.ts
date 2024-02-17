export async function GET () {
  const ms = Math.random()
  return new Response(
    JSON.stringify({
      message: 'pong',
      ms
    })
  )
}
