import React, {Component, Fragment, useContext, useState} from "react";
import { Link } from 'react-router-dom';
import "./menu.css";
import {
    Sidebar,
    Menu,
    MenuItem,
} from "react-pro-sidebar";
import {GiAbstract050} from "react-icons/gi";
import {FiChevronsLeft, FiChevronsRight, FiHome, FiLogOut} from "react-icons/fi";
import {FaBrain, FaList} from "react-icons/fa";
import {RiPencilLine} from "react-icons/ri";
import {AuthContext} from "../Login/Authenticator";
import {research} from "../Research";
import {chooseResearchHandler} from "../ResearchHome/Home";
import {observer} from "mobx-react-lite";


const Sidenav = observer(() => {
    const { logout } = useContext(AuthContext);
    const [shortMenu, setShortMenu] = useState(false)
    const [expand, setExpand] = useState(false);
    const menuIconClick = () => {
        setShortMenu(!shortMenu);
    };
    const handleLogout = () => {
        logout();
    }

    return (
        <>
            <div className="navBar" id="header">
                <Sidebar collapsed={shortMenu}>
                    <Menu>
                        <div className="logotext">
                            <div>{shortMenu ? <GiAbstract050 /> : <div className="header-menu"><FaBrain/> ConcentrApp</div> }</div>
                        </div>
                        <div className="closemenu" onClick={menuIconClick}>
                            {shortMenu ? (
                                <FiChevronsRight/>
                            ) : (
                                <FiChevronsLeft/>
                            )}
                        </div>
                    </Menu>
                        <Menu iconShape="square">
                            <MenuItem active={true} icon={<FiHome />}><Link className="nav-link" to={`/home`} onClick={()=>chooseResearchHandler(-1)}>
                                Home
                            </Link>
                            </MenuItem>
                            <MenuItem icon={<FaList />} onClick={()=>setExpand(!expand)}>Researches</MenuItem>
                            {expand && research.allResearches.map((research) => (
                            <MenuItem><Link className='nav-link' to={`/data/${research.id}`} onClick={()=>chooseResearchHandler(research.id)}>{research.name}</Link></MenuItem>
                            ))}
                            <MenuItem icon={<RiPencilLine />}><Link className="nav-link" to={`/about`}>About</Link></MenuItem>
                        </Menu>
                        <Menu iconShape="square">
                            <MenuItem icon={<FiLogOut />} onClick={handleLogout}>Logout</MenuItem>
                        </Menu>
                </Sidebar>
            </div>
        </>
    );
})
export default Sidenav;
