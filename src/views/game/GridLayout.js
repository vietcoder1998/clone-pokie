import { faker } from "@faker-js/faker";
import { SearchBox } from "./SearchBox";
import { GameScreenDisplay } from "./GameScreenDisplay";

const itemList = (() => {
  let dataList = [];
  let i = 0;
  while (i < 70) {
    dataList.push({
      id: `detail-${i + 1}`,
    });
    i++;
  }

  return dataList;
})();

export function GridLayout() {
  return (
    <div
      class="game-detail-grid"
      style={{ padding: "0 25px", position: "relative" }}
    >
      <div id="detail-0">
        <SearchBox />
      </div>
      {itemList.map((gameDetail) => (
        <div
          id={gameDetail?.id}
          style={{
            position: "relative",
          }}
        >
          {gameDetail.id === "detail-15" ? (
            <GameScreenDisplay></GameScreenDisplay>
          ) : (
            <>
              <img src={faker.image.avatar()} />
              <div className={"display-image-text"}>
                {faker.location.city()}
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
