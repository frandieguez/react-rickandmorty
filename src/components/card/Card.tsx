import React from "react";
import styles from "./card.module.css";
import FontAwesome from "react-fontawesome";

const logSide = (side: string) => {
  console.log(side);
};

interface CardProps {
  name: string;
  image: string;
  hide?: boolean;
  rightClick?: Function;
  leftClick?: Function;
}

const Card: React.FC<CardProps> = ({
  name = "Rick Sanches",
  image = "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  hide = false,
  rightClick = () => {},
  leftClick = () => {},
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img alt="rick" src={image} />
        <p className={styles.name}>{name}</p>
        {!hide && (
          <div className={styles.actions}>
            <div onClick={() => leftClick()} className={styles.left}>
              <FontAwesome name="thumbs-down" size="2x" />
            </div>
            <div onClick={() => rightClick()} className={styles.right}>
              <FontAwesome name="heart" size="2x" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
