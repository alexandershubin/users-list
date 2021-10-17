import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppDispatch, AppState} from "./rootReducer";
import axios from "axios";
import {User, UserInput} from "../types";

interface UsersSliceState {
    users: User[];
    loading: boolean;
}

const apiUrl: string = "http://localhost:3003/users/";

const initialState: UsersSliceState = {
    users: [],
    loading: true,
};

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<User>) => {
            state.users.push(action.payload); // пушит todos через пост запрос
        },

        getUsers: (state, action: PayloadAction<User[]>) => {
            state.users = action.payload; // получает туду через get
        },

        removeUser: (state, action: PayloadAction<number | null>) => {
            state.users = state.users.filter(({id}) => id !== action.payload);
        },

        changeUserString: (state, action: PayloadAction<{data: User, id: number}>) => {
            const userIndex = state.users.findIndex(item => item.id === action.payload.id);
            state.users.splice(userIndex, 1, action.payload.data);
        },

        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
    },
});

export const selectUsers = (state: AppState) => state.users.users; // получаю массив из стора прокидываю его в компонент
export const {
    setUsers,
    getUsers,
    removeUser,
    setLoading,
    changeUserString,
} = usersSlice.actions;

export const saveUser = (content: UserInput) => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.post(apiUrl, {content});
        dispatch(setUsers(response.data));
    } catch (error) {
        console.error(error);
    }
};

export const fetchUsers = () => async (dispatch: AppDispatch) => {
    try {
        const {data} = await axios.get(apiUrl);
        dispatch(getUsers(data));
        dispatch(setLoading(false));
    } catch (error) {
        console.error(error);
        dispatch(setLoading(true));
    }
};

export const changeUserText =
    (content: UserInput, id: number | null) => async (dispatch: AppDispatch) => {
        if (id === null) {
            return;
        }

        try {
            const response = await axios.patch(apiUrl + id, {content});

            dispatch(changeUserString({
                data: response.data,
                id: response.data.id
            }));
        } catch (error) {
            console.error(error);
        }
    };

export const deleteUser = (id: number | null) => async (dispatch: AppDispatch) => {
    try {
        await axios.delete(apiUrl + id, {
            params: {id},
        });
        dispatch(removeUser(id));
    } catch (error) {
        console.error(error);
    }
};
