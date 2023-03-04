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
        border: "1px solid #efefef",
        borderRadius: "0.5em",
        marginBottom: ".5em",
        width: "100%",
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
        <div
          style={{
            fontWeight: "bold",
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <span>
            Box #{idx.toString().padStart(4, "0")}
            {/* Tag style indicating true or false for isLarge */}
            <div
              style={{
                display: "inline-block",
                padding: "0.25em 0.5em",
                borderRadius: "0.5em",
                marginLeft: "0.5em",
                backgroundColor: box.isLarge ? "#f5f6ff" : "#DDEFFF",
                color: box.isLarge ? "#5344db" : "#2464f0",
              }}
            >
              {box.isLarge ? "Large" : "Small"}
            </div>
          </span>
          <div style={{ fontWeight: "500" }}>
            {toCurrency(box.items.reduce((t, x) => x.price + t, 0))}
          </div>
        </div>
      </div>

      <div style={{ width: "100%" }}>
        {/* {box.items.map((item) => (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr",
              alignItems: "center",
              gap: "0.5em",
              marginBottom: "0.5em",
              width: "100%",
            }}
          >
            <div>{item.description}</div>
            <div>{item.category}</div>
            <div>{item.size}</div>
            <div>{toCurrency(item.price)}</div>
          </div>
        ))} */}
        {/* Table of box items */}
        <table style={{ width: "100%" }} className="packTable">
          <thead>
            <tr style={{ textAlign: "left" }}>
              <th style={{ width: "40%" }}>Item</th>
              <th>Category</th>
              <th>Size</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {box.items.map((item) => (
              <tr>
                <td>{item.description}</td>
                <td>{item.category}</td>
                <td>{item.size}</td>
                <td>{toCurrency(item.price)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
