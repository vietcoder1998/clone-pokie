import React from "react";
import { GamePanel } from "../../views/game/GamePanel";
import { GridLayout } from "../../views/game/GridLayout";

export default function HomePage(props) {
  return (
    <div style={{ width: "100%" }} suppressHydrationWarning={true}>
      <GridLayout></GridLayout>
      <div
        style={{
          margin: "15px 25px 0px",
        }}
      >
        <GamePanel />
      </div>
    </div>
  );
}
