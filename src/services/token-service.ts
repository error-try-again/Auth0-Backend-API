// src/services/tokenService.ts
import axios from 'axios';
import { config } from '../config/config';

// Initialize the cachedToken object to store the token and expiry date in memory
let cachedAccessToken: { token: string; expiry: Date } | undefined;

async function fetchNewAccessToken(): Promise<string> {

  // Initialize the URL to call the Auth0 API
  const url = `https://${config.auth0.domain}/oauth/token`;

  // Initialize the data object that will be sent to Auth0 to request the management token
  const managementData = {
    audience: config.auth0.managementAudience,
    client_id: config.auth0.clientId,
    client_secret: config.auth0.clientSecret,
    grant_type: config.auth0.grantType
  };

  // Initialize the headers object that will be stored in the config object
  const headers = {
    'Content-Type': 'application/json'
  };

  // Request the initial management token from Auth0 which will be used to make further requests
  const response = await axios.post(url, managementData, { headers });

  if (!response.data.access_token) {
    throw new Error('Failed to fetch management token');
  }

  // Specify when the token will expire
  const expiry = new Date(Date.now() + response.data.expires_in * 1000);

  // Store the token and expiry date in the cachedToken object for future use
  cachedAccessToken = {
    expiry, token: response.data.access_token
  };

  return cachedAccessToken.token;
}

export const getManagementAccessToken = async (): Promise<string> => {
  // If the cached token and the new date are less than the cached token expiry date, return the cached token
  // otherwise fetch a new token
  if (cachedAccessToken && new Date() < cachedAccessToken.expiry) {
    return cachedAccessToken.token;
  }

  return fetchNewAccessToken();
};