import { merge } from 'ramda';
import apiConfig from 'config/emailService';
import APIUtil from './index';

const api = new APIUtil(apiConfig.HOST);

export class EmailService {
  /**
   * @param {Object} emailData Formatted data for mailgun
   * @returns {AxiosPromise}
   */
  sendEmail(emailData) {
    const postData = merge({ key: localStorage.getItem('keycode') }, emailData);
    return api.post(apiConfig.ROUTES.SEND_EMAIL, postData);
  }

  /**
   * @param {Object} emailData Formatted data for mailgun
   * @returns {AxiosPromise}
   */
  checkKey(key) {
    return api.post(apiConfig.ROUTES.CHECK_KEY, { key: key });
  }
}

export default new EmailService();
