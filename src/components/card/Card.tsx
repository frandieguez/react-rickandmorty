import React from "react";
import styles from "./card.module.css";
import FontAwesome from "react-fontawesome";

let rick = "https://rickandmortyapi.com/api/character/avatar/1.jpeg";

const onClick = (side: string) => {
  return () => console.log(side);
};

interface CardProps {
  name: string;
  image: string;
  rightClick?: Function;
  leftClick?: Function;
}

const Card: React.FC<CardProps> = ({
  name = "Rick Sanches",
  image = rick,
  rightClick,
  leftClick,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img alt="rick" src={image} />
        <p className={styles.name}>{name}</p>
        <div className={styles.actions}>
          <div
            onClick={() => {
              leftClick || onClick("left");
            }}
            className={styles.left}
          >
            <FontAwesome name="thumbs-down" size="2x" />
          </div>
          <div
            onClick={() => {
              rightClick || onClick("right");
            }}
            className={styles.right}
          >
            <FontAwesome name="heart" size="2x" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
