import Run from "../../algo2";

export default function handler(req, res) {
  //const promise = new Promise(Run);

  res.status(200).send(JSON.stringify(Run(), null, 2));
}
