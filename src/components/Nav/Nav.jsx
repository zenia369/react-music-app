import React from "react";
import './Nav.scss';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

const Nav = ({setActiveLibrary, activeLibrary}) => {


    return (
        <nav>
            <h1>Music</h1>
            <button 
                onClick={() => setActiveLibrary(!activeLibrary)}
                className={activeLibrary ? 'button-active' : ''}
            >
                Library
                <FontAwesomeIcon icon={faMusic}/>
            </button>
        </nav>
    )
}

export default Nav