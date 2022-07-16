// @ts-nocheck
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Post } from './Post';

import { fetchPosts } from '../../redux/slices/posts';

export default function PostInfo({ value }) {
	const [data, setData] = React.useState([]);
	const dispatch = useDispatch();
	const userData = useSelector((state) => state.auth.data);
	const { posts } = useSelector(state => state.posts);
	const isPostsLoading = posts.status === 'loading';

	React.useEffect(() => {
		dispatch(fetchPosts());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const arr = posts.items.slice();
	const sortPopular = (a, b) => b.viewsCount - a.viewsCount;
	const sortDate = (a, b) => new Date(b.createdAt) - new Date(a.createdAt);

	React.useEffect(() => {
		setData(arr.sort((a, b) => {
			return value === '1'
				? sortDate(a, b)
				: sortPopular(a, b);
		}));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [posts]);

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
