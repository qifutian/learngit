import { followings, followers, info } from "./user";
import { gists } from "./gist";
import { repositories } from "./repo";
import { query, queryByUser } from "./helper";

export const queries =
  query(
    [info, followings, followers, repositories].map((q) => q()).join("\n")
  ) + queryByUser("GitHub-Laziji", gists());

export default queries;
