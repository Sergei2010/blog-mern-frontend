import { configureStore } from '@reduxjs/toolkit';
import { postsReducer } from './slices/posts';
import { authReducer } from './slices/auth';
import { filterReducer } from './slices/filter';

const store = configureStore({
	reducer: {
		posts: postsReducer,
		auth: authReducer,
		filters: filterReducer,
	}
});

export default store;