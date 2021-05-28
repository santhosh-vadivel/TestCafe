import { ClientFunction, Selector } from 'testcafe'
import MailosaurClient from "mailosaur"
import Signup from '../utils/Signup'
import Login from '../utils/Login'
import SignupConfirmation from '../utils/SignupConfirmation'
import CompanyDetails from '../utils/CompanyDetails'

const client = new MailosaurClient("rm3MH2V3L0qUmbrf")
const mailosaurServerId = "7v01vuu9"
const emailAddress = "santhosh.vadivel@7v01vuu9.mailosaur.net"
const customercvr = "25628470"
let customerid

fixture ('Signup page').page ('https://app-demo.novemberfirst.com/#/public/signup')
.beforeEach(async () => await client.messages.deleteAll(mailosaurServerId))
test('SIGNUP TESTS', async t => {

    await t
    .click(Signup.LanguageDropdown)
    .click(Signup.LanguageOptions.withText('English'))

    //login link exists
    .expect(Signup.LoginLink.exists).ok()

    //Submit valid details and validate signup completed success message
    .typeText(Signup.CompanyInputField,customercvr)
    .typeText(Signup.FirstNameInputField,'Santhosh')
    .typeText(Signup.LastNameInputField,'V')
    .typeText(Signup.EmailInputField,emailAddress)
    .typeText(Signup.EmailConfirmInputField,emailAddress)
    .typeText(Signup.PhoneInputField,'8526144140')
    .click(Signup.Checkbox)
    .click(Signup.CreateAccountButton).takeScreenshot({
        path: 'Screenshots/signuppage.png',
        fullPage: true
    })

    .expect(SignupConfirmation.ConfirmationHeader.textContent).eql(' Please confirm your email ')
    .expect(SignupConfirmation.ConfirmationMessage.textContent).eql(' Please click on the link in the email we have sent you to continue the sign-up. It may take up to 5 min. before you receive the e-mail. ')

    await t.wait(195000)

    let message = await client.messages.get(mailosaurServerId, {
        sentTo: emailAddress
    })

    //extract the password reset link from the mail
    const PasswordResetLink = message.html.links[0].href
    console.log("The password reset link is" +PasswordResetLink)

    //verify password reset email
    await t.expect(message.subject).eql("Please verify your e-mail")
    await t.expect(message.to[0].email).eql(emailAddress)
    console.log("The email address is" +emailAddress)

    //navigate to password rest link and reset the password
    await t
    .navigateTo(PasswordResetLink)
    .typeText(Login.PasswordInputField, 'TestPassword@140')
    .typeText(Login.PasswordConfirmation, 'TestPassword@140')
    .click(Login.ConfirmationCheckbox1)
    .click(Login.ConfirmationCheckbox2)
    .click(Login.SetPassword)

    // verify the URL redirects to 'company-details' post the password reset
    const getLocation = ClientFunction(() => document.location.href)
    await t
    .expect(getLocation()).contains('onboarding/company-details')

    await t.takeScreenshot({
        path: 'Screenshots/setpassword.png',
        fullPage: true
    })

    customerid = await CompanyDetails.customeridField.textContent
    console.log("The customerid is" +customerid)

})//SIGNUP TESTS

fixture ('Valid Signin Test').page ('https://app-demo.novemberfirst.com/#/public')
test('Sign in Test with valid credentials', async t => {

    await t
    .resizeWindowToFitDevice('iPhone 6s',{
        portraitOrientation: true
    })
    const getWindowInnerWidthiPhone = ClientFunction(() => window.innerWidth);
    const innerWidthiPhone6s = await getWindowInnerWidthiPhone();
    await t.expect(innerWidthiPhone6s).eql(375)

    await t
    .resizeWindowToFitDevice('iPad Pro 9.7',{
        portraitOrientation: true
    })
    const getWindowInnerWidthiPad = ClientFunction(() => window.innerWidth);
    const innerWidthiPad = await getWindowInnerWidthiPad();
    await t.expect(innerWidthiPad).eql(768)

    await t
    .click(Signup.LanguageDropdown)
    .click(Signup.LanguageOptions.withText('English'))

    await t
    .expect(Login.SignupLink.exists).ok()
    .expect(Login.ForgotPasswordLink.exists).ok()

    await t
    //Login with valid credentials created above
    .typeText(Login.CustomerNumberInputField,customerid)
    .typeText(Login.EmailInputField,emailAddress)
    .typeText(Login.PasswordInputField, 'TestPassword@140')
    .click(Login.LoginButton).takeScreenshot({
        path: 'Screenshots/validloginpage.png',
        fullPage: true
    })

    // verify the URL redirects to 'company-details' post login
    const getLocation = ClientFunction(() => document.location.href)
    await t
    .expect(getLocation()).contains('onboarding/company-details')


})//Sign in test

fixture ('Invalid Signin Test').page ('https://app-demo.novemberfirst.com/#/public')
test('Sign in Test with invalid credentials', async t => {

    await t
    .click(Signup.LanguageDropdown)
    .click(Signup.LanguageOptions.withText('English'))

    await t
    //Login with invalid credentials
    .typeText(Login.CustomerNumberInputField,customerid)
    .typeText(Login.EmailInputField,emailAddress)
    .typeText(Login.PasswordInputField, 'InvalidPassword')
    .click(Login.LoginButton).takeScreenshot({
        path: 'Screenshots/invalidlogin.png',
        fullPage: true
    })

    //verify if alert exists for invalid credentials
    .expect(Login.LoginAlert.exists).ok()
    .expect(Login.LoginAlertMessage.textContent).contains(' Your login attempt was unsuccessful.  You have 5 attempts in total  before your user is  blocked for 24 hours.  Try again or reset the password  here. ')

    .takeScreenshot({
        path: 'Screenshots/invalidloginpage.png',
        fullPage: true
    })
    
    const hrefattr = await Login.ResetPasswordLink.getAttribute('href')
    await t.expect(hrefattr).eql('/#/public/forgot-password')
})//Sign in test
