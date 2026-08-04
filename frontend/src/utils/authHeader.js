
import { auth } from '../firebase/firebase.config';

export async function authHeader() {
  const token = await auth.currentUser?.getIdToken();
  return { Authorization: `Bearer ${token}` };
}