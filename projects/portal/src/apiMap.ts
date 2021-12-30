import {environment} from './environments/environment';

export const getApiName = (keyOfApi) => environment.baseApiUrl + '/' + keyOfApi;
export const getApiNameWithVariable = (firstUrl, variable, secondUrl) => firstUrl + '/' + variable + '/' + secondUrl;
export const BASE_URL = environment.baseApiUrl;
export const CSRF = 'auth/csrf';
export const DOCTORSESSION = 'auth/poc-user/session';
export const AUTH = 'auth/session';
export const LOGOUT = 'auth/logout';
export const LOOKUP = 'cms/lookup';
export const POCDEVICE = 'poc/devices';
export const CHANGE_PASSWORD = 'user/change-password';
export const CAMPAIGNS = 'outlet/portal/advertiser/campaigns';
export const LOOKUPFILTER = 'outlet/portal/advertiser/lookup';

export const ADVERTISEMENTAD= 'advertisement/ad';
export const ADVERTISEMENTADVERTISERS = 'advertisement/advertisers';
export const ADVERTISEMENTBRANDS = 'advertisement/brands';
export const ADVERTISEMENTCAMPAIGNS = 'advertisement/campaigns';

