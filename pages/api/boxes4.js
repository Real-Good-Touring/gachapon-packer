import Run from "../../algo4";
import getInventory from "./inventory";

export default async function handler(req, res) {
  //const promise = new Promise(Run);

  let response = await getInventory();

  res.status(200).send(JSON.stringify(Run(response), null, 2));
}
