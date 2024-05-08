import { getManagementAccessToken } from './token-service';
import axios, { isAxiosError } from 'axios';

export async function makeAuth0ManagementApiRequest(
  method: string,
  url: string,
  data: unknown,
  scope: string
) {
  // Retrieve the management token from the token service to make the request
  const managementToken = await getManagementAccessToken();

  // Data is required for patch requests/updating user data
  if (method === 'patch' && !data) {
    throw new Error('Missing Content: Data is required for this request');
  }

  try {
    // Initialize the headers object containing the management token and the content type of the request
    const headers = {
      Authorization: `Bearer ${managementToken}`,
      'Content-Type': 'application/json',
      scope
    };

    // Combine the initial values into a single config
    const config = { data, headers, method, url };

    // Perform the request to the Auth0 API
    const response = await axios(config);

    return response.data;
  } catch (error) {
    // If the error is an Axios error, throw an error with the status and data
    if (isAxiosError(error)) {
      let errorData = error.response?.data;

      // Handle the error data as an object and throw a meaningful error message
      if (errorData && typeof errorData === 'object') {
        errorData = JSON.stringify(errorData);
        throw new Error(`Auth0 API error: ${errorData} - ${error?.message}`);
      } else {
        throw new TypeError(
          `Auth0 API error: No data object returned - ${error?.message}`
        );
      }
    }
    throw new Error('Unexpected error');
  }
}