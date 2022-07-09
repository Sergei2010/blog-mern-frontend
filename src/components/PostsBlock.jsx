// @ts-nocheck
import React from 'react';
import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import PostInfo from './Post/PostInfo';

export default function PostsBlock() {

	const { posts } = useSelector(state => state.posts);

	const sortDate = posts.items.slice().sort((a, b) => {
		let dateA = new Date(a.createdAt), dateB = new Date(b.createdAt);
		return dateB - dateA;
	});

	const sortPopular = posts.items.slice().sort((a, b) => {
		let popularA = a.viewsCount, popularB = b.viewsCount;
		return popularB - popularA;
	});

	const [value, setValue] = React.useState('1');
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Box sx={ { width: '100%', typography: 'body1' } }>
			<TabContext value={ value }>
				<Box sx={ { borderBottom: 1, borderColor: 'divider' } }>
					<TabList onChange={ handleChange } aria-label="lab API tabs example">
						<Tab label="Новые" value="1" />
						<Tab label="Популярные" value="2" />
					</TabList>
				</Box>
				<TabPanel value="1"><PostInfo sort={ sortDate } /></TabPanel>
				<TabPanel value="2"><PostInfo sort={ sortPopular } /></TabPanel>
			</TabContext>
		</Box>
	);
}