import Button from "../../Ui/Button/Button";
import React from "react";
import {UserEditMode} from "../UserPopup";

interface PropDeletePopup {
    nonDeleteUserId(mode: UserEditMode): void;
    deleteUserId(mode: UserEditMode): void;
}

const UserDeletePopup = (props: PropDeletePopup) => {
    const {deleteUserId, nonDeleteUserId} = props;

    return (
        <>
            <p className="form__description">Удалить выбранного пользователя?</p>
            <div className="form__button">
                <Button
                    handleClick={nonDeleteUserId}
                    className="users__btn users__btn--cancel users__btn--form"
                >
                    Отменить
                </Button>
                <Button
                    handleClick={deleteUserId}
                    className="users__btn users__btn--blue users__btn--form"
                >
                    Удалить
                </Button>
            </div>
        </>
    )
}

export default UserDeletePopup;
