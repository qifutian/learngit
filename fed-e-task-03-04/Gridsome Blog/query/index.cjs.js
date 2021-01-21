'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const userInfo = `
  avatarUrl
  bioHTML
  email
  name
  login
  url
`;

const repoInfo = `
  id
  homepageUrl
  name
  url
  updatedAt
`;

const gistInfo = `
  createdAt
  description
  id
  name
  url
`;

const query = (q) => `
viewer {
  ${q}
}
`;

const queryCollection = (q) => `
  nodes {
    ${q}
  }
`;

const followings = (first = 100) => `
  following(first: ${first}) {
    ${queryCollection(userInfo)}
    totalCount
  }
`;

const followers = (first = 100) => `
  followers(first: ${first}) {
    ${queryCollection(userInfo)}
    totalCount
  }
`;

const gists = (first = 100) => `
  gists(first: ${first}) {
    ${queryCollection(gistInfo)}
    totalCount
  }
`;

const repositories = (first = 100) => `
  repositories(first: ${first}) {
    ${queryCollection(repoInfo)}
    totalCount
  }
`;

const queries = query(
  [followings, followers, gists, repositories].map((q) => q()).join("\n")
);

exports.default = queries;
exports.queries = queries;
