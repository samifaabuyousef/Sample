export interface ViewPagedData<T> {
    data:attributeVal<T>[]
  }
  
export class attributeVal<T>{
      attribue: String;
      value ? : T
  }