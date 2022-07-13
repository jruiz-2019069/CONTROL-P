export class SupervisorModel{
    constructor(
        public _id: string,
        public name: string,
        public nameCompany:string,
        public email: string,
        public usernameSupervisor: string,
        public passwordSupervisor: string,
        public role: string
    ){};
}