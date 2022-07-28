export default interface IEmail {
  send: (to: string, subject: string, html: string) => Promise<void>;
}
