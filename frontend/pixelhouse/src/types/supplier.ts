export type SupplierType = {
    _id: string;
    name: string;
    cnpj: string;
    email: string;
    street: string;
    number: string;
    district: string;
    city: string;
    zipcode: string;
    created_at: string;
    updated_at: string;
};

export const InitialSupplierState: SupplierType = {
    _id: '',
    name: '',
    cnpj: '',
    email: '',
    street: '',
    number: '',
    district: '',
    city: '',
    zipcode: '',
    created_at: '',
    updated_at: ''
}