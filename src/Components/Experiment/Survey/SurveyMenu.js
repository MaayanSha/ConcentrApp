import React, {Component, Fragment, useState} from "react";
import { Link } from 'react-router-dom';
import "../../Fixed/menu.css";
import {
    Sidebar,
    Menu,
    MenuItem,
} from "react-pro-sidebar";
import {GiAbstract050} from "react-icons/gi";
import {FiArrowLeftCircle, FiArrowRightCircle, FiChevronsLeft, FiChevronsRight, FiHome, FiLogOut} from "react-icons/fi";
import {FaBrain, FaList, FaRegHeart} from "react-icons/fa";
import {RiPencilLine, RiSurveyLine} from "react-icons/ri";
import {BsClipboard2Data} from "react-icons/bs";
import {ImStatsBars} from "react-icons/im";
import {VscPerson} from "react-icons/vsc";
import {MdPersonOutline} from "react-icons/md";
import {currentResearchStore} from "../currentResearch";
import {chooseResearchHandler} from "../../ResearchHome/Home";
import {observer} from "mobx-react-lite";



const SurveyMenu = observer(() => {
    const [shortMenu, setShortMenu] = useState(false)
    const [expand, setExpand] = useState(false);
    const research = currentResearchStore.currentResearch;
    const menuIconClick = () => {
        setShortMenu(!shortMenu);
    };

    return (
        <>
            <div className="navBar" id="header">
                <Sidebar collapsed={shortMenu}>
                    <Menu>
                        <div className="logotext">
                            <p>{shortMenu ? <GiAbstract050 /> : <div className="header-menu"><FaBrain /> ConcentrApp</div> }</p>
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
                        <MenuItem icon={<RiSurveyLine />}><Link
                            className="nav-link"
                            to={`/data/${research.id}/edit`}>
                            View / Edit Surveys
                        </Link>
                        </MenuItem>
                        <MenuItem icon={<ImStatsBars />}><Link
                            className="nav-link"
                            to={`/data/${research.id}/submissions`}>
                            View Collected Data
                        </Link>
                        </MenuItem>
                        <MenuItem icon={<MdPersonOutline/>}><Link
                            className="nav-link"
                            to={`/data/${research.id}/students`}>
                            Participants
                        </Link>
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="square">
                        <MenuItem icon={<FiLogOut />}>Logout</MenuItem>
                    </Menu>
                </Sidebar>
            </div>
        </>
    );
});
export default SurveyMenu;
