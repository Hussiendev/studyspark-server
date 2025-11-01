import { PASSWORD_RESET_REQUEST_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE,PASSWORD_RESET_SUCCESS_TEMPLATE } from "./emaileTemplate.js";
import { Mailtrapclient, sender } from "./mailtrap.config.js";
 export const  sendVerificationToken=async(email,verificationToken)=>{
    const recep=[{email}];
    try{

        const response= await Mailtrapclient.send({
            from:sender,
            to:recep,
            subject:"Verify your email",
            html:VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}",verificationToken),
            category:"Email Verfication"

            
        })
        console.log("email send succ",response);
    }catch(error){
        console.log(error);
        throw new Error(`error cosending verfication emaile to ${email}`)
    }
}
