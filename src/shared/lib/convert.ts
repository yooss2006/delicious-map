function snakeToCamel(text: string): string {
  return text.replace(/([-_][a-z])/g, (group) =>
    group.toUpperCase().replace('-', '').replace('_', '')
  );
}

function camelToSnake(text: string): string {
  return text.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

export function convertKeys(type: 'snake' | 'camel', obj: any): any {
  const fn = type === 'snake' ? snakeToCamel : camelToSnake;
  if (Array.isArray(obj)) {
    return obj.map(convertKeys);
  } else if (typeof obj === 'object' && obj !== null) {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [fn(key), convertKeys(type, value)])
    );
  }
  return obj;
}
