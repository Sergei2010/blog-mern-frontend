// @ts-nocheck
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Post } from './Post';

import { fetchFilterPosts } from '../../redux/slices/filter';

export default function PostInfo({ value }) {
	const [data, setData] = React.useState([]);
	const dispatch = useDispatch();
	const userData = useSelector((state) => state.auth.data);
	//const category = useSelector((state) => state.filters.category);
	//console.log('category:', category);

	const { filterPosts } = useSelector(state => state.filters);

	const isPostsLoading = filterPosts.status === 'loading';

	React.useEffect(() => {
		dispatch(fetchFilterPosts());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const arr = filterPosts.items.slice();
	const sortPopular = (a, b) => b.viewsCount - a.viewsCount;
	const sortDate = (a, b) => new Date(b.createdAt) - new Date(a.createdAt);

	React.useEffect(() => {
		setData(arr.sort((a, b) => {
			return value === '1'
				? sortDate(a, b)
				: sortPopular(a, b);
		}));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filterPosts]);

	return (
		<>
			{ (isPostsLoading ? [...Array(5)] : data)
				.map((obj, index) => isPostsLoading ?
					<Post key={ index } isLoading={ true } />
					:
					<Post
						// @ts-ignore
						id={ obj._id }
						key={ obj._id }
						title={ obj.title }
						imageUrl={ obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : '' }
						user={ obj.user }
						createdAt={ obj.createdAt }
						viewsCount={ obj.viewsCount }
						commentsCount={ 3 }
						tags={ obj.tags }
						isEditable={ userData?._id === obj.user._id }
					/>
				)
			}
		</>
	);
};
