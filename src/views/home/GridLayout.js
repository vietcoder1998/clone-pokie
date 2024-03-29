import { SearchBox } from "./SearchBox";
import { faker } from "@faker-js/faker";

const itemList = (() => {
  let dataList = [];
  let i = 0;
  while (i < 145) {
    dataList.push({
      id: `item-${i + 1}`,
    });
    i++;
  }

  return dataList;
})();

export function GridLayout() {
  return (
    <div class="angry-grid">
      <div id="item-0">
        <SearchBox />
      </div>
      {itemList.map((item) => (
        <div id={item?.id}>
          <img src={faker.image.avatar()} />
          <div className={"display-image-text"}>{faker.location.city()}</div>
        </div>
      ))}
    </div>
  );
}
