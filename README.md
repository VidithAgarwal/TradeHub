# **TraderHub**  

Welcome to **TraderHub**, a marketplace application inspired by Facebook Marketplace. **TraderHub** connects buyers and sellers, offering an intuitive and dynamic platform for product discovery, sales, and reviews.

---

## 🌟 **Features**

### **Unauthenticated Users**
- 🌐 **Browse Products**: View items fetched from the Amazon API.  
- 🔍 **Search & Filter**: Locate products easily through advanced filtering and sorting.  
- 🛍️ **Product Details**: Check product descriptions, ratings, and reviews.  

---

### **Authenticated Users**
#### **Buyer**
- 🛒 **Explore Listings**: Browse and purchase items listed by sellers.  
- 🔍 **Search & Sort**: Refine searches with filters and sorting tools.  
- 📜 **Detailed Pages**: See in-depth product details and seller information.  
- ✍️ **Write Reviews**: Share feedback on purchased products.  
- 👤 **Profile Management**: Edit and secure your profile data.  

#### **Seller**
- 🛍️ **List Products**: Add items for sale with ease.  
- 🛠️ **Manage Listings**: Update or delete product listings.  
- 📜 **Access Reviews**: Gain insights from detailed buyer reviews.  
- 👤 **Profile Customization**: Manage and secure your account details.  

#### **Admin**
- 🛡️ **User Management**: Add, edit, or remove buyers and sellers.  
- 📊 **Platform Monitoring**: Oversee activity to ensure compliance.  

---

## 💻 **Tech Stack**
- **Frontend**:  
  - React (powered by Vite for faster development).  
  - Tailwind CSS for a sleek, responsive design.  
- **Backend**:  
  - Node.js and Express.js.  
- **Database**:  
  - MongoDB for reliable and scalable data management.  

---

## 🚀 **Getting Started**

### **Prerequisites**
Ensure you have the following installed:  
- **Node.js** (v16+ recommended).  
- **MongoDB** (local or cloud instance).  
- **Git** for cloning the repository.  

---

### **Clone the Repository**

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
