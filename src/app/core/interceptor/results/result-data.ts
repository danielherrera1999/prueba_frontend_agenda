export abstract class Result<T, E extends Error>{
  public readonly value?: T;
  public readonly error?: E;

  constructor(value?: T, error?: E){
    if (value !== undefined && error !== undefined) {
      throw new Error("Both value and error cannot be defined")
    }
  }

  valRight(): boolean{
    return this.value !== undefined
  }

  valLeft(): boolean{
    return this.error !== undefined
  }

  resultRight(onRight: (value: T) => void){
    if (this.valRight()) {
      onRight(this.value!)
    }
  }

  resultLeft(onLeft: (error: E) => void){
    if (this.valLeft()) {
      onLeft(this.error!)
    }
  }

  result(onRight: (value: T) => void, onLeft: (error: E) => void){
    if (this.valRight()) {
      onRight(this.value!)
    }else{
      onLeft(this.error!)
    }
  }
}

export class Right<T> extends Result<T, any>{
  public override readonly value?: T
  constructor(value: T){
    super()
    this.value = value
  }
}

export class Left<E extends Error> extends Result<any, E>{
  public override readonly error?: E
  constructor(error: E){
    super()
    this.error = error
  }
}
