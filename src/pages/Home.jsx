// @ts-nocheck
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Grid from '@mui/material/Grid';

import PostsBlock from '../components/PostsBlock';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { fetchTags } from '../redux/slices/posts';

export const Home = () => {
  const dispatch = useDispatch();
  const { tags } = useSelector(state => state.posts);
  const isTagsLoading = tags.status === 'loading';
  React.useEffect(() => {
    dispatch(fetchTags());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Grid container spacing={ 4 }>
        <Grid xs={ 8 } item>
          < PostsBlock />
        </Grid>
        <Grid xs={ 4 } item mt='73px'>
          <TagsBlock items={ tags.items } isLoading={ isTagsLoading } />
          <CommentsBlock
            items={ [
              {
                user: {
                  fullName: 'Вася Пупкин',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'Это тестовый комментарий',
              },
              {
                user: {
                  fullName: 'Иван Иванов',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                },
                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
              },
            ] }
            isLoading={ false }
            children={ undefined }
          />
        </Grid>
      </Grid>
    </>
  );
};
