import {User} from "../../../store/types";
import UserItem from "./UserItem/UserItem";

export interface Items {
    users: User[];
    toggleEditPopup(): void;
    toggleDeletePopup(): void;
    setActiveItemId(id: number): void;
}

const UsersList = (props: Items) => {
    const {users, toggleEditPopup, setActiveItemId, toggleDeletePopup} = props;

    return (
        <ul className="users__list">
            {users.map(item => {
                return (
                    <UserItem
                        key={item.id}
                        id={item.id}
                        content={item.content}
                        setActiveItemId={setActiveItemId}
                        toggleEditPopup={toggleEditPopup}
                        toggleDeletePopup={toggleDeletePopup}
                    />
                )
            }).reverse()}
        </ul>
    )
}

export default UsersList;
