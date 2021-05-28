import { Selector } from 'testcafe';

class Signup {
    LanguageDropdown:Selector = Selector('div.language-dropdown-bar div.mat-select-arrow-wrapper')
    LanguageOptions:Selector = Selector('div[role="listbox"] .mat-option-text')
    LoginLink:Selector = Selector('p > a.link')
    CompanyInputField:Selector = Selector('input[name="registration-number"]')
    FirstNameInputField:Selector = Selector('input[name="first-name"]')
    LastNameInputField:Selector = Selector('input[name="last-name"]')
    EmailInputField:Selector = Selector('input[name="email"]')
    EmailConfirmInputField:Selector = Selector('input[formcontrolname="emailConfirmation"]')
    PhoneInputField:Selector = Selector('input[type="tel"]')
    Checkbox:Selector = Selector('input[type="checkbox"]')
    CreateAccountButton:Selector = Selector('button[type="submit"]')
}

export default new Signup()