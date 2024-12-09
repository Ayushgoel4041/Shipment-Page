export const apiConfig = {
  baseUrls: {
    otp: "https://apiv2.shiprocket.in/v1/auth/register/mobile/",
    baseUrl: "http://localhost:8000/api/",
    cargoUrl: "https://api-rocketbox.pickrr.com/api/",
    stageUrl: "https://api-cargo.shiprocket.in/api/",
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
    createPayment: {
      url: "payments/order/create/",
      method: "POST",
    },
    razorpayOrderCreate: {
      url: "payments/razorpay/order/create/",
      method: "POST",
    },
    kycDocUpload: {
      url: "kyc-doc-upload/",
      method: "POST",
    },
    gstRequestOtp:{
      url: "generate-kyc-otp/",
      method: "POST",
    },
    gstValidateOtp:{
      url: "verify-kyc-otp/",
      method: "POST",
    },
    createWarehouse:{
      url :"warehouses/",
      method:"POST",
    },
    orders:{
      url :"orders/",
      method:"POST",
    },
    orderShipmentAssociation:{
      url :"order_shipment_association/",
      method:"POST",
    },
    
  },
};
