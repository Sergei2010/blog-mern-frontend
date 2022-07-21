// @ts-nocheck
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCategory } from '../redux/slices/filter';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import PostInfo from './Post/PostInfo';

export default function PostsBlock() {

	const dispatch = useDispatch();
	const categoryId = useSelector(state => state.filters.category.categoryId);
	//console.log('categoryId:', categoryId);

	const onChangeCategoryId = (event, id) => {
		id === '1'
			? dispatch(setCategory({
				categoryId: String(id),
				sort: 'Новые',
				sortProperty: 'createdAt',
			}))
			: dispatch(setCategory({
				categoryId: String(id),
				sort: 'Популярные',
				sortProperty: 'viewsCount',
			}));
	};

	return (
		<Box sx={ { width: '100%', typography: 'body1' } }>
			<TabContext value={ categoryId }>
				<Box sx={ { borderBottom: 1, borderColor: 'divider' } }>
					<TabList onChange={ onChangeCategoryId } aria-label="lab API tabs example">
						<Tab label="Новые" value='1' />
						<Tab label="Популярные" value='2' />
					</TabList>
				</Box>
				<TabPanel value='1'><PostInfo value='1' /></TabPanel>
				<TabPanel value='2'><PostInfo value='2' /></TabPanel>
			</TabContext>
		</Box>
	);
}