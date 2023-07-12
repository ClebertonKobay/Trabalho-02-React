import Avatar from '@mui/material/Avatar';

interface Props {
    userName : string
}

export default function AvatarImg(props: Props){
    const letter = props.userName.slice(0,1)
    return (
        <>
            <Avatar
                sx={{
                    margin:10
                }}
            >
                {letter}
            </Avatar>
        </>
    )
}