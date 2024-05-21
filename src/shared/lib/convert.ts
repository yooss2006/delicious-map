function snakeToCamel(text: string): string {
  return text.replace(/([-_][a-z])/g, (group) =>
    group.toUpperCase().replace('-', '').replace('_', '')
  );
}

function camelToSnake(text: string): string {
  return text.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

export function convertKeys(type: 'snake' | 'camel', data: any): any {
  const fn = type === 'snake' ? camelToSnake : snakeToCamel;
  if (data instanceof File) {
    return data;
  }
  if (Array.isArray(data)) {
    return data.map((item) => convertKeys(type, item));
  } else if (typeof data === 'object' && data !== null) {
    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => [fn(key), convertKeys(type, value)])
    );
  }
  return data;
}
