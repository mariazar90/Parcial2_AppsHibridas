function getDietById(idDiet){
    return fetch(`http://localhost:2023/api/diet/${idDiet}`,{
        headers: {
          'auth-token': localStorage.getItem('token')
        }
      })
    .then(response => response.json())
}

export {
    getDietById
}