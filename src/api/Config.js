export const apiConfig = {
  baseUrls: {
    otp: "https://apiv2.shiprocket.in/v1/auth/register/mobile/",
    // user:'',
    // auth:'',
    //rest api end baseurls
  },
  endpoints: {
    requestOtp: {
      url: "request-otp",
      method: "POST",
    },
    validateOtp: {
      url: "validate-otp",
      method: "POST",
    },
  },
};
