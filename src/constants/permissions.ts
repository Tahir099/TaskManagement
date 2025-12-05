export type OrganizationRole = "OWNER" | "ADMIN" | "MEMBER" | "VIEWER";

export const Permissions = {
  //Organization permissions
  DELETE_ORGANIZATION: ["OWNER"] as OrganizationRole[],
  UPDATE_ORGANIZATION: ["OWNER", "ADMIN"] as OrganizationRole[],
  INVITE_MEMBER: ["OWNER", "ADMIN"] as OrganizationRole[],
  REMOVE_MEMBER: ["OWNER", "ADMIN"] as OrganizationRole[],
  CHANGE_MEMBER_ROLE: ["OWNER"] as OrganizationRole[],

  //Board permissions
  CREATE_BOARD: ["OWNER", "ADMIN"] as OrganizationRole[],
  UPDATE_BOARD: ["OWNER", "ADMIN"] as OrganizationRole[],
  DELETE_BOARD: ["OWNER", "ADMIN"] as OrganizationRole[],
  VIEW_BOARD: ["OWNER", "ADMIN", "MEMBER", "VIEWER"] as OrganizationRole[],

  //Task permissions
  CREATE_TASK: ["OWNER", "ADMIN", "MEMBER"] as OrganizationRole[],
  UPDATE_TASK: ["OWNER", "ADMIN", "MEMBER"] as OrganizationRole[],
  DELETE_TASK: ["OWNER", "ADMIN", "MEMBER"] as OrganizationRole[],
  ASSIGN_TASK: ["OWNER", "ADMIN", "MEMBER"] as OrganizationRole[],
  VIEW_TASK: ["OWNER", "ADMIN", "MEMBER", "VIEWER"] as OrganizationRole[],
} as const;
 
export type PermissionKey = keyof typeof Permissions;

