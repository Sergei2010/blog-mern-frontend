// @ts-nocheck
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { SideBlock } from '../../components/SideBlock';
import { fetchFilterPosts } from '../../redux/slices/filter';
//import Post from '../../components/Post/PostInfo';

export default function TagsList() {
	const [data, setData] = React.useState([]);
	const { tagName } = useParams();
	const dispatch = useDispatch();
	const { filterPosts } = useSelector(state => state.filters);
	//const userData = useSelector((state) => state.auth.data);

	React.useEffect(() => {
		dispatch(fetchFilterPosts());
		//console.log('posts:', posts);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const arr = filterPosts.items.slice();
	console.log('arr:', arr);
	//const isPostsLoading = filterPosts.status === 'loading';

	React.useEffect(() => {
		//dispatch(fetchPosts());
		setData(arr.filter((item) => (item.tags).includes(tagName)));
		console.log('data:', data);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filterPosts]);


	return (
		<SideBlock title={ `# ${tagName}` } />
	);
};

