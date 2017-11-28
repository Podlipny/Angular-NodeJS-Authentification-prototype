export class User {
  email: number;
  name: string;
  author: string;
  facebook: {
      token: String,
      name: String,
      email: String
  };
  twitter: {
      token: String,
      displayName: String,
      username: String
  };
  google: {
      token: String,
      email: String,
      name: String
  };
}
