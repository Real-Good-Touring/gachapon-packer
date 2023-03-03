import { google } from "googleapis";

export default async function writePackingLists(session, lists) {
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

  let sheetId = "";

  const createResource = {
    properties: {
      title: "Gachapon - Pack Lists - " + new Date().toISOString(),
    },
    sheets: [
      { properties: { title: "Summary" } },
      { properties: { title: "Small Boxes" } },
      { properties: { title: "Large Boxes" } },
    ],
  };

  try {
    let spreadsheet = await sheets.spreadsheets.create({
      resource: createResource,
      fields: "spreadsheetId",
    });

    spreadsheet.data.spreadsheetId;
    sheetId = spreadsheet.data.spreadsheetId;
    console.log(`Spreadsheet ID: ${spreadsheet.data.spreadsheetId}`);

    let breakdown = formatForBreakdown(lists);
    await sheets.spreadsheets.values.update({
      spreadsheetId: sheetId,
      range: "Summary!A1",
      resource: { values: breakdown.values },
      valueInputOption: "USER_ENTERED",
    });

    // let sm = formatForSheets(lists.smallBoxes.boxes, 1);

    // sheets.spreadsheets.values.update({
    //   spreadsheetId: sheetId,
    //   range: "Small Boxes!A1",
    //   resource: { values: sm.values },
    //   valueInputOption: "USER_ENTERED",
    // });

    //console.log("small boxes updated.");

    let lg = formatForSheets(lists.largeBoxes.boxes, sm.index);
    sheets.spreadsheets.values.update({
      spreadsheetId: sheetId,
      range: "Large Boxes!A1",
      resource: {
        values: lg.values,
      },
      valueInputOption: "USER_ENTERED",
    });
    console.log("large boxes updated.");
  } catch (e) {
    console.error(e);
  }

  return sheetId;
}

function formatForSheets(boxes, index) {
  const headers = ["", "ITEM", "SIZE", "VALUE"];
  let i = index ?? 1;

  let values = [headers];
  boxes.forEach((box) => {
    values.push([
      "#" + String(parseInt(i++)).padStart(4, "0"),
      "",
      "",
      toCurrency(box.getValue()),
    ]);
    box.items.forEach((item) =>
      values.push([
        "",
        item.description,
        item.size ?? "",
        toCurrency(item.price),
      ])
    );

    values.push([""]);
  });

  return { values: values, index: i };
}

function formatForBreakdown(lists) {
  const headers = [""].concat(Object.keys(smallBoxDict));
  let i = index ?? 1;

  let values = [headers];
  values.push(["SMALL BOXES"].concat(Object.values(smallBoxDict)));
  values.push(["LARGE BOXES"].concat(Object.values(largeBoxDict)));
  return { values: values, index: i };
}

function toCurrency(v) {
  let q = parseFloat(v);
  if (!q) return v;
  return "$" + q.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}
