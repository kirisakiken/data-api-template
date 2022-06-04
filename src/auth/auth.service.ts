import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
    signup() {
        return 'Signed up succeed!'
    }

    signin() {
        return 'Signin succeed'
    }
}