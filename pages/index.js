import Head from "next/head";
import Image from "next/image";
import Product from "../domain/Product";
import Run from "../algo2";
import styles from "../styles/Home.module.css";

var p = new Product("testy", 9.99, 1, "M");

let shirtStockDict = {};
let accessoryStockDict = {};

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Gachapon Packer</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>{"📦 Gachapon Packer"}</h1>

        <div className={styles.grid}>
          <a href={"/shirts"} className={styles.card}>
            <h2>Stock &rarr;</h2>
            <p>View inventory to be packed</p>
          </a>

          <a href={"/api/boxes"} className={styles.card}>
            <h2>Pack &rarr;</h2>
            <p>Generate some Gachapon packing lists</p>
          </a>

          <div />
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href={
            "https://docs.google.com/spreadsheets/d/1EpAYJPnfnADNrEEPToE3pNGiZR4mREX-u0NIM4gu9TA"
          }
          target="_blank"
          style={{ textAlign: "center" }}
          rel="noreferrer"
        >
          Edit Data Source &#8599;
        </a>
      </footer>
    </div>
  );
}
