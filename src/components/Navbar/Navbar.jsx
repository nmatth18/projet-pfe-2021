import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import {authService} from "services/auth.service";
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import PeopleIcone from "@mui/icons-material/People"
import LogOutIcone from "@mui/icons-material/Logout"
import HomeIcone from "@mui/icons-material/Home"
import AdIcone from "@mui/icons-material/Add"
import UserIcone from "@mui/icons-material/EmojiPeople"
import AdminIcone from "@mui/icons-material/AdminPanelSettings"
import {NavLink, useHistory} from "react-router-dom";
import {Nav} from "react-bootstrap";

export default function TemporaryDrawer({loggedIn, roleCurrentUser}) {
  const [state, setState] = useState({
    left: false,
  });
  const currentUser = authService.getCurrentUser();
  const history = useHistory();
 
  let isAdmin=false
  

  if(roleCurrentUser==="admin")
      isAdmin=true

  const handleLogout=()=>{
    authService.logout();
    history.push("/login");
  }

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  if(loggedIn===true){    

       const list = (anchor) => ( 
           
            <Box
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
            >
         
            <List>
                <ListItem button>
                    <ListItemIcon>
                        <HomeIcone/>
                    </ListItemIcon>
                    <NavLink to="/home" className="navBtn nav-link">Accueil</NavLink> 
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <PeopleIcone/>
                    </ListItemIcon>
                    <NavLink to={`/profile/${currentUser.email}`} className="navBtn nav-link">Profile</NavLink> 
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <AdIcone/>
                    </ListItemIcon>
                    <NavLink to="/ajouter" className="navBtn nav-link">Créer une annonce</NavLink> 
                </ListItem>
                {isAdmin &&
                <ListItem button>
                    <ListItemIcon>
                        <AdminIcone/>
                    </ListItemIcon>
                    <NavLink to="/admin" className="navBtn nav-link">Zone administrative</NavLink> 
                </ListItem>
                }
            </List>
            <Divider/>
            <List>
            <ListItem button>
                <ListItemIcon>
                    <LogOutIcone/>
                </ListItemIcon>
                <Nav.Item><Nav.Link  className="navBtn nav-link" onClick={handleLogout}>Deconnexion</Nav.Link></Nav.Item>
            </ListItem>
            <ListItem>
                <ListItemIcon>
                    <UserIcone/>
                </ListItemIcon>
                <Nav.Link eventKey="disabled" disabled>  {currentUser.email}  </Nav.Link>
            </ListItem>
            </List>
            </Box>
        );
    
        return (
            <div>
            {['Menu'].map((anchor) => (
                <React.Fragment key={anchor}>
                <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
                <Drawer
                    anchor={anchor}
                    open={state[anchor]}
                    onClose={toggleDrawer(anchor, false)}
                >
                    {list(anchor)}
                </Drawer>
                </React.Fragment>
            ))}
            </div>
        );
    }else{
        return(
            <></>
        )
    }
}

