import { createPinia, setActivePinia } from "pinia";
import { useGameStore } from "@/store/game";

vi.mock("@/utils", () => {
  return {
    num2px: () => "0px",
    randomPosition: () => 1,
    $id: () => 1,
  };
});

describe("game", () => {
  let store: any;
  beforeEach(() => {
    setActivePinia(createPinia());
    store = useGameStore();
  });

  it("should reset food position value when reset food position", () => {
    expect(store.foodPos).toEqual({
      x: 0,
      y: 0,
    });

    store.resetFoodPos();

    expect(store.foodPos).toEqual({
      x: 1,
      y: 1,
    });
  });

  it("should push an item to snakeBody when add snake item", () => {
    const initLen = store.snakeOptions.initLength;
    const items   = store.snakeBody;

    expect(items.length).toBe(initLen);

    store.addSnakeItem();

    expect(store.snakeBody.length).toBe(initLen + 1);
  });

  it("should initial snake body items when define store", () => {
    const items = store.snakeBody;
    expect(items.length).toBe(store.snakeOptions.initLength);

    const head = items[items.length - 1]; // last item
    expect(head.isHead).toBe(true);

    expect(items).toMatchInlineSnapshot(`
      [
        {
          "id": 1,
          "isHead": false,
          "x": 0,
          "y": 0,
        },
        {
          "id": 1,
          "isHead": false,
          "x": 0,
          "y": 10,
        },
        {
          "id": 1,
          "isHead": false,
          "x": 0,
          "y": 20,
        },
        {
          "id": 1,
          "isHead": false,
          "x": 0,
          "y": 30,
        },
        {
          "id": 1,
          "isHead": true,
          "x": 0,
          "y": 40,
        },
      ]
    `);
  });
});
