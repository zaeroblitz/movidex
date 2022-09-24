import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  genreIdOrCategoryName: 'popular',
  page: 1,
  searchQuery: '',
};

export const genreOrCategory = createSlice({
  name: 'genreOrCategory',
  initialState,
  reducers: {
    selectGenreOrCategory: (state, action) => {
      state.genreIdOrCategoryName = action.payload;
      state.searchQuery = '';
    },
    searchMovie: (state, action) => {
      state.searchQuery = action.payload;
    },
    resetQueryAndGenreOrCategory: (state) => {
      state.searchQuery = '';
      state.genreIdOrCategoryName = '';
    },
    setPrevPage: (state) => {
      if (state.page !== 1) {
        state.page -= 1;
      }
    },
    setNextPage: (state, action) => {
      if (state.page !== action.payload) {
        state.page += 1;
      }
    },
    resetPage: (state) => {
      state.page = 1;
    },
  },
});

export const { selectGenreOrCategory, searchMovie, setPrevPage, setNextPage, resetPage, resetQueryAndGenreOrCategory } = genreOrCategory.actions;
export default genreOrCategory.reducer;
