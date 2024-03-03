import { useEffect, useState, useCallback } from "react"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './ProfilePage.css'
import { updateProfile } from "../../services/profile/profile.services";
import { useSession } from '../../context/session.context';
import { getRoutineById } from "../../services/routines/routines.services";
import { getDietById } from "../../services/diet/dieta.services";
import Avatar from '@mui/material/Avatar';
import { useSnackbar } from "../../context/snackbar.context";

function ProfilePage(){

    const {openSnackbar} = useSnackbar()
    const [newProfile, setNewProfile] = useState({
        avatar:'',
        name: ''
    });
    const [asignaciones, setAsignaciones] = useState({
        rutina:'',
        dieta: ''
    });
    const [editar, setEditar] = useState(false);
    const {profile, updateProfileContext} = useSession();

    const handleEdit = () => {

        setNewProfile({
            ...newProfile,
            ...profile
        })
        setEditar(true)
    }

    const handleConfirm = () => {
        const {avatar,email,name,username } = newProfile
        setEditar(false)
        updateProfile({email,name,username}).then((response)=>{
            updateProfileContext(response)
        })
    }

    const onChangeInput = (event) => {
        setNewProfile({
            ...newProfile,
            [event.target.name]: event.target.value
        })
    }

    const onChangeAvatar = (event) => {
        const [file] = event.target.files
        if (file) {
            setNewProfile({...newProfile, avatar: URL.createObjectURL(file)})
        }
      }

    useEffect(()=>{

        const getAsignaciones = async () => {
            if(profile){
                const nuevaAsignacion = {rutina:'',dieta:''}
                if(profile.routine){
                    const {name:rutina} = await getRoutineById(profile.routine)
                    nuevaAsignacion.rutina = rutina;
                }

                if(profile.diet){
                    const {name:dieta} = await getDietById(profile.diet)
                    nuevaAsignacion.dieta = dieta
                }
                
                setAsignaciones(nuevaAsignacion)
            }
        }

        getAsignaciones().catch(error => {
            openSnackbar(error.message,'error');
        })

    },[profile])

    return(
        <div className='diet-page'>
        {
            profile ?
                !editar? (<>
                        <div className='profile-page__header'>
                            {
                                /*
                                <input type="file" accept="image/png, image/jpeg"/>
                                */
                            }
                            <Avatar alt={profile.name} src={profile.avatar} sx={{minWidth: 150, minHeight: 150}}/>
                            {profile.name? 
                                <h1 className="profile-page__name">{profile.name}</h1>
                                :<p className="profile-span">-</p>
                            }
                        </div>    
                        <div className='profile-page__body'>
                            <p className="profile-page__email"><span>Email: </span>{profile.email}</p>
                            <p className="profile-page__username"><span>Username: </span>{profile.username}</p>
                            <p className="profile-page__routine"><span>Rutina: </span>{asignaciones.rutina}</p>
                            <p className="profile-page__routine"><span>Dieta: </span>{asignaciones.dieta}</p>
                        </div>
                        </>
                ):
                (
                    <>
                        <div className='profile-page__header'>
                            <div className="profile-edit_avatar">
                                <input type="file" accept="image/png, image/jpeg" onChange={onChangeAvatar}/>
                                <Avatar src={newProfile.avatar} sx={{minWidth: 150, minHeight: 150}}/>
                                
                            </div>
                            <TextField name="name" value={newProfile.name} id="outlined-basic" label="Nombre" variant="standard" onChange={onChangeInput}/>
                        </div>    
                        <div className='profile-page__body'>
                            <p className="profile-page__email"><span>Email: </span><TextField name="email" value={newProfile.email} id="outlined-basic" variant="standard" onChange={onChangeInput}/></p>
                            <p className="profile-page__username"><span>Username: </span>{profile.username}</p>
                            <p className="profile-page__routine"><span>Rutina: </span>{asignaciones.rutina}</p>
                            <p className="profile-page__routine"><span>Dieta: </span>{asignaciones.dieta}</p>
                        </div>
                    </>
                )
            :
            (
                <div>No posee perfil asociado</div>
            )
            
        }
            <div className='profile-page__acction'>
                <Button variant="contained" disabled={editar} onClick={handleEdit}>Editar</Button>
                <Button variant="contained" disabled={!editar} onClick={handleConfirm}>Confirmar</Button>
            </div>
        </div>
    )
}

export default ProfilePage