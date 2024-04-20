import { getRequest } from "@/utilities/https";
import { objectToQueryString } from "@/utilities/query-creator";

export interface UserDetails {
  UserID: number;
  Username: string;
  Email: string;
  DateOfBirth: string;
}
export const get_users = async (query: {
  skip: number;
  count: number;
  userIds: number[];
}) => {
  let queryUrl = objectToQueryString(query);
  let response = await getRequest<{
    results: UserDetails[];
    total: number;
  }>(`/api/user?` + queryUrl);
  return response.data;
};

export const get_all_users = async (query: {
  skip: number;
  count: number;
  value: string;
}) => {
  let queryUrl = objectToQueryString(query);
  let response = await getRequest<{
    results: UserDetails[];
    total: number;
  }>(`/api/user?` + queryUrl);
  return response.data;
};
