  import express from "express";
  import mysql from "mysql";
  import cors from "cors";

  const app = express();
  app.use(express.json());
  app.use(cors());

  const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Allenjoy-2023",
    database: "market",
  });

  db.connect((err) => {
    if (err) {
      console.error("Error connecting to the database: ", err);
    } else {
      console.log("Connected to the database");
    }
  });

  const handleDatabaseError = (res, err) => {
    console.error("Database error: ", err);
    res.status(500).json({ error: "Internal Server Error" });
  };

  // Define a route to fetch data from the 'market_item' table
  app.get("/api/market_item", (req, res) => {
    const query = "SELECT id, it_name, it_desc, it_price, it_img, it_quantity FROM market_item";
  
    db.query(query, (error, results) => {
      if (error) {
        handleDatabaseError(res, error);
      } else {
        res.json(results);
      }
    });
  });

  // Define a route for admin registration
  app.post("/api/admin/register", (req, res) => {
    console.log('Received data:', req.body);
    const { admin_name, admin_username, admin_password, admin_birthday } = req.body;

    const query = 'INSERT INTO admin_ac (admin_name, admin_username, admin_password, admin_birthday) VALUES (?, ?, ?, ?)';
    const values = [admin_name, admin_username, admin_password, admin_birthday];

    db.query(query, values, (error, results) => {
      if (error) {
        handleDatabaseError(res, error);
      } else {
        res.json({ message: 'Admin registered successfully', adminId: results.insertId });
      }
    });
  });

  // Define a route for adding items to the market_item table


  // Define a route for admin login
  app.post("/api/admin/login", (req, res) => {
    console.log("Received login data:", req.body);
    const { admin_username, admin_password } = req.body;

    const query = "SELECT * FROM admin_ac WHERE admin_username = ? AND admin_password = ?";
    const values = [admin_username, admin_password];

    db.query(query, values, (error, results) => {
      if (error) {
        handleDatabaseError(res, error);
      } else {
        if (results.length > 0) {
          // Admin login successful
          res.json({ message: "Admin login successful", adminData: results[0] });
        } else {
          // Admin login failed
          res.status(401).json({ error: "Invalid credentials" });
        }
      }
    });
  });

  // Define a route for user registration
  app.post("/api/user/register", (req, res) => {
    console.log('Received user registration data:', req.body);
    const { user_name, user_username, user_password } = req.body;

    const query = 'INSERT INTO user_ac (user_name, user_username, user_password) VALUES (?, ?, ?)';
    const values = [user_name, user_username, user_password];

    db.query(query, values, (error, results) => {
      if (error) {
        console.error('Error executing database query:', error);
        handleDatabaseError(res, error);
      } else {
        console.log('User registered successfully. Insert ID:', results.insertId);
        res.json({ message: 'User registered successfully', userId: results.insertId });
      }
    });
  });

  app.post('/api/user/login', (req, res) => {
    console.log('Received login data:', req.body);
    const { user_username, user_password } = req.body;

    const query = 'SELECT * FROM user_ac WHERE user_username = ? AND user_password = ?';
    const values = [user_username, user_password];

    db.query(query, values, (error, results) => {
      if (error) {
        handleDatabaseError(res, error);
      } else {
        if (results.length > 0) {
          // User login successful
          res.json({ message: 'User login successful', userData: results[0] });
        } else {
          // User login failed
          res.status(401).json({ error: 'Invalid credentials' });
        }
      }
    });
  });
    
  app.delete("/api/market_item/delete/:id", (req, res) => {
    const itemId = req.params.id;
  
    if (!itemId || isNaN(itemId)) {
      console.error('Invalid or missing item ID');
      return res.status(400).json({ error: 'Invalid or missing item ID' });
    }
  
    const query = "DELETE FROM market_item WHERE id = ?";
    const values = [itemId];
  
    db.query(query, values, (error) => {
      if (error) {
        console.error('Error deleting item:', error);
        handleDatabaseError(res, error);
      } else {
        console.log('Item deleted successfully');
        res.json({ message: 'Item deleted successfully', itemId });
      }
    });
  });

  app.post("/api/market_item/add", (req, res) => {
    console.log('Received data for adding item:', req.body);
    const { it_name, it_desc, it_price, it_img, it_quantity } = req.body;
  
    const query = 'INSERT INTO market_item (it_name, it_desc, it_price, it_img, it_quantity) VALUES (?, ?, ?, ?, ?)';
    const values = [it_name, it_desc, it_price, it_img, it_quantity];
  
    db.query(query, values, (error, results) => {
      if (error) {
        return handleDatabaseError(res, error);
      }
  
      console.log('Item added successfully. Insert ID:', results.insertId);
      res.json({ message: 'Item added successfully', itemId: results.insertId });
    });
  });

  app.put("/api/market_item/update/:id", (req, res) => {
    const itemId = req.params.id;
    const { it_name, it_desc, it_price, it_img, it_quantity } = req.body;
  
    const query = "UPDATE market_item SET it_name=?, it_desc=?, it_price=?, it_img=?, it_quantity=? WHERE id=?";
    const values = [it_name, it_desc, it_price, it_img, it_quantity, itemId];
  
    db.query(query, values, (error) => {
      if (error) {
        console.error('Error updating item:', error);
        handleDatabaseError(res, error);
      } else {
        console.log('Item updated successfully');
        res.json({ message: 'Item updated successfully', itemId });
      }
    });
  });
  const PORT = 8800;
  app.listen(PORT, () => {
    console.log(`Backend is connected on port ${PORT}`);
  });
