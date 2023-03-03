import { google } from "googleapis";

export default async function getInventory(session) {
  const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );
  // let credentials = {
  //   refresh_token: session.token.refreshToken,
  //   expiry_date: session.token.exp,
  //   access_token: session.token.access_token,
  //   scope: "openid profile email https://www.googleapis.com/auth/spreadsheets",
  // };
  const token = await oAuth2Client.getAccessToken();
  oAuth2Client.setCredentials(token);
  //oAuth2Client.setCredentials(credentials);

  const sheets = google.sheets({
    version: "v4",
    auth: oAuth2Client,
  });

  let response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.NEXT_PUBLIC_SHEET_ID,
    range: "Shirts",
  });

  const shirts = response.data.values;
  const shirtsHeaders = shirts.splice(0, 1)[0];

  response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.NEXT_PUBLIC_SHEET_ID,
    range: "Accessories",
  });

  const accessories = response.data.values;
  const accessoriesHeaders = accessories.splice(0, 1)[0];

  let result = {
    shirts: { headers: shirtsHeaders, values: shirts },
    accessories: { headers: accessoriesHeaders, values: accessories },
  };

  return result;
}
