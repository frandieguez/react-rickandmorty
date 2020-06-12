import React from "react";
import styles from "./login.module.css";
import { connect } from "react-redux";
import { doGoogleLoginAction, logoutAction } from "../../redux/userDuck";

const LoginPage: React.FC<{
  doGoogleLoginAction: Function;
  logoutAction: Function;
  fetching: boolean;
  loggedIn: boolean;
}> = ({ doGoogleLoginAction, logoutAction, fetching, loggedIn }) => {
  if (fetching) return <h2>Cargando...</h2>;
  return (
    <div className={styles.container}>
      <pre>
        <code>{loggedIn}</code>
      </pre>
      {!loggedIn ? (
        <>
          <h1>Sign in with Google</h1>
          <button
            onClick={() => {
              doGoogleLoginAction();
            }}
          >
            Start
          </button>
        </>
      ) : (
        <>
          <h1>Sign out</h1>
          <button
            onClick={() => {
              logoutAction();
            }}
          >
            Sign out
          </button>
        </>
      )}
    </div>
  );
};

const mapState = ({ user: { fetching, loggedIn } }: any) => {
  return {
    fetching,
    loggedIn,
  };
};

export default connect(mapState, { doGoogleLoginAction, logoutAction })(
  LoginPage
);
