import Button from "../Ui/Button/Button";
import "./Users.scss";
import UsersList from "./UsersList/UsersList";
import UserPopup, {UserEditMode} from "../UserPopup/UserPopup";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchUsers} from "../../store/redusers/store";
import {getUsers} from "../../store/redusers/selector";

const Users = () => {
    const users = useSelector(getUsers);
    const dispatch = useDispatch();

    const [editMode, setEditMode] = useState<UserEditMode>(UserEditMode.None);
    const [activeItemId, setActiveItemId] = useState<number | null>(null);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    return (
        <div className="users">
            <div className="container">
                {editMode !== UserEditMode.None &&
                <UserPopup
                  userId={activeItemId}
                  users={users}
                  mode={editMode}
                  setMode={setEditMode}
                />
                }

                <div className="users__header">
                    <h2 className="users__h2">Пользователи</h2>
                    <Button className="users__btn users__btn--add users__btn--blue"
                            handleClick={() => setEditMode(UserEditMode.Create)}>Добавить</Button>
                </div>

                    <div className="users__item users__item--title">
                        <span className="users__span users__span--bold">Фамилия</span>
                        <span className="users__span users__span--bold">Имя</span>
                        <span className="users__span users__span--bold">Отчество</span>
                        <span className="users__span users__span--bold">E-mail</span>
                        <span className="users__span users__span--bold">Логин</span>
                    </div>

                    <UsersList
                        users={users}
                        setActiveItemId={setActiveItemId}
                        toggleEditPopup={() => setEditMode(UserEditMode.Edit)}
                        toggleDeletePopup={() => setEditMode(UserEditMode.Delete)}
                    />
            </div>
        </div>
    )
}

export default Users;
