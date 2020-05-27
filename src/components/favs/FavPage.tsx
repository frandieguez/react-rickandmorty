import React from "react";
import styles from "./favs.module.css";
import Card from "../card/Card";
import { connect } from "react-redux";

const FavPage: React.FC<{ characters: Array<Character> }> = ({
  characters = [],
}) => {
  return (
    <div className={styles.container}>
      <h2>Favorites</h2>
      {characters &&
        characters.map((el, i) => (
          <Card hide={true} key={i} image={el.image} name={el.name} />
        ))}
      {!characters.length && <h3>There are no favorited characters</h3>}
    </div>
  );
};

let mapStateToProps: any = (state: any) => {
  return { characters: state.characters.favorites };
};

export default connect(mapStateToProps, {})(FavPage);
