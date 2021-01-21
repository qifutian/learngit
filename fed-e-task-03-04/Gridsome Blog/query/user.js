import { userInfo } from "./basicType";
import { queryCollection } from "./helper";

export const info = () => userInfo;

export const followings = (first = 100) => `
  following(first: ${first}) {
    ${queryCollection(userInfo)}
    totalCount
  }
`;

export const followers = (first = 100) => `
  followers(first: ${first}) {
    ${queryCollection(userInfo)}
    totalCount
  }
`;
