function getAllDiets(){
  return fetch(`http://localhost:2023/api/diet`,{
      headers: {
        'auth-token': localStorage.getItem('token')
      }
    })
  .then(response => response.json())
}

function getDietById(idDiet){
    return fetch(`http://localhost:2023/api/diet/${idDiet}`,{
        headers: {
          'auth-token': localStorage.getItem('token')
        }
      })
    .then(response => response.json())
}

function createDiet(diet){
  return fetch('http://localhost:2023/api/diet',{
      method: 'POST',
      headers: {
          'Content-type': 'application/json',
          'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify(diet)
  })
  .then(response => response.json())
}

function editDiet(diet){
  return fetch(`http://localhost:2023/api/diet/${diet._id}`,{
      method: 'PUT',
      headers: {
          'Content-type': 'application/json',
          'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify(diet)
  })
  .then(response => response.json())
}

function deleteDiet(idDiet){
  return fetch(`http://localhost:2023/api/diet/${idDiet}`,{
      method: 'DELETE',
      headers: {
          'Content-type': 'application/json',
          'auth-token': localStorage.getItem('token')
      }
  })
  .then(response => response.json())
}

export {
    getAllDiets,
    getDietById,
    createDiet,
    editDiet,
    deleteDiet
}