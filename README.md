# Logistics App

A comprehensive logistics management application built with Laravel and React JS.

## Tech Stack

- Backend: Laravel
- Frontend: React JS

## Features

- **Authentication**
    - Login
    - Signup

- **Dashboard**

- **Users**
    - List
    - Add
    - Edit
    - Delete

- **Products**
    - List
    - Add
    - Edit
    - Delete

- **Suppliers**
    - List
    - Add
    - Edit
    - Delete

- **Warehouses**
    - List
    - Add
    - Edit
    - Delete

- **Warehouse Products**
    - List
    - Add
    - Delete

## Getting Started

### Prerequisites

Make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Composer](https://getcomposer.org/)
- [PHP](https://www.php.net/)
- [MySQL](https://www.mysql.com/)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/waheedup74/logistics_test.git

cd logistics-app 
```

2. Install frontend dependencies:

```bash
npm install
```


3. Install backend dependencies:

```bash
composer install
```

4. Create a copy of the .env file and configure your environment variables:

```bash
cp .env.example .env
```

5. Generate the application key:

```bash
php artisan key:generate
```

6. Run database migrations:

```bash
php artisan migrate
```

7. Start the development server:

- For the Laravel backend:

```bash
php artisan serve
```

- For the React frontend:

```bash
npm run dev
```