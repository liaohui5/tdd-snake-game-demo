import { useGameStore } from "@/store/game";
import { onMounted } from "vue";
import { MoveDirection } from "@/store/game";

export function useGame() {
  const store = useGameStore();

  // 设置蛇走的方向
  function setDirection(event: KeyboardEvent) {
    if (!store.isStart) {
      return;
    }

    const snakeOptions = store.snakeOptions;
    const directionMap = {
      ArrowLeft: MoveDirection.LEFT,
      ArrowUp: MoveDirection.UP,
      ArrowRight: MoveDirection.RIGHT,
      ArrowDown: MoveDirection.DOWN,
    };

    const keyCode = event.code;

    /* @ts-ignore */
    const targetDirection = directionMap[keyCode];

    // ignore other keys
    if (!targetDirection) {
      return;
    }

    // ignore same direction
    if (targetDirection === snakeOptions.moveDirection) {
      return;
    }

    // can not direct turn around
    const reverseDirsMap = {
      ArrowLeft: MoveDirection.RIGHT,
      ArrowRight: MoveDirection.LEFT,
      ArrowUp: MoveDirection.DOWN,
      ArrowDown: MoveDirection.UP,
    };

    /* @ts-ignore */
    const reverseDirection = reverseDirsMap[keyCode];
    if (reverseDirection === snakeOptions.moveDirection) {
      return;
    }
    snakeOptions.moveDirection = targetDirection;
  }

  // keep move
  let timer: NodeJS.Timeout;
  function run() {
    timer && clearInterval(timer);
    timer = setInterval(
      () => move(store.snakeOptions.size),
      store.snakeOptions.speed,
    );
  }

  // move position
  function move(steps: number) {
    const {
      snakeOptions,
      snakeBody,
      gameMapSize,
      foodPos,
      resetFoodPos,
      addSnakeItem,
    } = store;
    const head = store.getSnakeHead()!;

    // 检测是否吃到食物, 吃到身体变长
    if (head.x === foodPos.x && head.y === foodPos.y) {
      resetFoodPos();
      addSnakeItem();
    }

    // 检测是否撞到自己的身体
    if (isGameOver()) {
      restart();
      return;
    }

    // 设置 head 的坐标
    function setHeadPosition(head: ISnakeBodyItem): void {
      const { height, width } = gameMapSize;
      switch (snakeOptions.moveDirection) {
        case MoveDirection.UP:
          head.y = head.y <= 0 ? height : head.y - steps;
          break;
        case MoveDirection.LEFT:
          head.x = head.x <= 0 ? width : head.x - steps;
          break;
        case MoveDirection.DOWN:
          head.y = head.y >= height ? 0 : head.y + steps;
          break;
        case MoveDirection.RIGHT:
          head.x = head.x >= width ? 0 : head.x + steps;
          break;
      }
    }

    // 移动: 改变坐标
    for (let i = 0, l = snakeBody.length; i < l; i++) {
      const item = snakeBody[i];
      const next = snakeBody[i + 1];
      if (item.id === head.id) {
        setHeadPosition(item);
      } else {
        item.x = next.x;
        item.y = next.y;
      }
    }
  }

  // start game
  function start() {
    store.isStart = true;
    store.resetFoodPos();
    run();
    // move(10);
  }

  // restart
  function restart() {
    timer && clearInterval(timer);
    setTimeout(() => {
      window.alert("游戏结束, 请重新开始");
      window.location.reload();
    }, 100);
  }

  // game is over
  function isGameOver(): boolean {
    const snakeBody = store.snakeBody;
    const head = store.getSnakeHead()!;
    for (let i = 0, l = snakeBody.length - 1; i < l; i++) {
      const item = snakeBody[i];
      if (item.x === head.x && item.y === head.y) {
        return true;
      }
    }
    return false;
  }

  // register keyboard event handler
  function registerKeys(fn: (e: KeyboardEvent) => void) {
    onMounted(() => {
      window.addEventListener("keyup", fn, false);
    });
  }

  return {
    start,
    move,
    setDirection,
    registerKeys,
  };
}
