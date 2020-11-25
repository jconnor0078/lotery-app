import { environment as env} from "../environments/environment";

const ENDPOINT_BASE_SERVICES= env.SERVICES_HOST;

// SCREENS
//get screen data
export const ENDPOINT_GET_SCREEN_DATA_SERVICE = `${ENDPOINT_BASE_SERVICES}/screens/get-screen/`;


// Tickets
//save ticket
export const ENDPOINT_CREATE_TICKET = `${ENDPOINT_BASE_SERVICES}/tickets/create/`;
export const ENDPOINT_GET_TICKET_BY_CODE = `${ENDPOINT_BASE_SERVICES}/tickets/get-by-code/`;