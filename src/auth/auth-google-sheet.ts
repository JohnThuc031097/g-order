import { JWT } from 'google-auth-library'
import creds from '../../google-sheet-api.json';


const SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets',
];

export const sheetID = "1g6hwY8RYjoZkGtkzWKVvCSFx9gYmDoP5osxT77uE8Xg"

export const serviceAccountAuth = new JWT({
  email: creds.client_email,
  key: creds.private_key,
  scopes: SCOPES
});