import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import Login from './Login';
import Editor from './Editor';
import { useUserStore } from '../hooks/userStore';


export default function TemporaryDrawer() {
    const [open, setOpen] = React.useState(false);

    const { user, setUser } = useUserStore();

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const DrawerList = (
        <Box sx={{ width: 450 }} role="presentation" >

            {user ? <Login /> : < Editor />}

        </Box>
    );

    return (
        <div>
            <Button onClick={toggleDrawer(true)}><MenuIcon fontSize="large" /></Button>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div>
    );
}
