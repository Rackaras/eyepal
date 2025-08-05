type Either<A, B> =
    | Readonly<[A, (null | undefined)?]>
    | Readonly<[null | undefined, B]>;

export type Result<T, E extends Error = Error> = Either<E, T>;

export type PromiseResult<T, E extends Error = Error> = Promise<Result<T, E>>;
