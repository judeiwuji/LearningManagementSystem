export interface JitsiMeetOptions {
  roomName: string;
  width: string;
  height: string;
  parentNode: Element;
  userInfo?: {
    email: string;
    displayName: string;
    role?: string;
    moderator?: boolean;
  };
  configOverwrite: any;
  jwt?: string;
}
