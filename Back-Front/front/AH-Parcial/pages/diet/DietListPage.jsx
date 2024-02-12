import ListaComponent from "../../components/Lista/ListaComponent";
import {deleteDiet, getAllDiets} from "../../services/diet/dieta.services.js"

import { useEffect, useState } from "react" 

function DietListPage(){
  const [dietas, setDietas] = useState([])

    const handleDelete = (id) => {
      
      deleteDiet(id).then(() => {
          getAllDiets().then(data => {
            setListado({...listado, lista:data})
          })
      });
    }

    useEffect(() => {
      getAllDiets().then(data => {
        setDietas(data)
      })
    }, [])
  
 return <ListaComponent listado={dietas} ruta="diet"  entidad="dieta" deleteFunction={(id)=>handleDelete(id)}/>
}

export default DietListPage