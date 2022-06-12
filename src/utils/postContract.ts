export default async (payload: object)=>{
    const response = await fetch('/api/contract', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
    if (response.status !== 201) {
        throw new Error(response.statusText)
    }
    return response.json();
}
