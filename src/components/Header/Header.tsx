import { LoginOutlined, LogoutOutlined } from "@ant-design/icons";
import { Button, Layout } from "antd";
import React, { FC } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import headerLogo from '../../assets/images/cat.png';
import { logout } from "../../redux/auth-reducer.ts";
import { selectCurrentUserLogin, selectIsAuth } from "../../redux/auth-selectors.ts";
import { useDispatch } from "../../redux/reduxStore.ts";
import classes from './Header.module.css';

const { Header: AntHeader } = Layout;

type MapPropsType = {};

const Header: FC<MapPropsType> = (props) => {
    const isAuth = useSelector(selectIsAuth);
    const login = useSelector(selectCurrentUserLogin);

    const dispatch = useDispatch();

    const logoutCB = () => {
        dispatch(logout());
    };

    return (
        <AntHeader className={classes.header}>
            <div className={classes.logo}>
                <img
                    src={headerLogo}
                    alt="logo"
                    className={classes.logoImage}
                />
            </div>

            <div className={classes.loginBlock}>
                {isAuth ? (
                    <div className={classes.userInfo}>
                        <span className={classes.loginText}>{login}</span>
                        <Button 
                            type="link" 
                            icon={<LogoutOutlined />} 
                            onClick={logoutCB}
                        >
                            Log out
                        </Button>
                    </div>
                ) : (
                    <NavLink to="/login">
                        <Button 
                            type="primary" 
                            icon={<LoginOutlined />} 
                            shape="round"
                        >
                            Log in
                        </Button>
                    </NavLink>
                )}
            </div>
        </AntHeader>
    );
};

export default Header;
