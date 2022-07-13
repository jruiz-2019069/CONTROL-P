export class AlumnModel{
    constructor(
        public _id: string,
        public name: string,
        public carnet:string,
        public email: string,
        public usernameAlumn: string,
        public passwordAlumn: string,
        public hoursDone: number,
        public idGroup: string,
        public idSupervisor: string,
        public role:string
    ){};
}