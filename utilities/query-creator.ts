export function objectToQueryString(obj: { [key: string]: any }): string {
  return Object.entries(obj)
    .map(([key, value]) => {
      if (!value) return "";
      if (Array.isArray(value)) {
        let url = "";
        for (let v of value) {
          url += `${encodeURIComponent(key)}[]=${encodeURIComponent(v)}&`;
        }
        return url;
      }
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    })
    .join("&");
}
