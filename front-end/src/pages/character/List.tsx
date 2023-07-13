import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { Character } from "../../components/Character";
import { IconButton, ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { api } from "../../utils/api";

interface Character {
  name: string;
  strength: string;
  dexterity: string;
  constitution: string;
  intelligence: string;
  wisdom: string;
  charisma: string;
  image: string;
  id: string;
}

export function List() {
  const cookie = new Cookies();
  const navigate = useNavigate();

  // const [userId, setUserId] = useState<string>('')
  const [characters, setCharacters] = useState<Character[]>([]);
  const tokenCriptaux = cookie.get('token')
  let replay;

  useEffect(() => {
    if (!tokenCriptaux) {
      alert('Precisa estar logado para acessar essa função')
      navigate('/');
    }

    replay = api.get('/character', {
      headers: {
        Authorization: `Bearer ${tokenCriptaux}`
      }
    }).then((response) => { setCharacters(response.data) })

  }, [characters])

  const handleDelete = async (id:string)=>{
      await api.delete(`/character/${id}`,{
        headers: {
          Authorization: `Bearer ${tokenCriptaux}`
        }
      }).then((response)=> (replay=response,alert('Personagem deletado com sucesso')))
  }

  return (
    <>
      <ImageList sx={{ width: '90%', margin: 'auto' }}>
        {characters.map((character) => {
          return (
            <ImageListItem key={character.name}
              sx={{ margin: 'auto', maxHeight: 800 }}
            >
              <img
                src={`${character.image}`}
                srcSet={`${character.image}`}
                alt={character.name}
                loading="lazy"
                style={{ backgroundSize: 'contain', maxHeight: 800, backgroundPosition: 'top' }}
              />
              <ImageListItemBar
                title={character.name}
                subtitle={`
                        Strength: ${character.strength}
                        Dexterity: ${character.dexterity}
                        Constitution: ${character.constitution}
                        Intelligence: ${character.intelligence}
                        Wisdom: ${character.wisdom}
                        Charisma: ${character.charisma}
                        `}
                actionIcon={
                  <>
                    <Link to={`/character/${character.id}`}>
                      <IconButton
                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                        aria-label={`info about ${character.name}`}
                      >
                        <EditIcon />
                      </IconButton>
                    </Link>
                    <IconButton
                      sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                      aria-label={`info about ${character.name}`}
                      onClick={()=>{handleDelete(character.id)}}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                }
              />
            </ImageListItem>
          )
        })}
      </ImageList>
    </>
  )
}