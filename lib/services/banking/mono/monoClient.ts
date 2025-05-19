import { Mono } from "mono-node";

export class PatchedMonoClass extends Mono {
  constructor(secretKey: string) {
    super({ secretKey: secretKey });
    // Fix the API base URL
    (this as any).apiURL = "https://api.withmono.com/v2";

    // Patch the path without replacing the whole object
    if ((this as any).auth) {
      (this as any).auth.path = "/accounts/auth";
    }
  }
}
