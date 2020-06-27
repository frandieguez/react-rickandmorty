import React from "react";
import Card from "../card/Card";
import styles from "./home.module.css";
import { connect } from "react-redux";
import {
  removeCharacterAction,
  addToFavoritesAction,
} from "../../redux/ducks/charactersDuck";

const Home: React.FC<{
  chars: Array<Character>;
  removeCharacterAction: Function;
  addToFavoritesAction: Function;
}> = ({ chars = [], removeCharacterAction, addToFavoritesAction }) => {
  let char = chars[0];

  return (
    <div className={styles.container}>
      <h2>Rick and Morty characters</h2>
      {
        <Card
          leftClick={() => removeCharacterAction(0)}
          rightClick={() => addToFavoritesAction()}
          {...char}
        />
      }
    </div>
  );
};

const mapState = (state: any) => {
  return {
    chars: state.characters.characters.filter((item: Character) => {
      return !state.characters.favorites.includes(item);
    }),
  };
};

export default connect(mapState, {
  addToFavoritesAction,
  removeCharacterAction,
})(Home);
