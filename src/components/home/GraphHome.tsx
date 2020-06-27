import React from "react";
import Card from "../card/Card";
import styles from "./home.module.css";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo";

const GraphHome = () => {
  let query = gql`
    query {
      characters {
        results {
          name
          image
        }
      }
    }
  `;
  let { data, loading, error } = useQuery(query);

  return (
    <div className={styles.container}>
      <h2>Rick and Morty characters</h2>
      {loading ? <h2>Loading</h2> : <Card {...data.characters[0]} />}
    </div>
  );
};

export default GraphHome;
