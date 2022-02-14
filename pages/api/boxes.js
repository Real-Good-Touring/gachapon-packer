import Run from "../../packAlgorithm";
import getInventory from "../../getInventory";
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

  let response = await getInventory(session);

  res.status(200).send(JSON.stringify(Run(response), null, 2));
}
