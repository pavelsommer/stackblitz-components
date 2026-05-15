const response = await fetch("/api/tree/index.json");
const result = await response.json();

export default (item) => {
  return item
    ? [result[1][item].items ?? [], result[1]]
    : [result[0], result[1]];
};
