export class Failure extends Error{
  constructor(message: string){
    super(message)
    this.name = 'Failure'
  }
}

export class ServerFailure extends Failure{
  constructor(message: string){
    super(message)
    this.name = 'ServerFailure'
    Object.setPrototypeOf(this, ServerFailure.prototype)
  }
}
