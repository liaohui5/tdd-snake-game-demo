/**
 * 返回指定范围内的随机数
 * @param foodSize - 最小值
 * @param mapSize - 最大值
 * @returns 返回值
 */
export function randomPosition(mapSize: number, foodSize: number) {
  const pos = Math.ceil(Math.random() * (mapSize / foodSize)) * foodSize;
  return pos + foodSize > mapSize ? pos - foodSize : pos;
}

/**
 * 数字转字符串并加上 px 后缀
 * @param value  数字值
 * @returns {string} 返回值
 */
export function num2px(value: number): string {
  return value.toString() + "px";
}

// 自增 ID
let _id = 101;
export const $id = () => ++_id;
