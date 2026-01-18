#  Everfree – Flower Shop Project

A Full-Stack Web Application for a flower shop. This project allows users to browse flowers and add them to a cart, while administrators can manage the inventory (create and delete products) via a dedicated Admin Panel.

The backend is built with **Node.js & Express**, connected to a **MongoDB Atlas** cloud database.

##  Project Structure

*   `models/` - Mongoose schemas (Flower.js, Order.js)
*   `index.js` - Main server file (API routes, validation, configuration)
*   `seed.js` - Script to populate the database with initial flower data
*   `index2.html` - Shop page (Client view for browsing products)
*   `admin.html` - Admin Panel (Interface for managing products)
*   
##  Installation & Setup

Follow these steps to run the project locally on your machine:

### 1. Prerequisites
Ensure you have **Node.js** installed.

### 2. Install Dependencies
Open your terminal in the project folder and run:

```bash
npm install
```

### 3. Database Seeding (Optional)
If you want to reset the database and fill it with initial sample data:

```bash
node seed.js
```

*You should see the message: "Database seeded!"*

### 4. Run the Server
Start the backend server:

```bash
node index.js
```

*You should see:*
> Server running on port 3001
> MongoDB connected

### 5. Open the Frontend
*   **Shop Interface:** Open `index2.html` in your browser.
*   **Admin Panel:** Open `admin.html` in your browser.



###  Flowers (Products)

| Method | Endpoint       | Description                  |
| :----- | :------------- | :--------------------------- |
| GET    | `/flowers`     | Retrieve all flowers         |
| GET    | `/flowers/:id` | Retrieve a single flower     |
| POST   | `/flowers`     | Create a new flower (Admin)  |
| PUT    | `/flowers/:id` | Update a flower              |
| DELETE | `/flowers/:id` | Delete a flower              |

###  Orders (Secondary Object)

| Method | Endpoint      | Description                  |
| :----- | :------------ | :--------------------------- |
| GET    | `/orders`     | Retrieve all orders          |
| POST   | `/orders`     | Create a new order           |
| PUT    | `/orders/:id` | Update an order              |
| DELETE | `/orders/:id` | Delete an order              |

---

##  Features Implemented

1.  **MongoDB Connection:** Integrated with MongoDB Atlas for persistent data storage.
2.  **Schema Design:** Created structured models for `Flower` and `Order` with automatic timestamps.
3.  **Full CRUD:** Implemented Create, Read, Update, and Delete operations for both primary and secondary objects.
4.  **Validation:** Server-side validation ensures no empty data is saved (returns 400 Bad Request).
5.  **Admin Panel:** A functional frontend interface to interact with the API (add/remove products).

