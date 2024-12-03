import React, { useEffect, useState } from "react";
import "./App.css";
import CreateShipment from "./components/createShipment";
import CourierSelection from "./components/selectCourier/CourierSelection";
import Navbar from "./components/Navbar/Navbar";
import CurrentWidth from "./CurrentWidth/UseCurrentWidth";
import Steps from "./components/stepsCount/Steps";
import Recharge from "./components/MakePayment.js/Recharge";
import VerifyFunctionality from "./components/VerifyContactDetails/VerifyFunctionality";
import Cookies from "js-cookie";
import { getFramelessShipment } from "./Features/shipmentApi";
import { useDispatch, useSelector } from "react-redux";
const App = () => {
  const width = CurrentWidth();
  const dispatch = useDispatch();
  const [next, setNext] = useState(1);
  const [openFullSideBar, setOpenFullSideBar] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hasScrolledOrClicked, setHasScrolledOrClicked] = useState(false);
  const [openVerifyContact, setOpenVerifyContact] = useState(false);
  const [userData, setUserData] = useState();

  // Function to be called when user scrolls or clicks

  const handleScrollOrClick = async () => {
    if (!hasScrolledOrClicked) {
      setTimeout(() => {
        someFunction();
        setHasScrolledOrClicked(true);
      }, 2000);
      window.removeEventListener("scroll", handleScrollOrClick);
      document.removeEventListener("click", handleScrollOrClick);
    }
  };

  const clientData = JSON.parse(localStorage.getItem("clientData")) || {};

  const someFunction = () => {
    setOpenVerifyContact(true);
  };

  const datadalo = {
    is_whastapp_log_enabled: false,
    is_ownkey: false,
    is_promise_enabled: false,
    analytics_info: [],
    is_multibrand_enabled: false,
    is_autorecharge_upgradable: 1,
    account_type: 0,
    client_id: "4420354",
    id: 434591264,
    first_name: "Ayush",
    last_name: "Goel",
    email: "ayush.goe1221l@pickrr.com",
    email_confirmed: 0,
    mobile: "9560496817",
    country_code: "+91",
    newpassbook: 0,
    company_id: 4224397,
    is_profile_complete: "true",
    is_plan_expired: false,
    plan_id: 1,
    plan_name: "Lite",
    is_recommended_plan: false,
    is_blackbox_seller: false,
    show_smart_optin: true,
    created_at: {
      date: "2024-01-17 12:40:03.000000",
      timezone_type: 3,
      timezone: "Asia/Kolkata",
    },
    role_type: ["owner"],
    is_auto_accept_notification_seen: 0,
    document_enable: 0,
    is_onboarding_complete: false,
    token:
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaXYyLnNoaXByb2NrZXQuaW4vdjEvYXV0aC9yZWdpc3Rlci9tb2JpbGUvdmFsaWRhdGUtb3RwIiwiaWF0IjoxNzMyODYzMTUwLCJleHAiOjE3MzM3MjcxNTAsIm5iZiI6MTczMjg2MzE1MCwianRpIjoieFVUd1JTTWJSMUI4UGZaVSIsInN1YiI6NDM0NTk2NCwicHJ2IjoiMDViYjY2MGY2N2NhYzc0NWY3YjNkYTFlZWYxOTcxOTVhMjExZTZkOSIsImNpZCI6NDIyNDM5N30.3wudr_Ox06Aqit_vRN1QtcQ9l5uf09dGrKsyRjsrXsQ",
    v_token: "",
    company_name: "ENAM",
    business_type: "",
    brand_name: "",
    tnc_accepted: false,
    is_fixed_plan: true,
    is_free_plan: true,
    is_basic_plan: false,
    is_smart_lite_plan: false,
    is_lite_plan: true,
    smart_plans: false,
    is_weight_dispute: true,
    is_statement: true,
    allow_bulk_dispute: false,
    allow_pid_insights: true,
    is_hul: false,
    inventory_sync_status: false,
    show_channel_page: true,
    international_documents_uploaded: false,
    gstn: false,
    is_shopify_app_user: false,
    is_wix_app_user: false,
    is_active_wix_plan: false,
    is_active_shopify_plan: false,
    kyc_status: 5,
    channel_limit: 100,
    allow_mps: 0,
    allow_checkout: 0,
    primary_pincode: 122002,
    is_seller: true,
    web_app_version: 1,
    billing_cycle: "NA",
    renewal_date: "NA",
    recurring_charge: false,
    whmcs_product_id: 0,
    is_downgraded: false,
    date_of_downgradation: "NA",
    days_till_downgraded: "NA",
    is_suspended: false,
    renewal_days_left: "NA",
    degarded_to_smart_lite: false,
    kyc_shipment_count_error: false,
    shipment_count: 1,
    kyc_shipment_check_rb: 1,
    kyc_shipment_check: 0,
    kyc_bulk_status: {
      2: 5,
    },
    tier: "BRONZE",
    tracking_url: "https://shiprocket.co/tracking/",
    hide_revenue: false,
    is_custom_user: false,
    is_recharge_pending: true,
    is_admin: false,
    admin_user_id: "",
    parent_email_id: "ayush.goel@pickrr.com",
    parent_mobile: "9560496817",
    allow_fbs: false,
    is_smart_fbs: false,
    allow_engage: false,
    allow_pickrr: false,
    allow_wigzo: false,
    allow_sr_convert: 0,
    allow_engage_push_order: false,
    allow_ds: false,
    allow_cod_verification: false,
    allow_prepaid_verification: false,
    parent_first_name: "Ayush",
    parent_last_name: "Goel",
    is_srbs_invoice: false,
    user_device_id: "12295f1b0c7f5b8d7f395dd5ec5841bc",
    is_kyc_new_strip: false,
    allow_change_payment_mode: false,
    support_contacts: {
      call_center_number: "9711621040",
    },
    is_kyc_mandate: false,
    utm_campaign: null,
    company_hash:
      "6f71b472bc9e3e197b3c5d34f810cb06eb415b824bc7e8202bc7d8d5dfd6427a",
    challan_enabled: false,
    admin_qc_enable: 0,
    new_key: 1,
    hashed_email:
      "eyJpdiI6IkFQc09vUkMrVWxZcy9VamJMUkpZSHc9PSIsInZhbHVlIjoidlFjN2hQQWNwRzhkQXpvSVdIRFlKUnhIYXBUNFB3Umw3WDhaRWJaRlhKdz0iLCJtYWMiOiI3NjE2YzJjMTEyYzYzZGFlOWY2MjI2ZWZiYzVmNTI0MDhlZGQxOTM2NjYyZmMxZmM5ZWE0NmI2NTdhYzkyZDAwIn0=",
    hashed_mobile:
      "eyJpdiI6InBBM0Q2VkJBSjB0QXpwRmR1dXlrTVE9PSIsInZhbHVlIjoiM2lqUUtJMHUralNlSjc0ck9VUVFwQnE0M3ZmdkZGM3c5SG5aWHgxZmxqVT0iLCJtYWMiOiJiYmMyY2I2NzZiOGEzODU2OTg0ZjQxZmRkZWFlMTVjYTFkNzg4ZDkwMjA5Yjc5OWQ2MWRjOWU3ZGFlMzFmZWZmIn0=",
    webengage_fresh_user: false,
    allow_bulk_eway: 0,
    ship_now_single_click: false,
    show_shopify_rating: false,
    show_quick_ship: false,
    hide_templatized_pricing: false,
    default_pickup_verify: 0,
    engage_promo_popup: false,
    is_rb_user: 0,
    allow_rb_panel: true,
    is_srf_user: 0,
    is_omuni2_user: 0,
    first_time_rb_signup: 1,
    ship_international: false,
    is_new_version: true,
    eori: "",
    ioss: "",
    tax_id: "",
    is_srx_iec_enabled: false,
    is_franchise_enabled: false,
    is_commercial_order: false,
    is_smart_assign_enable: false,
    auto_insurance_enable: false,
    auto_insurance_enable_india_post: true,
    default_insurace_opt_in_feature: true,
    insurance_enabled: true,
    minimum_insurance_threshold: 2500,
    maximum_insurance_liability: 475000,
    auto_srx_insurance_enable: false,
    srx_default_insurace_opt_in_feature: false,
    srx_insurance_enabled: true,
    minimum_srx_insurance_threshold: 0,
    maximum_srx_insurance_liability: 100000,
    minimum_srx_insurance_threshold_at_order_creation: 5000,
    show_auto_srx_insurance_popup: false,
    is_pro_plus_plan: false,
    is_samsung_user: false,
    is_product_recommendation_enabled: true,
    is_mfa_enabled: 0,
    bulk_assignment_api_url:
      "https://sr-core-awb-api.shiprocket.in/api/initiateAwbRequest",
    bulk_pickup_api_url:
      "https://sr-core-awb-api.shiprocket.in/api/initiatePickupRequest",
    is_pii_allow: 1,
    odPairCouriers: [
      135, 151, 152, 155, 161, 174, 176, 178, 187, 188, 189, 191, 192, 194, 200,
      211, 212, 219, 220, 224, 231, 246, 247, 288, 299, 304, 309, 337, 338, 358,
      360, 364, 374, 379, 380, 412, 413, 419, 420, 421, 428, 429, 430, 432, 433,
      434, 435, 437, 439, 443, 450, 453, 454, 455, 456, 457, 458, 459, 460, 521,
      522, 523, 524, 525, 532, 535, 536, 537, 538, 543, 548, 549, 552, 901, 63,
      175, 216, 119, 120, 121, 122, 123, 124, 139, 131, 215, 213, 100000, 306,
      359, 228,
    ],
    show_rto_score_popup: false,
    whatsapp_auto_opt: false,
    vendor_id: 0,
    enable_report_scheduler: 1,
    is_enabled_custom_notification_manager: 0,
    allow_fastrr: false,
    show_india_post_popup: false,
    is_pickrr: false,
    is_wib_enable: false,
    ondc_seller: 0,
    ondc_status: 0,
    show_quick_popup: 0,
    ondc_bank_report: false,
    one_impression_popup: false,
    is_engage_plus_enable: false,
    one_impression_user_id: 12375,
    squad_user: null,
    squad_user_id: null,
    enable_edit_cod_shopify_orders: 0,
    open_app_user: false,
    open_app_user_id: null,
    snowflake_reporting: false,
    enable_sr_ioss_for_future: false,
    enable_sr_eori_for_future: false,
    is_eligible_capital: false,
    isCataloguePrompt: false,
    isCatalogueEditBanner: true,
    show_insurance_popup: false,
    is_auto_insurance_popup: false,
    risk_prediction_enabled: 0,
    is_beamer_enabled: false,
    is_company_international: false,
    show_banner_to_integrate_channels: true,
    is_shopify_integrated: false,
    int_srx_serviceability: false,
    is_copilot_enabled: false,
    new_assignment: {
      enabled: 1,
      couriers: [
        130, 170, 171, 214, 344, 345, 346, 371, 388, 398, 414, 416, 424, 920,
        66, 67, 108, 109, 128, 238, 278, 310, 320, 334, 337, 338, 355, 361, 379,
        380, 387, 403, 427, 434, 435, 199, 297, 336, 352, 356, 385, 386, 390,
        406, 410, 433, 438, 439, 443, 19, 228, 298, 305, 218, 226, 230, 24, 25,
        27, 33, 51, 153, 159, 160, 204, 232, 244, 248, 271, 273, 303, 308, 333,
        343, 347, 353, 354, 394, 395, 411, 431, 39, 43, 68, 73, 100, 101, 110,
        127, 197, 198, 205, 227, 350, 370, 377, 404, 423, 21, 22, 55, 245, 367,
        368, 372, 391, 392, 393, 422,
      ],
    },
    enable_assignment_fallback: false,
    wigzo_engage_company: false,
    company_website_url: "",
    is_instantcash_allowed: false,
    instant_cash_enabled: false,
    instant_cash_block_msg: null,
    is_show_wallet_history: true,
    onboarding_steps: null,
    company_services: false,
    nswm: false,
    allow_exchange: false,
    is_new_channel_version: 0,
    show_audience_pop_up: false,
    freshdesk_company_id: 152001027547,
    show_on_hold_amount: 0,
    show_buyer_communication_settings: 0,
    early_cod_enabled: true,
    earlycod_popup_msg: "",
    order_added: 1,
    early_cod_button: true,
    show_enage_popup: false,
    ship_now_screen: 0,
  };

  const getFramelessShipmentFunction = async () => {
    try {
      await dispatch(getFramelessShipment(clientData)).unwrap();
    } catch (error) {
      console.log(error, "this is error if frameless tocket");
    }
  };

  useEffect(() => {
    const token = Cookies.get("BearerToken" || "");

    if (token) {
      getFramelessShipmentFunction();
    } else {
      window.addEventListener("scroll", handleScrollOrClick);
      document.addEventListener("click", handleScrollOrClick);

      return () => {
        window.removeEventListener("scroll", handleScrollOrClick);
        document.removeEventListener("click", handleScrollOrClick);
      };
    }
  }, [hasScrolledOrClicked]);

  useEffect(() => {
    if (width < 890) {
      setIsMobile(true);
    }
  }, [width]);

  const toggleSidebar = () => {
    setOpenFullSideBar((prev) => !prev);
  };
  console.log("this is the data after validation", userData);

  return (
    <div style={{ display: "flex" }}>
      <Navbar
        openFullSideBar={openFullSideBar}
        toggleSidebar={toggleSidebar}
        setOpenFullSideBar={setOpenFullSideBar}
      />
      <div
        style={{
          flexGrow: 1,
          transition: "margin-left 0.6s ease",
          marginLeft: isMobile ? "0px" : openFullSideBar ? "230px" : "70px", // Adjust based on sidebar state
          padding: !isMobile && "16px",
          marginTop: isMobile ? "55px" : "70px",
        }}
      >
        {!isMobile && <Steps setNext={setNext} next={next} />}
        {next === 1 && <CreateShipment setNext={setNext} next={next} />}
        {next === 2 && <CourierSelection setNext={setNext} />}
        {next === 3 && <Recharge />}
      </div>
      {openVerifyContact && (
        <VerifyFunctionality
          setOpenVerifyContact={setOpenVerifyContact}
          openVerifyContact={openVerifyContact}
          verifyContact={true}
          setUserData={setUserData}
          userData={userData}
        />
      )}
    </div>
  );
};

export default App;
