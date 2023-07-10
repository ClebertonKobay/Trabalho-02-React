import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import {GroupAdd, Person4} from '@mui/icons-material';
import { Link } from "react-router-dom";

export default function Root(){
    return(
      <>
        <Box>
          <List>
            <ListItem>
              <ListItemButton>
                <ListItemIcon >
                <GroupAdd />
                </ListItemIcon>
                <ListItemText>
                  <Link to={`character/create`}>Criar um Personagem</Link>
                </ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton>
                <ListItemIcon >
                <Person4 />
                </ListItemIcon>
                <ListItemText>
                  <Link to={`character/list`}>Listar os seus Personagens</Link>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          </List>
        </Box>

      </>
    )
}