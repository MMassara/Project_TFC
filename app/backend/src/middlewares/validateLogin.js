module.exports = (req, res) => {
  const { email, password } = req.body;
  const validateEmail = (e) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(e);
  };

  const validEmail = validateEmail(email);
  if (password.length < 6 || validEmail === false) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
};
