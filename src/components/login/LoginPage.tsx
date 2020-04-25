import React from "react";
import styles from "./login.module.css";

const LoginPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1>Sign in with Google</h1>
      <h1>Sign out</h1>
      <button>Start</button>
      <button>Sign out</button>
    </div>
  );
};

export default LoginPage;
