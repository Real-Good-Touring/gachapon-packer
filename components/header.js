import React, { useState, useEffect, useRef } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import SignInButton from "./signInButton";
import Link from "next/link";

export default function Header() {
  const { data: session } = useSession();
  return (
    <header
      style={{
        display: "flex",
        padding: "1.5em",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
      }}
    >
      {/* {session && <pre>{JSON.stringify(session, null, 2)}</pre>} */}
      <Link passHref href="/" style={{ fontSize: "1rem" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          style={{ fill: "#000000" }}
        >
          {" "}
          <path d="M 12 2 A 1 1 0 0 0 11.289062 2.296875 L 1.203125 11.097656 A 0.5 0.5 0 0 0 1 11.5 A 0.5 0.5 0 0 0 1.5 12 L 4 12 L 4 20 C 4 20.552 4.448 21 5 21 L 8 21 C 8.552 21 9 20.552 9 20 L 9 14 L 15 14 L 15 20 C 15 20.552 15.448 21 16 21 L 19 21 C 19.552 21 20 20.552 20 20 L 20 12 L 22.5 12 A 0.5 0.5 0 0 0 23 11.5 A 0.5 0.5 0 0 0 22.796875 11.097656 L 19 7.7851562 L 19 5 C 19 4.448 18.552 4 18 4 C 17.448 4 17 4.448 17 5 L 17 6.0390625 L 12.716797 2.3027344 A 1 1 0 0 0 12.710938 2.296875 A 1 1 0 0 0 12 2 z"></path>
        </svg>
      </Link>
      <SignInButton></SignInButton>
    </header>
  );
}
