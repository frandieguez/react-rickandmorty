import React from "react";
import Card from "../card/Card";
import styles from "./home.module.css";
import { connect } from "react-redux";

const Home: React.FC<{ chars: Array<Character> }> = ({ chars = [] }) => {
  let char = chars[0];
  return (
    <div className={styles.container}>
      <h2>Rick and Morty characters</h2>
      <div>{<Card leftClick={() => {}} {...char} />}</div>
    </div>
  );
};

const mapState = (state: any) => {
  return {
    chars: state.characters.characters,
  };
};
export default connect(mapState)(Home);
