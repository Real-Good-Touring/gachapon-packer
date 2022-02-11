import stock from "../../services/stockService";
import Link from "next/link";
import styles from "../../styles/Home.module.css";

export async function getServerSideProps({ query }) {
  let res = {};

  let q = { props: await (await stock.getAll()).json() };
  return q;
}

export default function Post({ shirts, headers }) {
  return (
    <article>
      <h1>Shirts</h1>
      <table>
        <thead>
          {headers.map((v, i) => (
            <th>{v}</th>
          ))}
        </thead>

        {shirts.map((v, i) => (
          <Link href={`shirts/${i + 4}`}>
            <tr key={i}>
              {v.map((vv, i) => (
                <td key={i}>{vv ? vv : " "}</td>
              ))}
            </tr>
          </Link>
        ))}
      </table>
    </article>
  );
}
