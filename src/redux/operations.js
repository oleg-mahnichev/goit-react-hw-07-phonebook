import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "https://652282b4f43b1793841493ca.mockapi.io";
const CONTACTS_ENDPOINT = "/contacts";

axios.defaults.baseURL = BASE_URL;

export const fetchContacts = createAsyncThunk("contacts/fetchAll", async (_, thunkAPI) => {
    try {
        const response = await axios.get(CONTACTS_ENDPOINT);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const addContact = createAsyncThunk("contacts/addContact", async (payload, thunkAPI) => {
    try {
        await axios.post(CONTACTS_ENDPOINT, payload);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const deleteContact = createAsyncThunk("contacts/deleteContact", async (payload, thunkAPI) => {
    try {
        await axios.delete(`${CONTACTS_ENDPOINT}/${payload}`);
        return payload;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});
