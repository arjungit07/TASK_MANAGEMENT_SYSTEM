const router = require("express").Router();
const pool = require("../config/db_config");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;


  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ error: "Please provide name, email, and password" });
  }

  try {
    const userCheck = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email",
      [name, email, hashedPassword]
    );

    res.status(201).json({ message: "User Registered Successfully" });
  } catch (err) {
    console.error("Error signing up user", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Please provide email and password' });
    }

    try {
        const userCheck = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userCheck.rows.length === 0) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

      const user = userCheck.rows[0];
      console.log(user)

      

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '10h',
        });

      res.status(200).json({
        token: token,
        user:user.id  
         });
    } catch (err) {
        console.error('Error during login', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
