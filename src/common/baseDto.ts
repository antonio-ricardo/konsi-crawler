export interface BaseDto<T> {
  (data: unknown): T;
}
