import { Isub } from "src/auth/interfaces/payload.interface";
import { ImailDataDefaultSend } from "../interfaces/mail.interface";
import { mailConstants } from "../constants";

export function returnMailDataDefault(authdata: Isub, mailData: ImailDataDefaultSend){
    return {
        to: authdata.userEmail,
        from: mailConstants.user_mail,
        subject: mailData.subject,
        html: mailData.html,
    }
}