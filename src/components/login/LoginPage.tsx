import React from "react";
import styles from "./login.module.css";
import { connect } from "react-redux";
import { doGoogleLoginAction, logoutAction } from "../../redux/ducks/userDuck";

const LoginPage: React.FC<{
  doGoogleLoginAction: Function;
  logoutAction: Function;
  fetching: boolean;
  loggedIn: boolean;
  displayName: string;
}> = ({
  doGoogleLoginAction,
  logoutAction,
  fetching,
  loggedIn,
  displayName,
}) => {
  if (fetching) return <h2>Cargando...</h2>;
  return (
    <div className={styles.container}>
      <img
        src="http://assets.stickpng.com/images/58f37720a4fa116215a9240f.png"
        alt=""
        width="300px"
      />
      <p>Let's rate some Rick and Morty characters, just login with google</p>
      {!loggedIn ? (
        <>
          <a
            onClick={() => {
              doGoogleLoginAction();
            }}
          >
            <img
              src="https://developers.google.com/identity/images/btn_google_signin_dark_normal_web.png"
              alt=""
            />
          </a>
        </>
      ) : (
        <>
          <h3>Hi {displayName}</h3>
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

const mapState = ({ user: { fetching, loggedIn, displayName } }: any) => {
  return {
    fetching,
    loggedIn,
    displayName,
  };
};

export default connect(mapState, { doGoogleLoginAction, logoutAction })(
  LoginPage
);
