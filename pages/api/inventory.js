// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { google } from "googleapis";

export default async function handler(req, res) {
  //const promise = new Promise(Run);

  // console.log(process.cwd());

  // console.log("Generating secrets.json");
  // let secretsObj = {};

  // var pattern = /^GOOGLE__/;
  // var matchingKeys = Object.keys(process.env).filter(function (key) {
  //   return pattern.test(key);
  // });

  // matchingKeys.forEach((x) => {
  //   secretsObj[x.replace("GOOGLE__", "")] = process.env[x].replace(
  //     "GOOGLE__",
  //     ""
  //   );
  // });

  // var json = JSON.stringify(secretsObj).replace(/\\\\n/g, "\\n");

  // console.log(json);
  console.log(process.env.GOOGLE__private_key);
  console.log(
    process.env.GOOGLE__private_key.replace("GOOGLE__", "").replace(
      /\\\\n/g,
      "\\n"
    )
  );
  //await fs.writeFile("secrets.json", json, () => {});

  const auth = await google.auth.getClient({
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    //keyFile: "./secrets.json",
    credentials: {
      client_email: process.env.GOOGLE__client_email.replace("GOOGLE__", ""),
      private_key: process.env.GOOGLE__private_key.replace(
        "GOOGLE__",
        ""
      ).replace(/\\n/g, "\n"),
    },
    projectId: "pivotal-glider-340420",
  });

  const sheets = google.sheets({ version: "v4", auth });

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
