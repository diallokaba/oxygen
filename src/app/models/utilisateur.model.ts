export interface IUtilisateur {
    _id?: number;
    nom?: string;
    prenom?: string;
    mdp?: string;
    telephone?: string;
    role?: string;
    photoProfile?: string;
    premiereConnexion?: boolean;
    token?: string;
    codeDeVerification?: string;
    photoPiece1?: string;
    photoPiece2?: string;
}

export class Utilisateur implements IUtilisateur {
    constructor(
        public _id?: number,
        public nom?: string,
        public prenom?: string,
        public photoProfile?: string,
        public mdp?: string,
        public telephone?: string,
        public role?: string,
        public token?: string,
        public codeDeVerification?: string,
        public photoPiece1?: string,
        public photoPiece2?: string,
        public premiereConnexion?: boolean
    ) {}
}