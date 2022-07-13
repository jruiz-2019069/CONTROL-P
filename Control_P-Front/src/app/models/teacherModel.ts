export class TeacherModel{
    constructor(
        public _id: string,
        public name: string,
        public email: string,
        public usernameTeacher: string,
        public passwordTeacher: string,
        public role: string
    ){};
}