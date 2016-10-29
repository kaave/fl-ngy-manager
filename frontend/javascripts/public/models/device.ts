export interface IDevice {
  id?: number;
  name: string;
  typeCode: number;
  key: string;
  source?: string;
};

export interface IDeviceApi {
  id: number;
  name: string;
  key: string;
  type_code: number;
  source: string;
  user_id: number;
}

export default class DeviceModel {
  id?: number;
  name: string;
  typeCode: number;
  key: string;
  source?: string;

  constructor(prev?: IDevice) {
    this.init(prev);
  }

  init(prev?: IDevice): void {
    if (prev) {
      this.id = prev.id;
      this.name = prev.name;
      this.typeCode = prev.typeCode;
      this.key = prev.key;
      this.source = prev.source;
    } else {
      this.name = '';
      this.typeCode = -1;
      this.key = '';
    }
  }

  IsValid(): boolean {
    return (
      this.IsValidName() &&
      this.IsValidTypeCode() &&
      this.IsValidKey()
    );
  }

  IsValidName(): boolean {
    return this.name.length > 0;
  }

  IsValidTypeCode(): boolean {
    return this.typeCode > 0;
  }

  IsValidKey() : boolean {
    return this.key.length > 0;
  }

  static parse(source: string): DeviceModel {
    const matcher = source.match(/^Type(\d+)Tag .+ ID=([0-9A-F]+)/);

    if (!matcher) {
      throw new TypeError(`Error! source[${source}] is not matched to DeviceSrc`)
    }

    return new DeviceModel({
      source,
      name: '',
      key: matcher[2],
      typeCode: parseInt(matcher[1], 10)
    });
  }

  static parseApiResult(data: IDeviceApi): DeviceModel {
    return new DeviceModel({
      id: data.id,
      source: data.source,
      name: data.name,
      key: data.key,
      typeCode: data.type_code
    });
  }

  toFormData(): FormData {
    const formData = new FormData();

    formData.append('name', this.name);
    formData.append('key', this.key);
    formData.append('type_code', this.typeCode);

    if (this.id) {
      formData.append('id', this.id);
    }

    if (this.source) {
      formData.append('source', this.source);
    }

    return formData;
  }

  toJSON(): IDevice {
    const result: IDevice = {
      name: this.name,
      key: this.key,
      typeCode: this.typeCode
    };

    if (this.id) {
      result.id = this.id;
    }

    if (this.source) {
      result.source = this.source;
    }

    return result;
  }
}
