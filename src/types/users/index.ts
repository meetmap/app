export interface IUserWithoutFriends {
  description: string;
  birthDate: string; // Should be in ISO 8601 format (e.g., "2003-04-01T21:00:00.000Z")
  email: string; // Email address
  phone?: string; // Phone number
  username: string;
  id: string;
  cid: string;
  name?: string;
  profilePicture?: string;
  fbId?: string;
}

export interface IUserSelf {
  id: string;
  email: string; // Email address
  phone?: string; // Phone number
  username: string;
  birthDate: string; // Should be in ISO 8601 format (e.g., "2003-04-01T21:00:00.000Z")
  description?: string;
  name?: string;
  profilePicture?: string;
  fbId?: string;
  friends: string[]; // Array of friend IDs
  cid: string;
}

export type FriendshipStatusType = "add-friend" | "requested" | "pending" | "rejected" | "friends"

export interface IPartialUser {
  friendshipStatus: FriendshipStatusType;
  friends: IUserWithoutFriends[]
  id: string;
  email: string; // Email address
  phone?: string; // Phone number
  username: string;
  birthDate: string; // Should be in ISO 8601 format (e.g., "2003-04-01T21:00:00.000Z")
  cid: string;
  description?: string;
  name?: string;
  profilePicture?: string;
  fbId?: string;
}