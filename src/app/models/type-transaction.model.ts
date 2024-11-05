export interface ITypeTransaction {
    _id?: string;
    nom?: string;
    frais?: Number;
    etat?: boolean;
}

export class TypeTransaction implements ITypeTransaction {
    constructor(
        public _id?: string,
        public nom?: string,
        public frais?: Number,
        public etat?: boolean
    ) {}
}