import { FEED_TYPE } from "@zhblogs/constants/feed-types";

export type FeedInfo = {
  name: string;
  url: string;
  type: keyof typeof FEED_TYPE;
};
