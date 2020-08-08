import React, { useEffect, useState } from "react";
import Card from "../card/Card";
import styles from "./home.module.css";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo";
import { argsToArgsConfig } from "graphql/type/definition";

const GraphHomePage = () => {
  let query = gql`
    {
      characters {
        results {
          name
          image
        }
      }
    }
  `;
  let { data, loading, error } = useQuery(query);
  let [chars, setChars] = useState([]);

  useEffect(() => {
    if (data && !loading && !error) {
      setChars(data.characters.results);
    }
  }, [data]);

  let nextCharacter = () => {
    chars.shift();
    setChars([...chars]);
  };

  return (
    <div className={styles.container}>
      <h2>Rick and Morty characters</h2>
      {loading ? (
        <h2>Loading</h2>
      ) : (
        <Card
          {...chars[0]}
          leftClick={() => nextCharacter()}
          // rightClick={() => addToFavoritesAction()
        />
      )}
    </div>
  );
};

export default GraphHomePage;
