import exp from "constants";

interface ThemeColors {
  blue: string;
  black: string;
  darkGray: string;
  gray: string;
  lightGray: string;
  white: string;
  error: string;
}

export interface Theme {
  colors: ThemeColors;
}

export interface StyledInputProps {
  active: boolean;
  valid: boolean;
  theme: Theme;
  color?: string;
}

export interface ValidatedInputState {
  active: boolean;
  valid: boolean;
  typedIn: boolean;
  labelActive: boolean;
  labelColor: string;
  value: string;
}

export interface Dob{
  month : number;
  day : number;
  year : number;
}


export  interface StyledNextButtonProps{
  active: boolean;
  theme : Theme;
  color : string;
}

export interface StyledCheckboxProps{
  active: boolean;
  theme : Theme;
}


export interface User{
  userId:number;
  firstName:string;
  lastName:string;
  email:string;
  username:string;
  phone:string;
  dateOfBirth:Dob;
  bio:string;
  nickname:string;
  profilePicture:string;
  bannerPicture:string;
}

export interface RGBA{
  r:number;
  g:number;
  b:number;
  a:number;
}

export interface ModalButtonProps{
  active:boolean;
  height: number;
  fontColor:string;
  boderColor?:string;
  backgroundColor:string;
  fontSize:number;
  fontWeight:number;
  hoverBackgound: RGBA
  hoverBorder?:RGBA
}

export  interface SVGProps{
  height: number;
  width: number;
  color?: string;
}

export interface PostImage{
  imageId:number;
  imageName:string;
  imageType:string;
  imageUrl:string;
}

export interface Post{
  postId:number;
  content:string;
  postedDate?:Date;
  author:User;
  replies?:Post[];
  likes:number;
  images:PostImage[];
  reposts:number;
  views:number;
  scheduled:boolean;
  scheduledDate?:Date;
  audience: 'EVERYONE' | 'CIRCLE';
  replyRestriction: 'EVERYONE' | 'FOLLOW' | 'CIRCLE' | 'MENTION'
}

export interface TenorCategories{
  image:string;
  name:string;
  path:string;
  searchterm:string;
}