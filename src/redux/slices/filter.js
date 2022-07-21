// @ts-nocheck
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchFilterPosts = createAsyncThunk('filters/fetchFilterPosts', async () => {
	const { data } = await axios.get('/filterPosts');
	return data;
});

const initialState = {
	category: {
		categoryId: '1',
		sort: 'Новые',
		sortProperty: 'createdAt',
	},
	filterPosts: {
		items: [],
		status: 'loading',
	},
};

const filterSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		setCategory(state, action) {
			state.category.categoryId = action.payload.categoryId;
			state.category.sort = action.payload.sort;
			state.category.sortProperty = action.payload.sortProperty;
			console.log('setCategory action', action);
		},
		setFilters(state, action) {
			state.category.categoryId = action.payload.categoryId;
			state.category.sortProperty = action.payload.sortProperty;
			console.log('setFilters action:', action);
		},
	},
	extraReducers: {
		// Получение статей
		[fetchFilterPosts.pending]: (state) => {
			state.filterPosts.items = [];
			state.filterPosts.status = 'loading';
		},
		[fetchFilterPosts.fulfilled]: (state, action) => {
			state.filterPosts.items = action.payload;
			state.filterPosts.status = 'loaded';
		},
		[fetchFilterPosts.rejected]: (state) => {
			state.filterPosts.items = [];
			state.filterPosts.status = 'error';
		},
	}
});

export const { setCategory, setFilters } = filterSlice.actions;

export const filterReducer = filterSlice.reducer;