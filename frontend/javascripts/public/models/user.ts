export interface IUser {
  id: number;
  name: string;
  email: string;
}

export default class User implements IUser {
  id: number;
  name: string;
  email: string;

  constructor(prev?: IUser) {
    this.init(prev);
  }

  init(prev?: IUser): void {
    if (prev) {
      this.id = prev.id;
      this.name = prev.name;
      this.email = prev.email;
    } else {
      this.name = '';
      this.email = '';
    }
  }

  IsValid(): boolean {
    return (
      this.IsValidId() &&
      this.IsValidName() &&
      this.IsValidEMail()
    );
  }

  IsValidId(): boolean {
    return this.id > 0;
  }

  IsValidName(): boolean {
    return this.name.length > 0;
  }

  IsValidEMail(): boolean {
    return this.email.match(/@framelunch.jp$/) != null
  }

  toFormData(): FormData {
    const formData = new FormData();

    formData.append('name', this.name);
    formData.append('email', this.email);

    return formData;
  }

  toJSON(): IUser {
    const result: IUser = {
      id: this.id,
      name: this.name,
      email: this.email
    };

    return result;
  }
}
