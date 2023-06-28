function getRoutines(){
    return fetch('http://localhost:2023/api/routines',{
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

export {
    getRoutines,
    getRoutineById
}