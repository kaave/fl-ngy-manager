interface IUserSrc {
  id: number;
  name: string;
  email: string;
  devices: { id: number }[];
}

export default IUserSrc;