import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

interface Props {
    userName : string
}

export default function AvatarImg(props: Props){
    const letter = props.userName.slice(0,1)
    return (
        <>
        <Stack direction="row" spacing={2}>
            <Avatar>
            {letter}
            </Avatar>
        </Stack>
        </>
    )
}