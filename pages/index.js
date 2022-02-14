import Head from "next/head";
import Header from "../components/header";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Gachapon Packer</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <Header />

      <main className={styles.main}>
        <h1 className={styles.title}>{"📦 Gachapon Packer"}</h1>

        <div className={styles.grid}>
          <a href={"/inventory"} className={styles.card}>
            <h2>Stock &rarr;</h2>
            <p>View inventory eligible to be packed</p>
          </a>

          <a href={"/api/boxes"} className={styles.card}>
            <h2>Pack &rarr;</h2>
            <p>Generate Gachapon packing lists</p>
          </a>

          <div />
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href={`https://docs.google.com/spreadsheets/d/${process.env.NEXT_PUBLIC_SHEET_ID}`}
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
