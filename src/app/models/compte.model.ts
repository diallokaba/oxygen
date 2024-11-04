export interface ICompte {
    _id?: string;
    solde?: number;
    dateCreation?: Date;
    soldeMaximum?: number;
    cummulTransactionMensuelle?: number;
}

export class Notification implements ICompte {
    constructor(
        public _id?: string,
        public solde?: number,
        public dateCreation?: Date,
        public soldeMaximum?: number,
        public cummulTransactionMensuelle?: number
    ) {}
}