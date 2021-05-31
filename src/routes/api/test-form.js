let aSleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function post(req) {
  let data = Object.fromEntries(req.body);

  if (data.lastName.toLowerCase() !== 'millar')
    return {
      status: 400,
      body: {
        error: 'Only millars are allowed to fill out the form',
        errorFields: {
          lastName: 'Invalid last name',
        },
      },
    };

  console.log(req.body.get('firstName'));
  await aSleep(1500);
  return {
    body: {
      succes: true,
    },
  };
}

export async function get(req) {
  let data = Object.fromEntries(req.query);

  return {
    body: {
      succes: true,
    },
  };
}
