// @ts-nocheck
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Post } from './index';

import { fetchPosts } from '../../redux/slices/posts';

export default function PostInfo(sort) {

	const [data, setData] = React.useState([]);
	const dispatch = useDispatch();
	const userData = useSelector((state) => state.auth.data);
	const { posts } = useSelector(state => state.posts);
	const isPostsLoading = posts.status === 'loading';

	React.useEffect(() => {
		dispatch(fetchPosts());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	React.useEffect(() => {
		setData(sort);
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
			{ console.log(data) }
		</>
	);
}