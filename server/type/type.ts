import express, { Request, Response, NextFunction } from 'express';

interface CustomRequest extends Request {
  sendData?: any;
  file?: any;
}
interface CacheUser {
  category_id: number;
  location: string;
  email: string;
  type: string;
  email_list?: Array<string>;
  lon: number;
  lat: number;
  status?: string;
  uuid?: string;
}
interface Participant {
  email: string;
  lon: number;
  lat: number;
}
interface TempRoom {
  uuid: string;
  category_id: string;
  allow_num: number;
  location: string;
  participants: Array<any>;
}
interface CacheRoomList {
  users: Array<string>;
}
export { CustomRequest, CacheUser, Participant, TempRoom, CacheRoomList };
