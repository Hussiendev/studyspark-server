export const validate = (data = {}, options = {}) => {
  const errors = {};

  // helper to treat null/undefined/blank as empty
  const isEmpty = (val) => val === undefined || val === null || String(val).trim() === '';

  // simple email pattern and password length option
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const minPasswordLength = options.passwordMinLength || 6;

  // normalize inputs to strings
  const email = data.email === undefined || data.email === null ? '' : String(data.email).trim();
  const name = data.name === undefined || data.name === null ? '' : String(data.name).trim();
  const password = data.password === undefined || data.password === null ? '' : String(data.password);

  // validate email
  if (isEmpty(email)) {
    errors.email = 'Email is required';
  } else if (!emailRegex.test(email)) {
    errors.email = 'Invalid email address';
  }

  // validate name (for signing up / profile)
  if (isEmpty(name)) {
    errors.name = 'Name is required';
  } else if (name.length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  // validate password (no confirm password here)
  if (isEmpty(password)) {
    errors.password = 'Password is required';
  } else if (password.length < minPasswordLength) {
    errors.password = `Password must be at least ${minPasswordLength} characters`;
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};