import APIUtil from './index';
import apiConfig from 'config/emailService';

const api = new APIUtil(apiConfig.HOST);

export class EmailService {
  /**
   * @param {Object} emailData Formatted data for mailgun
   * @returns {AxiosPromise}
   */
  sendEmail(emailData) {
    return api.post(apiConfig.ROUTES.SEND_EMAIL, emailData);
  }

  /**
   * @param {Object} emailData Formatted data for mailgun
   * @returns {AxiosPromise}
   */
  checkKey(key) {
    return api.post(apiConfig.ROUTES.SEND_EMAIL, { key: key});
  }
}

export default new EmailService();
