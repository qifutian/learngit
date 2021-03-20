import { gistInfo } from "./basicType";
import { queryCollection } from "./helper";

export const gists = (first = 100) => `
  gists(first: 100, orderBy: {field: CREATED_AT, direction: DESC}) {
    ${queryCollection(gistInfo)}
    totalCount
  }
`;
