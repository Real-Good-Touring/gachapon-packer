import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import styles from "../styles/Home.module.css";
import Image from "next/image";

export default function SignInButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <button
        className={styles.card}
        onClick={() => signOut()}
        style={{ flexGrow: 0, flexBasis: "auto", margin: 0, padding: "1em" }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              borderRadius: "8em",
              marginRight: "12px",
              overflow: "hidden",
              width: "32px",
              height: "32px",
            }}
          >
            <Image
              src={session.user.image}
              width={32}
              height={32}
              alt="user image"
            ></Image>
          </div>
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
      style={{ flexGrow: 0, flexBasis: "auto", margin: 0, padding: "1em" }}
    >
      <div>Sign in</div>
    </button>
  );
}
