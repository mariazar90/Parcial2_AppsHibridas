import * as React from 'react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSession } from '../../context/session.context';

import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
//import Logout from '@mui/icons-material/Logout';
import './MainHeader.css'

function MainHeader() {
    let location = useLocation();
    const { profile, onLogOut } = useSession();
    const [ activeItem, setActiveItem ] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    useEffect(()=>{
        setActiveItem(location.pathname)
    },[])
   return (
    <header className='header-list'>
        <h1>GoFit</h1>
        
        <nav className='nav-list'>
            <ul className='nav-list_item' >
                <li><a className={activeItem == '/'? 'menu-active':''} href="/">Home</a></li>
                <li><a className={activeItem == '/diet'? 'menu-active':''} href="/diet">Dietas</a></li>
                <li><a className={activeItem == '/exercises'? 'menu-active':''} href="/exercises">Ejercicios</a></li>
                <li><a className={activeItem == '/routines'? 'menu-active':''} href="/routines">Rutinas</a></li>
                <li>
                    <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{ width: 32, height: 32 }} alt={profile.name} src={profile.avatar} />
                    </IconButton>
                    </Tooltip>
                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                                },
                                '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem onClick={handleClose}>
                            <a href="/profile">Perfil</a>
                        </MenuItem>
                        <MenuItem onClick={onLogOut}>
                            {/*<ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>*/}
                            Cerrar sesion
                        </MenuItem>
                    </Menu>
                </li>
            </ul>
        </nav>
    </header>
   )
}
export default MainHeader