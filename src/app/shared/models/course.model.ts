export class Course {
  createdDate: string;
  lastModifiedDate: string;
  id: string;
  name: string;
  description: string;
  timezone: string;
  loading?: boolean;

  constructor() {
    this.createdDate = '';
    this.lastModifiedDate = '';
    this.id = '';
    this.name = '';
    this.description = '';
    this.timezone = '';
  }
}
