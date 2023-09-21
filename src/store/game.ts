import { defineStore } from "pinia";
import { reactive, ref, computed } from "vue";
import { $id, num2px, randomPosition } from "@/utils";

export const enum MoveDirection {
  UP = "up",
  DOWN = "down",
  LEFT = "left",
  RIGHT = "right",
}

export const useGameStore = defineStore("game", () => {
  const isStart = ref<boolean>(false);
  const blockSize = ref<number>(10); // 方块大小

  const gameMapSize = {
    width: 800,
    height: 800,
  };
  const gameMapStyle = computed(() => {
    return {
      width: num2px(gameMapSize.width),
      height: num2px(gameMapSize.height),
    };
  });

  const foodPos = reactive({
    x: 0,
    y: 0,
  });
  function resetFoodPos() {
    const size = blockSize.value;
    foodPos.x = randomPosition(gameMapSize.width, size);
    foodPos.y = randomPosition(gameMapSize.height, size);
  }
  const foodStyle = computed(() => {
    const size = num2px(blockSize.value);
    return {
      width: size,
      height: size,
      left: num2px(foodPos.x),
      top: num2px(foodPos.y),
    };
  });

  /* prettier-ignore */
  const snakeOptions = reactive({
    size: blockSize.value,             // 蛇身每个部分的宽度/高度
    initLength: 5,                     // 最开始的时候蛇身的长度
    moveDirection: MoveDirection.DOWN, // 移动的方向
    speed: 100,                        // 间隔多少时间执行一次
  });
  const snakeBody = reactive<ISnakeBodyItem[]>(initSnakeItems());
  function createSnakeItem(
    x: number,
    y: number,
    isHead?: boolean,
  ): ISnakeBodyItem {
    return {
      x,
      y,
      id: $id(),
      isHead: isHead || false,
    };
  }

  function initSnakeItems() {
    const items: ISnakeBodyItem[] = [];
    for (let i = 0, l = snakeOptions.initLength - 1; i <= l; i++) {
      const y = i * snakeOptions.size;
      items.push(createSnakeItem(0, y, i === l));
    }
    return items;
  }

  function getSnakeHead() {
    return snakeBody.at(-1)!;
  }
  function getSnakeTail() {
    return snakeBody.at(0)!;
  }

  // 吃到食物,添加蛇身项
  function addSnakeItem() {
    const tail = getSnakeTail();
    const size = snakeOptions.size;
    const dirMap = {
      [MoveDirection.UP]: {
        x: tail.x,
        y: tail.y + size,
      },
      [MoveDirection.DOWN]: {
        x: tail.x,
        y: tail.y - size,
      },

      [MoveDirection.LEFT]: {
        x: tail.x - size,
        y: tail.y,
      },

      [MoveDirection.RIGHT]: {
        x: tail.x + size,
        y: tail.y,
      },
    };
    const { x, y } = dirMap[snakeOptions.moveDirection];
    snakeBody.unshift(createSnakeItem(x, y));
  }

  const snakeCommonStyle = computed(() => {
    const size = num2px(snakeOptions.size);
    return {
      width: size,
      height: size,
    };
  });

  // 得分
  const scores = computed(() => {
    return snakeBody.length - snakeOptions.initLength;
  });

  return {
    isStart,
    scores,
    gameMapSize,
    foodPos,
    snakeOptions,
    snakeBody,
    createSnakeItem,
    resetFoodPos,
    foodStyle,
    gameMapStyle,
    snakeCommonStyle,
    addSnakeItem,
    getSnakeHead,
  };
});
