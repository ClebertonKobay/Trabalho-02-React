import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { GroupAdd, Person4 } from '@mui/icons-material';
import { Link } from "react-router-dom";

export default function Root() {
  return (
    <>
      <Box>
        <List>
          <ListItem>
            <Link to={`character/create`}>
              <ListItemButton>
                <ListItemIcon >
                  <GroupAdd />
                </ListItemIcon>
                <ListItemText>
                  Criar um Personagem
                </ListItemText>
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem>
            <Link to={`character/list`}>
              <ListItemButton>
                <ListItemIcon >
                  <Person4 />
                </ListItemIcon>
                <ListItemText>
                  Listar os seus Personagens
                </ListItemText>
              </ListItemButton>
            </Link>
          </ListItem>
        </List>
      </Box>

    </>
  )
}