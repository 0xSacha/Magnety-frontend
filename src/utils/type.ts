// Interface to defining our object of response functions
export interface ResponseFuncs {
    GET?: Function
    POST?: Function
    PUT?: Function
    DELETE?: Function
  }
  
  // Interface to define our Todo model on the frontend
  export interface Todo {
    _id?: number
    item: string
    completed: boolean
  }

  export interface UserInfo {
    _id?: number
    userAddress: String
    name: String
    description: String
    twitter: String
    linkedin: String
    telegram: String
    profilePic: string
  }