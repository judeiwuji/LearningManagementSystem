export interface Department {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  processing?: boolean;
}

export interface DepartmentActionRequest {
  name: string;
}
