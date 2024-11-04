import { IUtilisateur, Utilisateur } from "./utilisateur.model";

export interface IDeplafonnement{
    _id?: string;
    photoPiece1?: string;
    photoPiece2?: string;
    status?: string;
    utilisateur?:IUtilisateur;
    dateCreation?: Date;
    typePiece?: string;
}

export class Deplafonnement implements IDeplafonnement{
    constructor(
        public _id?: string,
        public photoPiece1?: string,
        public photoPiece2?: string,
        public status?: string,
        public user?:Utilisateur,
        public dateCreation?: Date,
        public typePiece?: string
    ){}
}