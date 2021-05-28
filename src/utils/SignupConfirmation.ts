import { Selector } from 'testcafe';

class SignupConfirmation {
    ConfirmationHeader:Selector = Selector('n1-signup > h1')
    ConfirmationMessage:Selector = Selector('n1-signup > p')
}

export default new SignupConfirmation()