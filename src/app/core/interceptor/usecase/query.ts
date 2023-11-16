import { UseCase } from "./use-case";

export abstract class Query<Result = void, Params = void> extends UseCase<Result, Params>{
  readonly = false;
}
