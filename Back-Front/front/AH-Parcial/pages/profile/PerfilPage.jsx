import './ProfilePage.css'
import { useProfile } from '../../context/session.context';
import Avatar from '@mui/material/Avatar';

function ProfilePage(){
    const profile = useProfile();
    return(
        <div className='diet-page'>
        {
            profile ?
            (
                <div>
                    <div className='profile-page__header'>
                        <Avatar alt={profile.name} src={profile.avatar} sx={{minWidth: 150, minHeight: 150}}/>
                        <h1 className="profile-page__name">{profile.name}</h1>
                    </div>    
                    <div className='profile-page__body'>
                        <p className="profile-page__email"><span>Email: </span>{profile.email}</p>
                        <p className="profile-page__username"><span>Username: </span>{profile.username}</p>
                        <p className="profile-page__routine"><span>Rutina: </span>{profile.username}</p>
                        <p className="profile-page__routine"><span>Dieta: </span>{profile.username}</p>
                    </div>
                </div>
            ) :
            (
                <div>hola</div>
            )
        }
        </div>
    )
}

export default ProfilePage