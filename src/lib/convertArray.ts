export const parseArray = <T>(value: unknown): T[] | undefined => {
  if (!value) return undefined;
  
  const parsedData = String(value)
    .split(",")
    .map(v => v.trim()) as T[];

  return parsedData;
};