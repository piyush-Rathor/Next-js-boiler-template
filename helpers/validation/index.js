export const isEmailValid = (email) => {
  return /^\w+([.-/+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
};

export const isValidPassword = (password) => {
  return /((?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*\W)\w.{6,18}\w)/.test(password);
};

export const isValidOtp = (otp) => {
  return /^(\d\s*){6}$/.test(otp);
};
