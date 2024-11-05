import { ITypeTransaction, TypeTransaction } from "./type-transaction.model";

export interface ITransaction {
    _id?: string;
    sender?: string;
    receiver?: string;
    montant?: Number;
    etat?: string;
    date?: Date;
    TypeTransaction?: ITypeTransaction;
}

export class Transaction implements ITransaction {
    constructor(
        public _id?: string,
        public sender?: string,
        public receiver?: string,
        public montant?: Number,
        public etat?: string,
        public date?: Date,
        public TypeTransaction?: ITypeTransaction
    ) {}
}