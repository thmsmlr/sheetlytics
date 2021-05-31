export async function get(req) {
  const email = req.query.get('email');
  if (!email) {
    return {
      body: 'Invalid email',
      status: 400,
    };
  }

  let resp = await fetch(
    'https://docs.google.com/forms/u/1/d/e/1FAIpQLSd7VXRz9BHGrSHpVRbP1vUsb1-QLrcReWlFbIJAfrNy3VeQlQ/formResponse',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'entry.898151591=' + email,
    }
  );

  if (!resp.ok) {
    return {
      body: 'Uhoh something went wrong:\n' + (await resp.text()),
      status: 500,
    };
  }

  return {
    status: 200,
    body: { success: true },
  };
}
