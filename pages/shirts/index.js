import stock from "../../services/stockService";
import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/Home.module.css";

export async function getServerSideProps({ query }) {
  let res = {};

  let q = { props: await (await stock.getAll()).json() };
  return q;
}
/*passHref href={`shirts/${i + 1}`}*/
export default function Post({ shirts, accessories }) {
  return (
    <div>
      <Head>
        <title>Gachapon Packer</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main
        style={{
          display: "flex",
          padding: "2em",
          justifyContent: "start",
          alignItems: "start",
          gap: "2em",
        }}
      >
        <article>
          <h1>Shirts</h1>
          <table>
            <thead>
              {shirts.headers.map((v, i) => (
                <th key={i}>{v}</th>
              ))}
            </thead>

            {shirts.values.map((v, i) => (
              <Link key={i} href="">
                <tr>
                  {v.map((vv, i) => (
                    <td key={i}>{vv ? vv : " "}</td>
                  ))}
                </tr>
              </Link>
            ))}
          </table>
        </article>

        <article>
          <h1>Accessories</h1>
          <table>
            <thead>
              {accessories.headers.map((v, i) => (
                <th key={i}>{v}</th>
              ))}
            </thead>

            {accessories.values.map((v, i) => (
              <Link key={i} href="">
                <tr>
                  {v.map((vv, i) => (
                    <td key={i}>{vv ? vv : " "}</td>
                  ))}
                </tr>
              </Link>
            ))}
          </table>
        </article>
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
