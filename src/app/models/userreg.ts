export interface Userreg  {
    userName: string ;
    email: string | null;
    firstName?: string | null;
    lastName?: string | null;
    isActive: boolean | true;
    address1?: string | null;
    address2?: string | null;
    city?: string | null;
    state?: string | null;
    country?: string | null;
    postalCode?: string | null;
    mobileNo?: string | null;
    gender?: string | null;
    dateOfBirth?: Date | null;
    managerId?: number | null;
    createdBy?: number | null;
    password: string | null;
    role: string | null;
}
