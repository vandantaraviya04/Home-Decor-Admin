export async function signInWithPassword({ email, password }) {
  if (email === 'admin@homedecor.com' && password === 'admin123') {
    if (typeof window !== 'undefined') {
      localStorage.setItem('admin-auth', JSON.stringify({ email, authenticated: true }));
    }
    return { user: { email } };
  }
  throw new Error('Invalid email or password');
}

export async function signOut() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('admin-auth');
  }
}
