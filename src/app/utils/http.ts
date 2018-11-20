import axios from 'axios';
import { error } from '../../common/utils/logger';

interface CustomRequest {
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
}: CustomRequest) => {
  // Enable CORS credentials
  axios.defaults.withCredentials = withCredentials;

  // Some interceptors to parse response or error
  axios.interceptors.response.use(
    response => response.data || response,
    error => {
      // Already parsed error
      if (error.errors) {
        return Promise.reject(error);
      }

      // Network error
      if (error.request && error.request.readyState === 4 && !error.response) {
        return Promise.reject({
          errors: [
            {
              channel: 'web',
              reason: 'connection',
              body: 'Offline mode',
              tag: 'offline-banner',
              data: {
                isPermanent: true,
              },
            },
          ],
        });
      }

      // Network OK
      if (error === '') {
        return Promise.reject(error);
      }

      return Promise.reject(error.response.data);
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
        onUploadProgress,
        onDownloadProgress,
      });

    default:
      error(`Unhandled HTTP <${method.toLowerCase()}> method was used. Using <get> instead`);

      return axios.get(url, {
        onDownloadProgress,
      });
  }
};

export default http;
