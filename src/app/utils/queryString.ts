export function queryString(options: Record<string, string>) {
  const optionsArray = Object.entries(options).map(
    ([key, value]) => `${key}=${value}`,
  );

  return optionsArray.join('&');
}
