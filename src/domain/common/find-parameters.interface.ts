export default interface IFindParameters {
  skip: number;
  take: number;
  where?: object;
  order?: Record<string, string>;
}
