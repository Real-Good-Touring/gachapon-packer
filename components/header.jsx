import React, { useState, useEffect, useRef } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import SignInButton from "./signInButton";

export default function Header() {
  const { data: session } = useSession();
  return (
    <header
      style={{
        display: "flex",
        padding: "1.5em",
        justifyContent: "right",
        alignItems: "center",
        width: "100%",
      }}
    >
      {/* {session && <pre>{JSON.stringify(session, null, 2)}</pre>} */}
      <SignInButton></SignInButton>
    </header>
  );
}
