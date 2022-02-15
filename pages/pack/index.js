import Head from "next/head";
import React from "react";
import Router from "next/router";
import styles from "../../styles/Home.module.css";

export default function Pack() {
  React.useEffect(() => {
    Router.replace(`/pack/results`);
  });

  return (
    <div>
      <Head>
        <title>Gachapon Packer</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div
        style={{
          display: "flex",
          height: "100vh",
          alignItems: "center",
          width: "100vw",
          flexWrap: "wrap",
          alignContent: "center",
        }}
      >
        <h1 style={{ flexBasis: "100%", textAlign: "center" }}>Packing</h1>
        <h3 style={{ flexBasis: "100%", textAlign: "center" }}>
          This may take a minute...
        </h3>
      </div>
    </div>
  );
}
