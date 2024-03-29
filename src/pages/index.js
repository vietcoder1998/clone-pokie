import React from "react";
import i18n from "../i18n/index";
import { HomePanel } from "../views/home/HomePanel";
import GridGame from "../views/home/GridGame";
import { GridLayout } from "../views/home/GridLayout";
import GridGameType from "./../views/home/GridGameType";

export default function HomePage(props) {
  const { t } = i18n;

  return (
    <div style={{ width: "100%" }} suppressHydrationWarning={true}>
      <GridLayout></GridLayout>
      <div style={{ marginRight: 30 }}>
        <GridGameType></GridGameType>
        <GridGame></GridGame>
      </div>
      <HomePanel />
    </div>
  );
}
