export interface IRadio {
  id?: number;
  name: string;
  url: string;
  memo: string;
};

export default class RadioModel {
  id?: number;
  name: string;
  url: string;
  memo: string;

  constructor(prev?: IRadio) {
    this.init(prev);
  }

  init(prev?: IRadio): void {
    if (prev) {
      this.id = prev.id;
      this.name = prev.name;
      this.url = prev.url;
      this.memo = prev.memo;
    } else {
      this.name = '';
      this.url = '';
      this.memo = '';
    }
  }

  IsValid(): boolean {
    return (
      this.IsValidName() &&
      this.IsValidUrl() &&
      this.IsValidMemo()
    );
  }

  IsValidName(): boolean {
    return this.name.length > 0;
  }

  IsValidUrl(): boolean {
    return this.url.match(/^https?:\/\/[\d\w+]/) != null;
  }

  IsValidMemo() : boolean {
    // TODO: 特に制限はなし
    return true;
  }

  toJSON(): IRadio {
    const result: IRadio = {
      name: this.name,
      url: this.url,
      memo: this.memo
    };

    if (this.id) {
      result.id = this.id;
    }

    return result;
  }
}
