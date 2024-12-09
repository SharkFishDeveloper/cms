
import { User as AdapterUser } from "next-auth/adapters";
import "next-auth";

declare module "next-auth" {
  interface User extends AdapterUser {
    id: string;
    email: string;
    name: string;
    role: string; // Add the role field here
  }

  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: string;
    };
  }

  interface JWT {
    userId: string;
    role: string;
  }
}
