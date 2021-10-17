import {User, UserInput} from "../../../../store/types";
import Button from "../../../Ui/Button/Button";

interface itemProps extends User {
    content: UserInput
    toggleEditPopup(): void;
    toggleDeletePopup(): void;
    setActiveItemId(id: number): void;
}

const UserItem = (props: itemProps) => {
    const {toggleEditPopup, setActiveItemId, toggleDeletePopup, content, id} = props;

    const openEditPopup = () => {
        toggleEditPopup();
        setActiveItemId(id);
    }

    const openDeletePopup = () => {
        toggleDeletePopup();
        setActiveItemId(id);
    }

    return (
        <li className="users__item">
            <span className="users__span">{content.surname}</span>
            <span className="users__span">{content.name}</span>
            <span className="users__span">{content.lastName}</span>
            <span className="users__span">{content.email}</span>
            <span className="users__span">{content.login}</span>
            <Button className="item-btn item-btn--edit" handleClick={openEditPopup}/>
            <Button className="item-btn item-btn--dlt" handleClick={openDeletePopup}/>
        </li>
    )
}

export default UserItem;
