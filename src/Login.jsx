import React from "react";
import { ReactComponent as Github } from "./github.svg";
import styles from "./Login.module.css";

const Login = ({ userInfo }) => {
    const redirect = window.location.pathname;
    
    if (userInfo) {
        return (
            <div className={styles.container}>
                <div className={styles.loggedInfo}>Logged in as "{userInfo.userDetails}"</div>
                <a href={`/.auth/logout?post_logout_redirect_uri=${redirect}`} className={styles.logoutLink}>
                    <button className={styles.logoutButton}>Log out</button>
                </a>
            </div>
        );
    }
    
    return (
        <div className={styles.githubContainer}>
            <a href={`/.auth/login/github?post_login_redirect_uri=${redirect}`} className={styles.githubButton}>
                <Github/>
                <strong>Log in with GitHub</strong>
            </a>
        </div>
    );
};

export default Login;
