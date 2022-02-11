// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { google } from "googleapis";

export default async function handler(req, res) {
  //const promise = new Promise(Run);

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

  res.status(200).json({
    shirts: shirts,
    headers: headers,
  });
}
