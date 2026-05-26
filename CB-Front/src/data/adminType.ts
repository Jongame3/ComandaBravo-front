export type AdminTab = "overview" | "products" | "pending" | "appointments";


export type Appointment = {
  id: number;
  userId: number;
  username: string;
  productInfo: string;
  startTime: number;
  date: string;
  petInfo: string;
  petType : number;
  isApproved: boolean;
};

export type Product = {
  id: number
  name : string;
  price : number;
  description : string;
  duration: number;
};

export type ProductCreate = {
  Name : string;
  Price : number;
  Description : string;
  Duration: number;
};
