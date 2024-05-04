import { makeAuth0ManagementApiRequest } from '../services/user-management-service';
import { config } from '../config/config';

export const deleteUser = (userId: string) => {
  // Initialize the URL to call the Auth0 API with the user ID
  const url = `https://${config.auth0.domain}/api/v2/users/${userId}`;
  return makeAuth0ManagementApiRequest('delete', url, {}, 'delete:users');
};

export const listUsers = () => {
  // Initialize the URL to call the Auth0 API to list all users
  const url = `https://${config.auth0.domain}/api/v2/users`;
  return makeAuth0ManagementApiRequest('get', url, {}, 'read:users');
};