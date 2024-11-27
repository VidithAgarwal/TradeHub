# TraderHub

TraderHub is a marketplace application similar to Facebook Marketplace. It allows users to browse, search, filter, and sort products. Depending on the user's login status and role (Buyer, Seller, Admin), different functionalities are unlocked.

## Features

### Unauthenticated Users
- View products fetched from the Amazon API.
- Search, filter, and sort products.
- View product details and reviews.

### Authenticated Users
#### Buyer
- View products listed by sellers on TraderHub.
- Search, filter, and sort these products.
- View detailed product pages including seller information.
- Add reviews to products.
- View profile pages of sellers and reviewers with sensitive data hidden.
- Manage and edit their own profile, including sensitive data.

#### Seller
- List products for sale.
- Manage their product listings.
- View detailed buyer reviews and profiles with sensitive data hidden.
- Edit their own profile, including sensitive data.

#### Admin
- Manage buyers and sellers (e.g., add, edit, or remove users).
- Monitor platform activity and ensure compliance.

## Tech Stack
- **Frontend**: React (using Vite for faster development), Tailwind CSS for styling.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB.

---

## Getting Started

### Prerequisites
- **Node.js**: Ensure you have Node.js installed (v16 or higher recommended).
- **MongoDB**: Set up a MongoDB instance (local or cloud).
- **Git**: Installed for cloning the repository.

---

## Cloning the Repository

```bash
git clone https://github.com/your-username/traderhub.git
cd traderhub
```
## Setting Up the Server
#### 1. Navigate to the server directory:

```bash
cd server
```
#### 2. Install dependencies:

```bash
npm install
```
#### 3. Create a .env file in the server directory and add the following environment variables:

```makefile
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

#### 4. Start the server:

```bash
npm start
```

## Setting Up the Client
#### 1. Navigate to the client directory:

```bash
cd ../client
```

#### 2. Install dependencies:

```bash
npm install
```

#### 3. Create a .env file in the client directory and add the following variable:

```arduino
VITE_API_URL=http://localhost:5000
```

#### 4. Start the client:

```bash
npm run dev
```
## Project Structure
```bash
TraderHub/
│
├── client/              # Frontend code (React + Tailwind CSS)
│   ├── public/          # Static assets
│   ├── src/             # React components and pages
│   ├── .env             # Client environment variables
│   ├── vite.config.js   # Vite configuration
│   └── ...              # Other React files
│
├── server/              # Backend code (Node.js + Express.js)
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── controllers/     # Business logic
│   ├── .env             # Server environment variables
│   └── ...              # Other backend files
│
├── README.md            # Project documentation
└── ...                  # Other root-level files
```

## Available Scripts
### Server
- `npm start`: Starts the backend server.

### Client
- `npm run dev`: Starts the React development server.

## Contributing
Contributions are welcome! Feel free to fork the repository and submit a pull request.
