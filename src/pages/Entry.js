import React from "react";
import Entry from "../features/entry";

const EntryPage = () => {
  return (
    <div
      style={{
        background: "#f5f5f5",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Entry />
    </div>
  );
};

export default EntryPage;
