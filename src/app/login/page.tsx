'use client';

import { useWixClient } from '@/hooks/useWixClient';
import { LoginState } from '@wix/sdk';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import Cookies from 'js-cookie';

enum MODE {
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  RESET_PASSWORD = 'RESET_PASSEORD',
  EMAIL_VERIFICATION = 'EMAIL_VERIFICATION',
}
const LoginPage = () => {
  const wixClient = useWixClient();
  const router = useRouter();

  const isLoggedIn = wixClient.auth.loggedIn();

  // if (isLoggedIn) {
  //   router.push("/");
  // }

  console.log(isLoggedIn);
  const [mode, setMode] = useState(MODE.LOGIN);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailCode, setEmailCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const pathName = usePathname();

  const formTitle =
    mode === MODE.LOGIN
      ? 'Log in'
      : mode === MODE.REGISTER
        ? 'Register'
        : mode === MODE.RESET_PASSWORD
          ? 'Reset Your Password'
          : 'Verify Your Email';

  const buttonTitle =
    mode === MODE.LOGIN
      ? 'Login'
      : mode === MODE.REGISTER
        ? 'Register'
        : mode === MODE.RESET_PASSWORD
          ? 'Reset'
          : 'Verify';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      let response;
      switch (mode) {
        case MODE.LOGIN:
          response = await wixClient.auth.login({
            email,
            password,
          });
          break;
        case MODE.REGISTER:
          response = await wixClient.auth.register({
            email,
            password,
            // captchaTokens: { recaptchaToken: "<TOKEN>" },
            profile: { nickname: username },
          });
          break;
        case MODE.RESET_PASSWORD:
          response = await wixClient.auth.sendPasswordResetEmail(
            email,
            pathName,
          );
          setMessage('Password reset email sent. please check your e-mail.');
          break;
        case MODE.EMAIL_VERIFICATION:
          response = await wixClient.auth.processVerification({
            verificationCode: emailCode,
          });
          break;
        default:
          break;
      }

      console.log(response);

      switch (response?.loginState) {
        case LoginState.SUCCESS:
          setMessage('Successfull! you are being redirected!');
          const tokens = await wixClient.auth.getMemberTokensForDirectLogin(
            response.data.sessionToken,
          );
          Cookies.set('refreshToken', JSON.stringify(tokens.refreshToken), {
            expires: 2,
          });
          wixClient.auth.setTokens(tokens);
          router.push('/');
          console.log(922, tokens);

          break;
        case LoginState.FAILURE:
          if (
            response.errorCode === 'invalidEmail' ||
            response.errorCode === 'invalidPassword'
          ) {
            setError('Invalid Email or Password.');
          } else if (response.errorCode === 'emailAlreadyExists') {
            setError('Email already exists!');
          } else if (response.errorCode === 'resetPassword') {
            setError('You need to reset your passoword!');
          } else {
            setError('Something went wrong!');
          }
        case LoginState.EMAIL_VERIFICATION_REQUIRED:
          setMode(MODE.EMAIL_VERIFICATION);
        case LoginState.OWNER_APPROVAL_REQUIRED:
          setMessage('Your account is pending approval!');
        default:
          break;
      }
    } catch (error) {
      console.log(error);
      setError('Something went wrong!!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-80px)] items-center justify-center px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <form className="flex flex-col gap-8" action="" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-semibold">{formTitle}</h1>
        {mode === MODE.REGISTER ? (
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              placeholder="John"
              className="rounded-md p-4 ring-2 ring-gray-300"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        ) : null}
        {mode !== MODE.EMAIL_VERIFICATION ? (
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700">E-mail</label>
            <input
              type="email"
              name="email"
              placeholder="John@gmail.com"
              className="rounded-md p-4 ring-2 ring-gray-300"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700">Verification Code</label>
            <input
              type="text"
              name="emailCode"
              placeholder="Code"
              className="rounded-md p-4 ring-2 ring-gray-300"
              onChange={(e) => setEmailCode(e.target.value)}
            />
          </div>
        )}

        {mode === MODE.LOGIN || mode === MODE.REGISTER ? (
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="rounded-md p-4 ring-2 ring-gray-300"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        ) : null}
        {mode === MODE.LOGIN && (
          <div
            className="cursor-pointer text-sm underline"
            onClick={() => setMode(MODE.RESET_PASSWORD)}
          >
            Forgot Password?
          </div>
        )}
        <button
          className="rounded-md bg-lama p-2 text-white disabled:cursor-not-allowed disabled:bg-pink-200"
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : buttonTitle}
        </button>
        {error && <div className="text-red-600">{error}</div>}
        {mode === MODE.LOGIN && (
          <div
            className="cursor-pointer text-sm underline"
            onClick={() => setMode(MODE.REGISTER)}
          >
            {"Dont't"} have an account?
          </div>
        )}
        {mode === MODE.REGISTER && (
          <div
            className="cursor-pointer text-sm underline"
            onClick={() => setMode(MODE.LOGIN)}
          >
            Have an account?
          </div>
        )}
        {mode === MODE.RESET_PASSWORD && (
          <div
            className="cursor-pointer text-sm underline"
            onClick={() => setMode(MODE.LOGIN)}
          >
            Go back to Login
          </div>
        )}
        {message && <div className="text-sm text-green-600">{message}</div>}
      </form>
    </div>
  );
};

export default LoginPage;
