import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ads: [],
  favorites: [],
};

const adsSlice = createSlice({
  name: "ads",
  initialState,
  reducers: {
    setAds: (state, action) => {
      state.ads = action.payload;
    },
    toggleFavorite: (state, action) => {
      const adID = action.payload;
      const isFavorite = state.favorites.includes(adID);
      if (!isFavorite) {
        state.favorites.push(adID);
      } else {
        state.favorites = state.favorites.filter((id) => id !== adID);
      }
    },
  },
});

export const { setAds, toggleFavorite } = adsSlice.actions;

export default adsSlice.reducer;
