import Head from "next/head";
import Link from "next/link";
import React from "react";
import Header from "../../components/header";
//import getInventory from "../../getInventory";
import GenerateBoxes from "../../pack";
//import writePackingLists from "../../writePackingLists";
import styles from "../../styles/Home.module.css";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { PackResults, Size } from "../../utils/types";
import { toCurrency } from "../../utils/helpers";
import Box from "./components/Box";

const sizes = ["S", "M", "L", "XL", "2X", "3X", "4X", "5X", "N/A"];

export async function getServerSideProps(ctx: any) {
  //let session = await getSession(ctx);
  //let inv = await getInventory(session);
  let packResults = await GenerateBoxes(null);
  // let sheetId = await writePackingLists(session, lists);
  // lists.sheetId = sheetId;

  // why delete?
  // delete packResults.smallBoxes.boxes;
  // delete packResults.largeBoxes.boxes;

  let summary = JSON.parse(JSON.stringify(packResults));
  return { props: { result: summary, sheetId: null } };
}

export default function PackResultsPage({
  result,
  sheetId,
}: {
  result: PackResults;
  sheetId: string;
}) {
  //const { data: session } = useSession();

  const shirtCount: { [key: string]: number } = {
    "0": 0,
    "1": 0,
    "2": 0,
    "3": 0,
  };

  result.largeBoxes.boxes.concat(result.smallBoxes.boxes).forEach((box) => {
    let count = box.items.filter((item) => item.category == "Shirt").length;
    shirtCount[count] += 1;
  });

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
          gap: ".75em",
          flexWrap: "wrap",
        }}
      >
        <a
          className={styles.card + " " + styles.sheets}
          target="_blank"
          rel="noreferrer"
          href={`https://docs.google.com/spreadsheets/d/${sheetId}`}
        >
          <h1 style={{ margin: 0 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                flexWrap: "nowrap",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                style={{
                  fill: "#0f9d58",
                  verticalAlign: "middle",
                  marginRight: ".25em",
                }}
              >
                <path d="M 14 2 L 6 2 C 4.894531 2 4 2.894531 4 4 L 4 20 C 4 21.105469 4.894531 22 6 22 L 18 22 C 19.105469 22 20 21.105469 20 20 L 20 8 Z M 11 20 L 7 20 L 7 18 L 11 18 Z M 11 17 L 7 17 L 7 15 L 11 15 Z M 11 14 L 7 14 L 7 12 L 11 12 Z M 17 20 L 13 20 L 13 18 L 17 18 Z M 17 17 L 13 17 L 13 15 L 17 15 Z M 17 14 L 13 14 L 13 12 L 17 12 Z M 13 9 L 13 3.5 L 18.5 9 Z"></path>
              </svg>
              <span style={{ flexGrow: "1" }}>
                View Packing Lists in Sheets
              </span>
              <span style={{ flexGrow: "0" }}>&rarr;</span>
            </div>
          </h1>
        </a>
        <div className={styles.card + " " + styles.nointeract}>
          <h2>Small Boxes</h2>
          Count
          <p>{result.smallBoxes.total}</p>
          <br />
          Average Value
          <p>{toCurrency(result.smallBoxes.averageValue)}</p>
          <br />
          Size Quantity
          <br />
          <br />
          <table>
            <thead>
              {sizes.map((v, i) => (
                <th key={i}>{`${v}`}</th>
              ))}
            </thead>

            <tr>
              {sizes.map((v, i) => (
                <td key={i}>{result.smallBoxesDict[v as Size]}</td>
              ))}
            </tr>
          </table>
        </div>

        <div className={styles.card + " " + styles.nointeract}>
          <h2>Large Boxes </h2>
          Count
          <p>{result.largeBoxes.total}</p>
          <br />
          Average Value
          <p>{toCurrency(result.largeBoxes.averageValue)}</p>
          <br />
          Size Quantity
          <br />
          <br />
          <table>
            <thead>
              {sizes.map((v, i) => (
                <th key={i}>{`${v}`}</th>
              ))}
            </thead>

            <tr>
              {sizes.map((v, i) => (
                <td key={i}>{result.largeBoxesDict[v as Size]}</td>
              ))}
            </tr>
          </table>
        </div>

        <div
          className={styles.card + " " + styles.nointeract}
          style={{
            width: "100%",
            minWidth: "100%",
            flexGrow: "1",
            flexShrink: "0",
            flexBasis: "100%",
          }}
        >
          <h2>Total</h2>
          <div
            className={styles.totalGrid}
            style={{
              display: "grid",
              gap: "1em",
            }}
          >
            <div style={{}}>
              Count
              <p>{result.largeBoxes.total + result.smallBoxes.total}</p>
              <br />
              Value
              <p>{toCurrency(result.totalValue)}</p>
              <br />
              Variance (value - target)
              <p>{toCurrency(result.totalVariance)}</p>
            </div>
            <div>
              <div
                className={
                  shirtCount[0] + shirtCount[1] > 0 ? styles.badOutline : ""
                }
              >
                Boxes with less than two shirts
                <p>{shirtCount[0] + shirtCount[1]}</p>
              </div>
              <br />
              {/* <div className={shirtCount[1] > 0 ? styles.badOutline : ""}>
                Boxes with one shirt
                <p>{shirtCount[1]}</p>
              </div> */}
              <div>
                Boxes with two shirts
                <p>{shirtCount[2]}</p>
                <br />
                Boxes with three shirts
                <p>{shirtCount[3]}</p>
              </div>
            </div>
            <div style={{}}>
              Left Over Shirts
              <p style={{ fontSize: 11, color: "#808080" }}>
                Usually due to mismatch in sizes or too many duplicates
              </p>
              <p>{result.leftOverShirtsCount}</p>
              <br />
              Left Over Accessories
              <p>{result.leftOverAccessories}</p>
              <br />
              Left Over Special Accessories
              <p>{result.leftOverSpecialAccessories}</p>
            </div>
          </div>
        </div>

        <div
          style={{
            flexGrow: "auto",
            width: "100%",
            flexBasis: "auto",
          }}
        >
          <h2 style={{ marginBottom: 0 }}>Packing Lists</h2>
          <p style={{ fontSize: 10, color: "#808080", lineHeight: "9px" }}>
            In case Google Sheets integration breaks 🙃
          </p>
          <br />
          <div>
            {result.largeBoxes.boxes
              .concat(result.smallBoxes.boxes)
              .map((box, i) => (
                <Box key={i} idx={i + 1} box={box}></Box>
              ))}
          </div>
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
