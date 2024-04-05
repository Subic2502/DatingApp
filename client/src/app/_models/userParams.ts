import { User } from "./user";

export class UserParams {
    gender: string;
    minAge = 18;
    maxAge = 99;
    pageNumber = 1;
    pageSize = 2;
    orderBy = 'lastActive';
    username: string;

    constructor(user: User) {
        this.gender = user.gender === 'female' ? 'male' : 'female';
        this.username = user.username;
    }

    getUsername() {
        return this.username;
    }
}