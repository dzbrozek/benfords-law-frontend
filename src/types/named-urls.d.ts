declare module 'named-urls' {
  interface ReverseParams {
    [path: string]: number | string;
  }

  function include<R>(
    base: string,
    routes: R,
  ): { [K in keyof R]: R[K] } & { toString(): string };

  function reverse(pattern: string, params?: ReverseParams): string;
  function reverseForce(pattern: string, params?: ReverseParams): string;
}
