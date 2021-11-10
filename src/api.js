const getData = (property) => {
  return fetch(`http://localhost:3001/api/v1/${property}`)
    .then(response => response.json())
}

const addData = (object, property) => {
  return fetch(`http://localhost:3001/api/v1/${property}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(object)
  })
    .then(response => response.json())
}

export {
  getData,
  addData,
};
