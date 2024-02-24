interface userRegData {
  email: string;
  password: string;
  first_name: string;
  tag: string;
}

interface userRegData {
  username: string;
  password: string;
}

interface userLoginData {
  username: string;
  password: string;
}

interface confirmEmailData {
  code: number;
  user_id: number;
  email: string;
}

interface confirmEmailData {
  code: number;
  user_id: number;
  phone: string;
}

interface checkSmsData {
  code: string;
}

interface recoverData {
  username: string;
}

interface resendPhoneCodeData {
  user_id: string;
}

interface resendEmailCodeData extends resendPhoneCodeData {}

interface setPasswordData {
  token: string;
  password: string;
}

async function register(data: userRegData) {
  const response = await (
    await fetch('', { body: JSON.stringify(data) })
  ).json();
  return response;
}

// export function login(data: userLoginData) {
//   tg.sendData(JSON.stringify(data));
// }
