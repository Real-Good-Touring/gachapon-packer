import { google } from "googleapis";

export async function getServerSideProps({ query }) {
  // Auth
  const auth = await google.auth.getClient({
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  // Query

  const { id } = query;
  const range = `Current!AE${id}:AN${id}`;

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range,
  });

  // Result

  const [description, xs, s, m, l, xl, x2, x3, x4, x5] =
    response.data.values[0];

  return {
    props: {
      description,
      xs,
      s,
      m,
      l,
      xl,
      x2,
      x3,
      x4,
      x5,
    },
  };
}

export default function Post({ description, xs, s, m, l, xl, x2, x3, x4, x5 }) {
  return (
    <article>
      <h1>{description}</h1>
      <div dangerouslySetInnerHTML={{ __html: xs }}></div>
      <div>{s}</div>
      <div>{m}</div>
      <div>{l}</div>
      <div>{xl}</div>
      <div>{x2}</div>
      <div>{x3}</div>
      <div>{x4}</div>
      <div>{x5}</div>
    </article>
  );
}
