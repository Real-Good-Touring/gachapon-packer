import { Box, Product, Size } from "../../../utils/types";
import { toCurrency } from "../../../utils/helpers";
import React from "react";

export default function BoxComponent({ box, idx }: { box: Box; idx: number }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        gap: "0.5em",
        padding: "1em",
        border: "1px solid black",
        borderRadius: "0.5em",
        margin: "1em",
        width: "fit-content",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div style={{ fontWeight: "bold" }}>Box #{idx}</div>
        <div style={{ fontWeight: "bold" }}>{toCurrency(box.getValue())}</div>
      </div>
      <div style={{ display: "flex", gap: "0.5em", flexWrap: "wrap" }}>
        {box.items.map((item) => (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.5em",
            }}
          >
            <div>{item.description}</div>
            <div>{item.category}</div>
            <div>{item.size}</div>
            <div>{toCurrency(item.price)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
