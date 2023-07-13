import { Button, Menu, MenuItem } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { useState } from 'react';
import Cookies from 'universal-cookie';

interface Props {
    userName: string
}

export default function AvatarImg(props: Props) {
    const letter = props.userName.slice(0, 1)
    const cookie = new Cookies();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = ()=>{
        cookie.remove('token')
        window.location.reload();
    }

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{ margin: 10 }}
            >
                <Avatar>
                    {letter}
                </Avatar>
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </div>
    )
}