export interface MessageType {
  id: number;
  User: {
    email: string;
    nick_name: string;
    profile_image: string; // fix - profile_img -> profile_image
  };
  content: string;
  is_update: string;
  write_date: string;
  isAlarm?: boolean; // fix - 채팅방 알람타입 인지 확인위해 (유저 입장, 퇴장 시)
}

export interface CategoryType {
  id: number;
  name: string;
  user_num: number;
  createdAt: string;
  updatedAt: string;
}

export interface UserType {
  email: string;
  nick_name: string;
  profile_image: string;
  enterDate: string;
  role: string;
}

export interface FriendType {
  profile_img: string;
  nick_name: string;
  email: string;
}