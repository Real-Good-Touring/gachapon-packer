// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getSession } from "next-auth/react";
import getInventory from "../../getInventory";

export default async function handler(req, res) {
  const session = await getSession();
  if (!session) {
    if (res)
      res.send({
        error: "You must be signed in to view this page.",
      });
    return;
  }
  try {
    let result = await getInventory(session);
    res.status(200).json(result);
  } catch (ex) {
    console.log(ex);
    res.status(500);
    res.send();
  }
}
