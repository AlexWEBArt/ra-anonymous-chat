export async function addMessage(apiURL, body) {
    const request = fetch(`${apiURL}messages/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });

    const result = await request;

    if (!result.ok) {
      console.error('Ошибка');

      return;
    }

}

export async function reqestFrom(apiURL, id) {
  const query = `?from=${encodeURIComponent(id)}`;

    const request = fetch(`${apiURL}messages${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await request;

    if (!result.ok) {
      console.error('Ошибка');

      return;
    }

    return await result.json();
}
