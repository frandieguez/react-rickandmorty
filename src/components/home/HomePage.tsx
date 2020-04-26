import React from "react";
import Card from "../card/Card";
import styles from "./home.module.css";
import { connect } from "react-redux";
import { removeCharacterAction } from "../../redux/charactersDuck";

const Home: React.FC<{
  chars: Array<Character>;
  removeCharacterAction: Function;
}> = ({ chars = [], removeCharacterAction }) => {
  let char = chars[0];

  return (
    <div className={styles.container}>
      <h2>Rick and Morty characters</h2>
      {<Card leftClick={() => removeCharacterAction(0)} {...char} />}
    </div>
  );
};

const mapState = (state: any) => {
  return {
    chars: state.characters.characters,
  };
};

export default connect(mapState, { removeCharacterAction })(Home);
