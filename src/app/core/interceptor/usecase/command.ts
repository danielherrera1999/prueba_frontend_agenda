import { UseCase } from "./use-case"

export abstract class Command<Result = void, Params = void> extends UseCase<Result, Params>{
  readonly = false;
}
