import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/Home.module.css";
import React from "react";
import Header from "../../components/header";
import { useSession, signIn, signOut } from "next-auth/react";

// export async function getServerSideProps({ query }) {
//   let res = await fetch(
//     process.env.NEXT_PUBLIC_BASE_ADDRESS + "/api/inventory",
//     {
//       method: "GET",
//     }
//   );
//   let result = await res.json();
//   return result;
// }

export default function Inventory() {
  const { data: session } = useSession();

  const [inventory, setInventory] = React.useState({
    shirts: { headers: [], values: [] },
    accessories: { headers: [], values: [] },
  });

  React.useEffect(async () => {
    setInventory(
      await (
        await fetch(process.env.NEXT_PUBLIC_BASE_ADDRESS + "/api/inventory", {
          method: "GET",
        })
      ).json()
    );
  }, []);

  return (
    <div>
      <Head>
        <title>Gachapon Packer</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <Header />

      <main
        style={{
          display: "flex",
          padding: "2em",
          justifyContent: "start",
          alignItems: "start",
          gap: "2em",
          flexWrap: "wrap",
        }}
      >
        <>
          <div>
            <h1>Shirts</h1>
            {(inventory.shirts && (
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
            )) || <p>No data found</p>}
          </div>

          <div>
            <h1>Accessories</h1>
            {(inventory.accessories && (
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
            )) || <p>No data found</p>}
          </div>
        </>
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
