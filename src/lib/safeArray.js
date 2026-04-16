export function safeArray(value) {
  return Array.isArray(value) ? value : [];
}

export function safeMap(array, callback) {
  if (!Array.isArray(array)) {
    return [];
  }
  return array.map(callback);
}