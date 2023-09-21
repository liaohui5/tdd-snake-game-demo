<template>
  <div class="game-info">
    <div class="info-item btns">
      <button @click="start">开始</button>
    </div>
    <div class="info-item score">得分:{{ store.scores }}</div>
  </div>
  <div id="game-map" :style="store.gameMapStyle">
    <div class="food" :style="store.foodStyle"></div>
    <span
      class="snake-item"
      v-for="item of store.snakeBody"
      :key="item.id"
      :class="{ 'snake-head': item.isHead }"
      :style="snakeBodyItemStyle(item)"
    ></span>
  </div>
</template>

<script setup lang="ts">
import { useGame } from "./game";
import { useGameStore } from "@/store/game";
const store = useGameStore();

const { start, registerKeys, setDirection } = useGame();

// register keyboard event handler
registerKeys(setDirection);

// snake body items styles
function snakeBodyItemStyle(item: ISnakeBodyItem) {
  return {
    ...store.snakeCommonStyle,
    left: `${item.x}px`,
    top: `${item.y}px`,
  };
}
</script>

<style>
html,
body,
div {
  margin: 0;
  padding: 0;
}

html,
body,
#app {
  width: 100%;
  height: 100%;
}

#game-map {
  overflow: hidden;
  background: #000;
  position: relative;
  margin-left: 20px;
  .food {
    position: absolute;
    background: #f00;
    top: 0;
    left: 0;
  }

  .snake-item {
    position: absolute;
    background: #0f0;
    z-index: 2;
    &.snake-head {
      background: #fff;
    }
  }
}

.game-info {
  display: flex;
  padding: 20px;
  .info-item {
    margin-right: 20px;
  }
}
</style>
