import { createPinia, setActivePinia } from "pinia";
import { useGame } from "@/game";
import { useGameStore } from "@/store/game";
import { useSetup } from "./helpers/useSetup";
import { fireEvent } from "./helpers/fireEvent";
import { MoveDirection } from "@/store/game";

describe("game", () => {
  let game: any;
  let store: any;
  beforeEach(() => {
    setActivePinia(createPinia());
    game = useGame();
    store = useGameStore();
  });

  describe("game start", () => {
    it("should be updated isStarted status and scores when game start", () => {
      game.start();
      expect(store.isStart).toBe(true);
      expect(store.scores).toBe(0);
    });
  });

  it("should update move directive when trigger keyup event", () => {
    const opts = store.snakeOptions;
    expect(opts.moveDirection).toBe(MoveDirection.DOWN);
    game.start();

    useSetup(() => {
      game.registerKeys(game.setDirection);
    });

    fireEvent.keyup({
      code: "ArrowRight",
    });

    expect(opts.moveDirection).toBe(MoveDirection.RIGHT);
  });

  it("should keep move when game started", () => {
    vi.useFakeTimers();
    const head = store.getSnakeHead();
    const opts = store.snakeOptions;
    const initY = opts.size * (opts.initLength - 1);

    expect(head.y).toBe(initY);

    game.start();

    vi.advanceTimersToNextTimer();
    expect(head.y).toBe(initY + opts.size);

    vi.advanceTimersToNextTimer();
    expect(head.y).toBe(initY + opts.size * 2);
  });

  it("should be set to y = 0 when y exceeds the game map max height", () => {
    const head = store.getSnakeHead();
    const maxMapHeight = store.gameMapSize.height;
    expect(head.y).toBeLessThan(maxMapHeight);

    game.move(maxMapHeight);
    game.move(10);

    expect(head.y).toBe(0);
  });

  it("should be set x = 0 when x exceeds then game map max width", () => {
    const head = store.getSnakeHead();
    const maxMapWidth = store.gameMapSize.width;
    store.snakeOptions.moveDirection = MoveDirection.RIGHT;

    expect(head.x).toBeLessThan(maxMapWidth);

    game.move(maxMapWidth);
    game.move(10);

    expect(head.x).toBe(0);
  });

  it("should be set y = game map max height when y less then 0", () => {
    const head = store.getSnakeHead();
    const maxMapHeight = store.gameMapSize.height;
    store.snakeOptions.moveDirection = MoveDirection.UP;

    expect(head.y).toBeGreaterThan(0);

    game.move(maxMapHeight);
    game.move(10);

    expect(head.y).toBe(maxMapHeight);
  });

  it("should be set x = game map max width when x less then 0", () => {
    const head = store.getSnakeHead();
    const maxMapWidth = store.gameMapSize.width;
    store.snakeOptions.moveDirection = MoveDirection.LEFT;

    expect(head.x).toBe(0); // 默认已经在最左边了

    game.move(10); // 只需要移动一次就直接到地图最右边

    expect(head.x).toBe(maxMapWidth);
  });

  it("should be add scores when snake eated food", () => {
    expect(store.scores).toBe(0);
    const head = store.getSnakeHead();
    const steps = 10;

    store.foodPos.y = head.y + steps;
    game.move(steps);
    game.move(1); // 再移动一次才能触发判断

    expect(store.scores).toBe(1);
  });

  it("should be add items when snake eated food", () => {
    const len = store.snakeBody.length;
    const head = store.getSnakeHead();
    const steps = 10;

    store.foodPos.y = head.y + steps;
    game.move(steps);
    game.move(1);

    expect(store.snakeBody.length).toBe(len + 1);
    // 证明添加了一条数据,身体变长
  });
});
