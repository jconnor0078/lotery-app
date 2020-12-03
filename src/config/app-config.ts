import { environment as env} from "../environments/environment";

const ENDPOINT_BASE_SERVICES= env.SERVICES_HOST;

// SCREENS
//get screen data
export const ENDPOINT_GET_SCREEN_DATA_SERVICE = `${ENDPOINT_BASE_SERVICES}/screens/get-screen/`;


// Tickets
//save ticket
export const ENDPOINT_CREATE_TICKET = `${ENDPOINT_BASE_SERVICES}/tickets/create/`;
export const ENDPOINT_GET_TICKET_BY_CODE = `${ENDPOINT_BASE_SERVICES}/tickets/get-by-code/`;
export const ENDPOINT_CANCEL_TICKET_BY_CODE = `${ENDPOINT_BASE_SERVICES}/tickets/cancel-ticket/`;
export const ENDPOINT_CONSULT_TICKET = `${ENDPOINT_BASE_SERVICES}/tickets/consult-ticket/`;
export const ENDPOINT_PAY_TICKET = `${ENDPOINT_BASE_SERVICES}/tickets/pay-ticket/`;

//Reports
export const ENDPOINT_REPORT_SALES_SUMMARY = `${ENDPOINT_BASE_SERVICES}/reports/sales-summary/`;