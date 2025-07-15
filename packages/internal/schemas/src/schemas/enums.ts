import { ARCHITECTURE_TYPE_KEYS } from "@zhblogs/constants/architecture-types";
import { BLOG_STATUS_TAG_KEYS } from "@zhblogs/constants/blog-status-tags";
import { BLOG_STATUS_TYPE_KEYS } from "@zhblogs/constants/blog-status-types";
import { CLAIM_TYPE_KEYS } from "@zhblogs/constants/claim-types";
import { FROM_SOURCE_KEYS } from "@zhblogs/constants/frome-sources";
import { SUBMISSION_TYPE_KEYS } from "@zhblogs/constants/submission-types";
import { SUBMITTER_TYPE_KEYS } from "@zhblogs/constants/submitter-types";
import { TAG_TYPE_KEYS } from "@zhblogs/constants/tag-types";
import { USER_ROLE_KEYS } from "@zhblogs/constants/user-roles";
import { USER_SOCIAL_ACCOUNT_PROVIDERS_KEYS } from "@zhblogs/constants/user-social-account-provider";
import { pgEnum } from "drizzle-orm/pg-core";

export const architecture_type_enum = pgEnum(
  "architecture_type",
  ARCHITECTURE_TYPE_KEYS as [string]
);

export const blog_status_enum = pgEnum(
  "blog_status",
  BLOG_STATUS_TYPE_KEYS as [string]
);

export const from_sources_enum = pgEnum(
  "from_sources",
  FROM_SOURCE_KEYS as [string]
);

export const submission_type_enum = pgEnum(
  "submission_type",
  SUBMISSION_TYPE_KEYS as [string]
);

export const submission_status_enum = pgEnum(
  "submission_status",
  SUBMISSION_TYPE_KEYS as [string]
);

export const submitter_type_enum = pgEnum(
  "submitter_type",
  SUBMITTER_TYPE_KEYS as [string]
);

export const user_social_account_provider_enum = pgEnum(
  "user_social_account_provider",
  USER_SOCIAL_ACCOUNT_PROVIDERS_KEYS as [string]
);

export const blog_status_tags_enum = pgEnum(
  "blog_status_tags",
  BLOG_STATUS_TAG_KEYS as [string]
);

export const claimed_by_enum = pgEnum(
  "claimed_by",
  CLAIM_TYPE_KEYS as [string]
);

export const tag_type_enum = pgEnum("tag_type", TAG_TYPE_KEYS as [string]);

export const user_role_enum = pgEnum("user_role", USER_ROLE_KEYS as [string]);
