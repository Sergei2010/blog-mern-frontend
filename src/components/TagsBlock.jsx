// @ts-nocheck
import React from "react";

//import List from "@mui/material/List";
//import ListItem from "@mui/material/ListItem";
//import ListItemButton from "@mui/material/ListItemButton";
//import ListItemIcon from "@mui/material/ListItemIcon";
//import TagIcon from "@mui/icons-material/Tag";
//import ListItemText from "@mui/material/ListItemText";
//import Skeleton from "@mui/material/Skeleton";

import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Tab from '@mui/material/Tab';
//import TabPanel from '@mui/lab/TabPanel';

import { SideBlock } from "./SideBlock";
//import PostInfo from '../components/Post/PostInfo';

export const TagsBlock = ({ items, isLoading = true }, a11yProps) => {
  const [value, setValue] = React.useState('3');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <SideBlock title="Тэги">
      {/* <List>
        { (isLoading ? [...Array(5)] : items).map((name, i) => (
          <a
            key={ i }
            style={ { textDecoration: "none", color: "black" } }
            href={ `/tags/${name}` }
          >
            <ListItem key={ i } disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <TagIcon />
                </ListItemIcon>
                { isLoading ? (
                  <Skeleton width={ 100 } />
                ) : (
                  <ListItemText primary={ name } />
                ) }
              </ListItemButton>
            </ListItem>
          </a>
        )) }
      </List> */}
      <Box sx={ { width: '100%', typography: 'body1' } }>
        <TabContext value={ value }>
          <Box sx={ { borderBottom: 1, borderColor: 'divider' } }>
            <TabList onChange={ handleChange } aria-label='lab API tabs example'>
              <Tab label='Новые' value='3' />
              <Tab label='Популярные' value='4' />
            </TabList>
          </Box>
          {/* <TabPanel value='1'><PostInfo value='1' /></TabPanel>
          <TabPanel value='2'><PostInfo value='2' /></TabPanel> */}
        </TabContext>
      </Box>
    </SideBlock >
  );
};
