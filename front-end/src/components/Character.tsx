import { ImageListItem, ImageListItemBar } from "@mui/material";

interface Props{
    name: string;
    strength: string;
    dexterity: string;
    constitution: string;
    intelligence: string;
    wisdom: string;
    charisma: string;
    image: string;
}


export function Character(props :Props) {
    return (
        <>
        <ImageListItem key={props.name}>
          <img
            src={props.image}
            alt={props.name}
            loading="lazy"
          />
          <ImageListItemBar
            title={props.name}
            // subtitle={}
          />
        </ImageListItem>
        </> 
    )

}