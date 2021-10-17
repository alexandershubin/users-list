import React, {useState} from "react";
import Button from "../Ui/Button/Button";
import {User, UserInput} from "../../store/types";
import {useDispatch, useSelector} from "react-redux";
import {changeUserText, deleteUser, saveUser} from "../../store/redusers/store";
import {getUsers} from "../../store/redusers/selector";
import UserDeletePopup from "./UserDeletePopup/UserDeletePopup";
import "./UserPopup.scss";

interface PropInput {
    users: User[];
    userId: number | null;
    mode: UserEditMode;
    setMode(mode: UserEditMode): void;
}

export enum UserEditMode {
    None,
    Edit,
    Create,
    Delete
}

const initialUserData: UserInput = {
    name: '',
    surname: '',
    lastName: '',
    email: '',
    login: '',
}

const UserPopup = (props: PropInput) => {
    const {userId, mode, setMode} = props;
    const [disabled, setDisabled] = useState<boolean>(true);
    const dispatch = useDispatch();

    const editedUser = useSelector(getUsers).find(item => item.id === userId)?.content;
    const initialFormState = mode === UserEditMode.Create ? initialUserData : editedUser;
    const [userData, setUserData] = useState<UserInput>(initialFormState as UserInput);
    const {name, surname, lastName, email, login} = userData;

    const formTitle = (mode === UserEditMode.Create) ? 'Создание пользователя'
        : (mode === UserEditMode.Edit) ? 'Редактирование пользователя'
            : (mode === UserEditMode.Delete) && 'Удаление пользователя';


    const editUser = () => {
        dispatch(changeUserText(userData, userId));
        setMode(UserEditMode.None);
    }

    const addUser = () => {
        dispatch(saveUser(userData));
        setMode(UserEditMode.None);
    }

    const checkInputOnEmpty = (obj: UserInput) => {
        const items = Object.values(obj);
        items.filter(item =>  item === '' ? setDisabled(true) : setDisabled(false));
    }

    const onUserInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        setUserData((prev) => ({
            ...prev,
            [name]: value
        }));

        checkInputOnEmpty(userData);
    };

    const deleteUserId = () => {
        dispatch(deleteUser(userId));
        setMode(UserEditMode.None);
    };

    const nonDeleteUserId = () => {
        setMode(UserEditMode.None);
    };

    const closePopup = () => setMode(UserEditMode.None);

    return (
        <>
            <div className="form">
                <div className="form__wrapper">
                    <div className="form__title">
                        <h3 className="form__h3">{formTitle}</h3>
                        {mode === UserEditMode.Delete
                            ? null
                            : <Button handleClick={closePopup} className="form__close"/>}
                    </div>
                    {mode === UserEditMode.Delete
                        ?
                        <UserDeletePopup
                            deleteUserId={deleteUserId}
                            nonDeleteUserId={nonDeleteUserId}
                        />
                        :
                        <>
                            <div className="form__data">
                                <label className="form__label" htmlFor="surname">Фамилия</label>
                                <input
                                    className="form__input"
                                    value={surname}
                                    name="surname"
                                    type="text"
                                    id="surname"
                                    placeholder="Введите фамилию"
                                    onChange={onUserInputChange}
                                />
                                <label className="form__label" htmlFor="name">Имя</label>
                                <input
                                    className="form__input"
                                    value={name}
                                    name="name"
                                    type="text"
                                    id="name"
                                    placeholder="Введите имя"
                                    onChange={onUserInputChange}
                                />
                                <label className="form__label" htmlFor="lastName">Отчество</label>
                                <input
                                    className="form__input"
                                    value={lastName}
                                    name="lastName"
                                    type="text"
                                    id="lastName"
                                    placeholder="Введите отчество"
                                    onChange={onUserInputChange}
                                />
                                <label className="form__label" htmlFor="email">E-mail</label>
                                <input
                                    className="form__input"
                                    value={email}
                                    name="email"
                                    type="email"
                                    id="email"
                                    placeholder="Введите E-mail"
                                    onChange={onUserInputChange}
                                />
                                <label className="form__label" htmlFor="login">Логин</label>
                                <input
                                    className="form__input"
                                    value={login}
                                    name="login"
                                    type="text"
                                    id="login"
                                    placeholder="Введите логин"
                                    onChange={onUserInputChange}
                                />
                            </div>
                            <div className="form__button">
                                {mode === UserEditMode.Create
                                    ? <Button
                                        disabled={disabled}
                                        handleClick={addUser}
                                        className="users__btn users__btn--blue users__btn--form"
                                    >
                                        Создать
                                    </Button>
                                    : <Button
                                        handleClick={editUser}
                                        className="users__btn users__btn--blue users__btn--form"
                                    >
                                        Сохранить
                                    </Button>
                                }
                            </div>
                        </>
                    }
                </div>
            </div>
        </>
    )
}

export default UserPopup;
