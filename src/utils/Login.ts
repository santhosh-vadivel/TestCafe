import { Selector } from 'testcafe';

class Login {
    SignupLink: Selector = Selector('n1-login-form p a')
    CustomerNumberInputField: Selector = Selector('input[name="customer-number"]')
    EmailInputField: Selector = Selector('input[name="email"]')
    PasswordInputField: Selector = Selector('input[name="password"]')
    ForgotPasswordLink: Selector = Selector('form > a')
    LoginButton: Selector = Selector('button[type="submit"]')
    PasswordConfirmation: Selector = Selector('input[name="password-confirmation"]')
    ConfirmationCheckbox1: Selector = Selector('mat-checkbox[formcontrolname="allowDataProcessing"]')
    ConfirmationCheckbox2: Selector = Selector('mat-checkbox[formcontrolname="allowMarketing"]')
    SetPassword: Selector = Selector('button[type="submit"]')
    LoginAlert: Selector = Selector('.mat-error[role="alert"]')
    LoginAlertMessage: Selector = Selector('.mat-error[role="alert"] div n1-auth-errors')
    ResetPasswordLink: Selector = Selector('.mat-error[role="alert"] div n1-auth-errors a')
}

export default new Login()