export const apiConfig = {
  baseUrls: {
    otp: "https://apiv2.shiprocket.in/v1/auth/register/mobile/",
    baseUrl: "http://localhost:8000/api/",
    cargoUrl: "https://api-rocketbox.pickrr.com/api/",

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
    getLocationFromPincode: {
      url: "common/get_location_from_pincode",
      method: "GET",
    },
    framelessShipment: {
      url: "frameless_shipment/",
      method: "POST",
    },
    charges: {
      url: "shipment/charges/",
      method: "POST",
    },
  },
};
