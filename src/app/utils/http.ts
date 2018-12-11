import axios from 'axios';
import { error } from '../../common/utils/logger';

interface ICustomRequest {
  url: string;
  method?: string;
  payload?: any;
  onUploadProgress?: (progressEvent: any) => void;
  onDownloadProgress?: (progressEvent: any) => void;
  withCredentials?: boolean;
}

/**
 * Creates a new HTTP request
 */
const http = ({
  url,
  method = 'get',
  payload,
  onUploadProgress,
  onDownloadProgress,
  withCredentials = true,
}: ICustomRequest) => {
  // Enable CORS credentials
  axios.defaults.withCredentials = withCredentials;

  // Some interceptors to parse response or error
  axios.interceptors.response.use(
    response => response.data || response,
    requestError => {
      // Already parsed error
      if (requestError.errors) {
        return Promise.reject(requestError);
      }

      // Network error
      if (requestError.request && requestError.request.readyState === 4 && !requestError.response) {
        return Promise.reject({
          errors: [
            {
              body: 'Offline mode',
              channel: 'web',
              data: {
                isPermanent: true,
              },
              reason: 'connection',
              tag: 'offline-banner',
            },
          ],
        });
      }

      // Network OK
      if (requestError === '') {
        return Promise.reject(requestError);
      }

      return Promise.reject(requestError.response.data);
    }
  );

  // Choose axios method
  switch (method.toLowerCase()) {
    case 'get':
      return axios.get(url, {
        onDownloadProgress,
      });

    case 'post':
      return axios.post(url, payload, {
        onDownloadProgress,
        onUploadProgress,
      });

    default:
      error(`Unhandled HTTP <${method.toLowerCase()}> method was used. Using <get> instead`);

      return axios.get(url, {
        onDownloadProgress,
      });
  }
};

export default http;
