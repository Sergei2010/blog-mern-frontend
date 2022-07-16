import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	categoryId: 1,
	sort: 'Новые',
	sortProperty: 'createdAt',
};

const filterSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		setCategoryId(state, action) {
			console.log('setCategoryId action', action);
			state.categoryId = action.payload;
		}
	},
});

export const { setCategoryId } = filterSlice.actions;

export const filterReducer = filterSlice.reducer;