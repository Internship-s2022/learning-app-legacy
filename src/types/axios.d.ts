// eslint-disable-next-line @typescript-eslint/no-unused-vars
import axios from 'axios';

import { CustomResponse } from 'src/interfaces/api';

declare module 'axios' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface AxiosResponse<T> extends CustomResponse<T> {}
}
