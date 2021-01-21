export const query = (q) => `
  viewer {
    ${q}
  }
`;

export const queryByUser = (userLogin, q) => `
  user(login: "${userLogin}") {
    ${q}
  }
`;

export const queryCollection = (q) => `
  nodes {
    ${q}
  }
`;
