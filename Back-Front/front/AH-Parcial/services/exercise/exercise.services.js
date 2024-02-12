function getExercises(){
    return fetch('http://localhost:2023/api/exercises',{
        headers: {
          'auth-token': localStorage.getItem('token')
        }
        })
        .then(response => response.json())
}

function getExercisesById(idExercises){
    return fetch(`http://localhost:2023/api/exercises/${idExercises}`,{
        headers: {
          'auth-token': localStorage.getItem('token')
        }
      })
    .then(response => response.json())
}

function createExercises(exercise){
    return fetch('http://localhost:2023/api/exercises',{
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify(exercise)
    })
    .then(response => response.json())
}

function editExercise(exercise){
  return fetch(`http://localhost:2023/api/exercises/${exercise._id}`,{
      method: 'PUT',
      headers: {
          'Content-type': 'application/json',
          'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify(exercise)
  })
  .then(response => response.json())
}

function deleteExercise(idExercises){
  return fetch(`http://localhost:2023/api/exercises/${idExercises}`,{
      method: 'DELETE',
      headers: {
          'Content-type': 'application/json',
          'auth-token': localStorage.getItem('token')
      }
  })
  .then(response => response.json())
}


export {
    getExercises,
    getExercisesById,
    createExercises,
    editExercise,
    deleteExercise
}