export function typedEntries<T extends Record<string, any>>(
  obj: T
): Array<[keyof T, T[keyof T]]> {
  return Object.entries(obj) as Array<[keyof T, T[keyof T]]>;
}

export function strictEntries<K extends string, V>(
  obj: Record<K, V>
): Array<[K, V]> {
  return Object.entries(obj) as Array<[K, V]>;
}
