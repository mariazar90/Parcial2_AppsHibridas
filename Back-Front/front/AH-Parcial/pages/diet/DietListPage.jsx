import ListaComponent from "../../components/Lista/ListaComponent";
import { useEffect, useState } from "react" 

function DietListPage(){
    const [dietas, setDietas] = useState([])

    useEffect(() => {
      fetch('http://localhost:2023/api/diet',{
        headers: {
          'auth-token': localStorage.getItem('token')
        }
    })
      .then(response => response.json())
      .then(data => {
        setDietas(data)
      })
    }, [])
  
    useEffect(() =>{
     
    }, [dietas])
  
 return <ListaComponent listado={dietas} ruta="diet" entidad="dieta"/>
}

export default DietListPage