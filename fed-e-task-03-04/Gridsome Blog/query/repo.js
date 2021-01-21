import { repoInfo } from "./basicType";
import { queryCollection } from "./helper";

export const repositories = (first = 100) => `
  repositories(first: ${first}) {
    ${queryCollection(repoInfo)}
    totalCount
  }
`;
