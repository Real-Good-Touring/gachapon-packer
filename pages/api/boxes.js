import Run from "../../packAlgorithm";
import getInventory from "../../getInventory";
import { getSession } from "next-auth/react";
import writePackingLists from "../../writePackingLists";

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    if (res)
      res.send({
        error: "You must be signed in to view this page.",
      });
    return;
  }

  let response = await getInventory(session);

  let lists = await Run(response, true);

  // let sheetId = await writePackingLists(session, lists);

  // lists.sheetId = sheetId;

  res.status(200).send(JSON.stringify(lists, null, 2));
}
