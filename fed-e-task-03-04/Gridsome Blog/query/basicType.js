export const userInfo = `
  login
  name
  email
  bioHTML
  avatarUrl
  location
  url
`;

export const repoInfo = `
  id
  name
  homepageUrl
  description
  stargazerCount
  watchers {
    totalCount
  }
  forkCount
  primaryLanguage {
    name
  }
  name
  url
  updatedAt
  licenseInfo {
    spdxId
  }
  createdAt
  updatedAt
`;

export const gistInfo = `
  id
  createdAt
  updatedAt
  description
  url
  files {
    name
    text
  }
`;
