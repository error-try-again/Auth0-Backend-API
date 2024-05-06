import { config } from '../config/config';
import { makeAuth0ManagementApiRequest } from '../services/user-management-service';

export const listUsers = () => {
  // Initialize the URL to call the Auth0 API to list all users
  const url = `https://${config.auth0.domain}/api/v2/users`;
  return makeAuth0ManagementApiRequest('get', url, {}, 'read:users');
};