export interface signup{
  name:string
  password:string
  emial:string
}

export interface login{

  password:string
  email:string
}

export interface product{
  id: number
  name:string
  Price:number
  category:string
  color:string
  discription:string
  Image:string
  quantity:undefined | number
}

export interface cart{
  id: number | undefined
  name:string
  Price:number
  category:string
  color:string
  discription:string
  Image:string
  quantity:undefined | number
  userId:number
  productId:number
}
