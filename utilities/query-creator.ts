export function objectToQueryString(obj: { [key: string]: any }): string {
  return Object.entries(obj)
    .map(([key, value]) => {
      if (!value) return "";
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    })
    .join("&");
}
