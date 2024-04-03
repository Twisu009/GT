import { NextRequest } from "next/server";

interface QueryData {
  [key: string]: string | string[];
}
export const queryFormatter = (req: NextRequest) => {
  let queryData: QueryData = {};
  req.nextUrl.searchParams.forEach((value, key) => {
    if (key.endsWith("[]")) {
      const paramName = key.slice(0, -2);
      if (queryData.hasOwnProperty(paramName)) {
        (queryData[paramName] as string[]).push(value);
      } else {
        queryData[paramName] = [value];
      }
    } else {
      queryData[key] = value;
    }
  });
  return queryData;
};
