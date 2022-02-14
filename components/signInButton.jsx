import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import styles from "../styles/Home.module.css";

export default function SignInButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <button
        className={styles.card}
        onClick={() => signOut()}
        style={{ flexGrow: 0, flexBasis: "auto" }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={session.user.image}
            width={32}
            height={32}
            style={{ borderRadius: "8em", marginRight: "12px" }}
          ></img>
          Signed in as
          <br /> {session.user.name}
        </div>
      </button>
    );
  }
  return (
    <button
      className={styles.card}
      onClick={() => signIn("google")}
      style={{ flexGrow: 0, flexBasis: "auto" }}
    >
      <div>Sign in</div>
    </button>
  );
}
