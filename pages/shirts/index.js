import stock from "../../services/stockService";
import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/Home.module.css";
import React from "react";
import Cookies from "js-cookie";
import Header from "../../components/header";

// export async function getServerSideProps({ query }) {
//   let res = {};

//   let q = { props: await (await stock.getAll()).json() };
//   return q;
// }
export default function Post() {
  const [inventory, setInventory] = React.useState({
    shirts: { headers: [], values: [] },
    accessories: { headers: [], values: [] },
  });

  React.useEffect(async () => {
    let token = Cookies.get("credential");
    const headers = new Headers({
      "Content-Type": "application/json",
      Authorization: token,
    });

    setInventory(
      await fetch(process.env.NEXT_PUBLIC_BASE_ADDRESS + "/api/inventory", {
        method: "GET",
        headers: headers,
      })
    );
  }, []);

  return (
    <div>
      <Head>
        <title>Gachapon Packer</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <Header />
      {inventory.shirts && (
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
                {inventory.shirts.headers.map((v, i) => (
                  <th key={i}>{v}</th>
                ))}
              </thead>

              {inventory.shirts.values.map((v, i) => (
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
                {inventory.accessories.headers.map((v, i) => (
                  <th key={i}>{v}</th>
                ))}
              </thead>

              {inventory.accessories.values.map((v, i) => (
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
      )}
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
