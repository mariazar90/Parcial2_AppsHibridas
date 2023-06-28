import ListaComponent from "../../components/Lista/ListaComponent";
import { useEffect, useState } from "react" 

function ExerciseListPage(){
    const [ejercicios, setEjercicios] = useState([])

    useEffect(() => {
      fetch('http://localhost:2023/api/exercises',{
        headers: {
          'auth-token': localStorage.getItem('token')
        }
    })
      .then(response => response.json())
      .then(data => {
        setEjercicios(data)
      })
    }, [])
  
    useEffect(() =>{
     
    }, [ejercicios])
  
 return <ListaComponent listado={ejercicios} ruta="exercises"  entidad="dieta"/>
}

export default ExerciseListPage