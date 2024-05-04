// src/services/tokenService.ts
import axios from 'axios';
import { config } from '../config/config';
// Initialize the cachedToken object to store the token and expiry date in memory
let cachedToken: { token: string; expiry: Date } | undefined;

async function fetchNewToken(): Promise<string> {

  // Initialize the URL to call the Auth0 API
  const url = `https://${config.auth0.domain}/oauth/token`;

  // Initialize the data object that will be sent to Auth0 to request the management token
  const managementData = {
    audience: config.auth0.audience,
    client_id: config.auth0.clientId,
    client_secret: config.auth0.clientSecret,
    grant_type: 'client_credentials'
  };

  // Initialize the headers object that will be stored in the config object
  const headers = {
    'Content-Type': 'application/json'
  };

  // Store the headers inside it's own config object
  const asyncConfig = {
    headers
  };

  // Request the initial management token from Auth0 which will be used to make further requests
  const response = await axios.post(url, managementData, asyncConfig);

  if (!response.data.access_token) {
    throw new Error('Failed to fetch management token');
  }

  // Specify when the token will expire
  const expiry = new Date(Date.now() + response.data.expires_in * 1000);

  // Store the token and expiry date in the cachedToken object for future use
  cachedToken = {
    expiry, token: response.data.access_token
  };

  return cachedToken.token;
}

export const getManagementToken = async (): Promise<string> => {
  // If the cached token and the new date are less than the cached token expiry date, return the cached token
  // otherwise fetch a new token
  if (cachedToken && new Date() < cachedToken.expiry) {
    return cachedToken.token;
  }

  return fetchNewToken();
};