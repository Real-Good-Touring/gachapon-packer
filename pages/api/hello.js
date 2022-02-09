// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Run from "../../algo2";

export default function handler(req, res) {
  //const promise = new Promise(Run);

  Run();

  res.status(200).json({ name: "John Doe" });
}
