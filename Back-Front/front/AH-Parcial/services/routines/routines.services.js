function getRoutines(){
    return fetch('http://localhost:2023/api/routines',{
        method: 'GET',
        headers: {
            'auth-token': localStorage.getItem('token')
        }
    })
        .then(response => response.json())
}

function getRoutineById(idRoutine){
    return fetch(`http://localhost:2023/api/routines/${idRoutine}`,{
        headers: {
            'auth-token': localStorage.getItem('token')
        }
    }).then(response => response.json())
}

function createRoutines(routine){
    return fetch('http://localhost:2023/api/routines',{
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify(routine)
    })
        .then(response => response.json())
}

function editRoutines(routine){
    return fetch(`http://localhost:2023/api/routines/${routine._id}`,{
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
            'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify(routine)
    })
        .then(response => response.json())
}

function deleteRoutine(idRoutine){
  return fetch(`http://localhost:2023/api/routines/${idRoutine}`,{
      method: 'DELETE',
      headers: {
          'Content-type': 'application/json',
          'auth-token': localStorage.getItem('token')
      }
  })
  .then(response => response.json())
}

export {
    editRoutines,
    getRoutines,
    getRoutineById,
    createRoutines,
    deleteRoutine
}