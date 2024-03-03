import { useEffect, useState } from "react"
import './BloqueComponent.css'

function Bloque({item, index, deleteItem, editItem}) {
    const [days, setDays] = useState ('')
    const [exercises, setExercises] = useState ('')

    const getDays = () =>{
        const parseDays = item.days.reduce((a,b)=>a+', '+b);
        setDays(parseDays)
    }
    const getExercises = () =>{
        const parseExercises = item.exercises.reduce((a,b)=>{
            return {name:a.name+', '+b.name}
        });
        setExercises(parseExercises.name)
    }
    
    useEffect(()=>{
        if(item.days) getDays()
        if(item.exercises) getExercises()
    },[item])

    return (
        <li key={index}>
            <p>{days}</p>
            <p>{exercises}</p>
            <button type="button" onClick={deleteItem}>borrar</button>
            <button type="button" onClick={editItem}>Editar</button>
        </li>
    )
}


export default Bloque