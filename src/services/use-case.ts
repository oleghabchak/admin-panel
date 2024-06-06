import { SignUpResponse } from './sign-up.response.ts';
import { ErrorResponse } from './error-response.ts';
import { axiosInstance } from './axios.config.ts';
import { SignUpRequest } from './sign-up.request.ts';

export const signUpUsecase = async (
  body: SignUpRequest
): Promise<[ErrorResponse | null, SignUpResponse | undefined]> => {
  try {
    const { data } = await axiosInstance.post<SignUpResponse>('auth/signin', body);
    return [null, data];
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
  } catch (error: never) {
    return [error.response.data as ErrorResponse, undefined];
  }
};
