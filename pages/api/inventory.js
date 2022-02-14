// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { google } from "googleapis";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    if (res)
      res.send({
        error: "You must be signed in to view this page.",
      });
    return;
  }

  const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );
  let credentials = {
    refresh_token: session.token.refreshToken,
    expiry_date: session.token.exp,
    access_token: session.token.access_token,
    scope: "openid profile email https://www.googleapis.com/auth/spreadsheets",
  };
  oAuth2Client.setCredentials(credentials);

  const sheets = google.sheets({
    version: "v4",
    auth: oAuth2Client,
  });

  try {
    let response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SHEET_ID,
      range: "Shirts",
    });

    const shirts = response.data.values;
    const shirtsHeaders = shirts.splice(0, 1)[0];

    response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SHEET_ID,
      range: "Accessories",
    });

    const accessories = response.data.values;
    const accessoriesHeaders = accessories.splice(0, 1)[0];

    let result = {
      shirts: { headers: shirtsHeaders, values: shirts },
      accessories: { headers: accessoriesHeaders, values: accessories },
    };
    if (!res) {
      return result;
    }
    res.status(200).json(result);
  } catch (ex) {
    console.log(ex);
    res.status(500);
    res.send();
  }
}
