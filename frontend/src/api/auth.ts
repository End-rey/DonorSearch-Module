interface userRegEmailData {
  email: string;
  password: string;
  first_name: string;
  action: string;
}
interface userRegPhoneData {
  phone: string;
  password: string;
  first_name: string;
  action: string;
}

interface userLoginData {
  username: string;
  password: string;
  action: string;
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

export function login(data: userLoginData) {
  Telegram.WebApp.sendData(JSON.stringify(data));
}
export function registrationEmail(data: userRegEmailData) {
  Telegram.WebApp.sendData(JSON.stringify(data));
}
export function registrationPhone(data: userRegPhoneData) {
  Telegram.WebApp.sendData(JSON.stringify(data));
}

export function donation(data: any) {
  Telegram.WebApp.sendData(JSON.stringify(data));
}
export function notification(data: any) {
  Telegram.WebApp.sendData(JSON.stringify(data));
}
