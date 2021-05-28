import { Selector } from 'testcafe';

class CompanyDetails {
    customeridField: Selector = Selector('div.account-info > div > span.current-user-number')
}

export default new CompanyDetails()