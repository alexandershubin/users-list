import React from 'react';
import Users from "./components/Users/Users";
import Header from "./components/Header/Header";
import Menu from "./components/Menu/Menu";

function App() {
    return (
        <div className="App">
            <Header/>
            <div className="main">
                <Menu/>
                <Users/>
            </div>
        </div>
    );
}

export default App;
