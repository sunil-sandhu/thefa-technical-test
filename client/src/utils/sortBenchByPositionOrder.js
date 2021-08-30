const benchPositionOrder = { G: 0, D: 1, M: 2, F: 3 };

export function sortBenchByPositionOrder(a, b) {
  if (benchPositionOrder[a.position] < benchPositionOrder[b.position]) {
    return -1;
  }
  if (benchPositionOrder[a.position] > benchPositionOrder[b.position]) {
    return 1;
  }
  return 0;
}
