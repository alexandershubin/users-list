import "./Menu.scss";

const Menu = () => {
    return (
        <>
            <input type="checkbox" id="nav-toggle" hidden/>
            <nav className="nav">
                <label htmlFor="nav-toggle" className="nav__toggle"/>
                <ul className="nav__list">
                    <li className="nav__item">
                        {/*<a className="nav__link" href="#">Ползователи</a>*/}
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Menu;
