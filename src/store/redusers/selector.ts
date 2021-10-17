import { createSelector } from "reselect";
import {AppState} from "./rootReducer";

export const getUsersStore = (state: AppState) => state.users;

export const getUsers = createSelector(getUsersStore, users => users.users);

export const getLoading = createSelector(getUsersStore, (data) => {
    return data?.loading;
});
