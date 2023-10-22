import { createSlice } from "@reduxjs/toolkit";
const filterSlice = createSlice({

    name: "filter",
    // Початковий стан редюсера слайсу
    initialState: '',
    // Об'єкт редюсерів
    reducers: {
        changeFilter(state, action) {
            return `${action.payload}`
        },
        filterByName(state, action) { },
    },
});
export const { changeFilter, filterByName } = filterSlice.actions;
// Редюсер слайсу
export const filterReducer = filterSlice.reducer;