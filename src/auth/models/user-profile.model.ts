export interface UserProfileModel {
  id: string;
  firstname: string;
  lastname?: string;
  phone: string;
  email: string;
  city: string;
  roles: UserRoleModel[];
}

export interface UserRoleModel {
  id: number;
  name: string;
}
