// @ts-nocheck
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import Grid from '@mui/material/Grid';

import PostsBlock from '../components/PostsBlock';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { fetchTags } from '../redux/slices/posts';
import { setFilters } from '../redux/slices/filter';

export const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tags } = useSelector(state => state.posts);
  const category = useSelector(state => state.filters.category);

  const isTagsLoading = tags.status === 'loading';
  const isMounted = React.useRef(false);

  // если это был первый рендер, то проверяем url-строку и сохраняем данные в redux
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      dispatch(setFilters({
        ...params,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    dispatch(fetchTags());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // понимаем, что это уже непервый рендер и вшиваем url-строку данные из filterSlice
  // лайфхак для исключения первого рендера
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: category.sortProperty,
        categoryId: category.categoryId,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

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
