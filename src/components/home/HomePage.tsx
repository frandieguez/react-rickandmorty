import React, { useState, useEffect } from "react";
import Card from "../card/Card";
import styles from "./home.module.css";
import axios from "axios";

let URL = "https://rickandmortyapi.com/api";

function getCharacters(callback: Function) {
  return axios.get(`${URL}/character`).then((res) => {
    callback(res.data.results);
  });
}

const Home: React.FC = () => {
  let [chars, setChars] = useState([]);

  useEffect(() => {
    getCharacters(setChars);
  }, []);

  function nextChar() {
    chars.shift();
    if (!chars.length) {
      //get more characters
    }

    setChars([...chars]);
  }

  return (
    <div className={styles.container}>
      <h2>Rick and Morty characters</h2>
      <div>
        <Card leftClick={nextChar} {...chars[0]} />
      </div>
    </div>
  );
};
export default Home;
