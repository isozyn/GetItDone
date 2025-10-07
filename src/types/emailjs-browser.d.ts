declare module '@emailjs/browser' {
  /** Minimal types for EmailJS browser SDK used in this project. */
  export function init(userId: string): void;
  export function send(
    serviceID: string,
    templateID: string,
    templateParams: Record<string, any>,
    publicKey?: string
  ): Promise<any>;

  const emailjs: {
    init: typeof init;
    send: typeof send;
  };

  export default emailjs;
}
