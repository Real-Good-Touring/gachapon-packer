import { google } from "googleapis";
import Link from "next/link";
import styles from "../../styles/Home.module.css";

export async function getServerSideProps({ query }) {
  const auth = await google.auth.getClient({
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: "Current!AE4:AN51",
  });

  const shirts = response.data.values;
  const headers = shirts.splice(0, 1)[0];

  return {
    props: {
      shirts: shirts,
      headers: headers,
    },
  };
}

export default function Post({ shirts, headers }) {
  return (
    <article>
      <h1>Shirts</h1>
      <table>
        <thead>
          {headers.map((v, i) => (
            <th>{v}</th>
          ))}
        </thead>

        {shirts.map((v, i) => (
          <Link href={`shirts/${i + 4}`}>
            <tr key={i}>
              {v.map((vv, i) => (
                <td key={i}>{vv ? vv : " "}</td>
              ))}
            </tr>
          </Link>
        ))}
      </table>
    </article>
  );
}
