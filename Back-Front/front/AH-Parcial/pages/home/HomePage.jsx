import { useContext, useEffect, useState } from "react";
import { getDietById } from "../../services/diet/dieta.services";
import ItemComponent from "../../components/Lista/Item/ItemComponent";
import * as accountServices from '../../services/account/account.services.js';
import { getRoutineById } from "../../services/routines/routines.services";
import { useProfile } from '../../context/session.context';
import './HomePage.css'
import { useLoading } from "../../context/loading.context";
import SkeletonList from "../../components/Skeleton/Skeleton.list";
function HomePage(){
    const profile = useProfile();
    const { loading, setLoading } = useLoading();
    const [diet, setDiet] = useState(null)
    const [routine, setRoutine] = useState(null)

    useEffect(()=>{
        const getProfilePRoperties = async (profile) => {
            setLoading(true)
            if(profile?.diet){
                const dieta = await getDietById(profile.diet)
                setDiet(dieta)
            }
            if(profile?.routine){
                const rutina = await getRoutineById(profile.routine)
                setRoutine(rutina)
            }
            setLoading(false)
        }

        getProfilePRoperties(profile)
    },[profile])

    return(
        <div className="home-page">
        <h1 className="home-section__h1">Mis planes</h1>
        <div className="home-section">
        <h2>Dietas</h2>
        {
            loading ?
            (<SkeletonList list={['0']}></SkeletonList>)
            :
            diet ? (<ItemComponent item={diet} ruta="diet" entidad="dieta"/>)
            : (
            <div>
                <p className="home-section__p">No posee dietas</p>
                <div className="home-section__button__container">
                    <a className="home-section__button" href="/diet">Seleccionar una</a>
                </div>
            </div>
            )
        }
        </div>

        <div className="home-section">
        <h2>Rutina</h2>
        {
            loading ?
            (<SkeletonList list={['0']}></SkeletonList>)
            :
            routine ? (<ItemComponent item={routine} ruta="routine" entidad="rutina"/>)
            : (
            <div>
                <p className="home-section__p">No posee rutinas</p>
                <div className="home-section__button__container">
                    <a className="home-section__button"href="/routines">Seleccionar una </a>
                    <a className="home-section__button" href="/routines">Crear una</a>
                </div>
            </div>
            )
        }
        </div>
        </div>
    )
}

export default HomePage