import React from "react";
import styles from "./favs.module.css";
import Card from "../card/Card";

const FavPage: React.FC<{ characters: Array<Character> }> = ({
  characters = [],
}) => {
  return (
    <div className={styles.container}>
      <h2>Favorites</h2>
      {characters &&
        characters.map((el, i) => (
          <Card key={i} image={"image"} name={"name"} />
        ))}
      {!characters.length && <h3>There are no favorited characters</h3>}
    </div>
  );
};

export default FavPage;
