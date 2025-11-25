# Movie / Book Library

A full-stack web application for tracking your personal collection of movies and books. Manage your library with ease, add ratings and notes, and keep track of what you've watched or read.

## Features

-   **Full CRUD Operations**: Create, read, update, and delete library items (movies and books)
-   **Search & Filter**: Search items by title and filter by type (movie/book)
-   **Sorting**: Sort items by title, year, or rating
-   **Cover Images**: Visual cover images for each item with graceful fallback placeholders
-   **Library Statistics**: View total counts of items, movies, and books
-   **Persistent Storage**: SQLite database with Entity Framework Core migrations
-   **Seeded Data**: Pre-populated with sample items to get you started
-   **Responsive Design**: Clean, modern UI that works on desktop and mobile devices

## Tech Stack

### Backend

-   **.NET 8** - ASP.NET Core Web API
-   **Entity Framework Core** - ORM for database operations
-   **SQLite** - Lightweight, file-based database
-   **Swagger/OpenAPI** - API documentation

### Frontend

-   **React 19** - UI library
-   **Vite** - Build tool and dev server
-   **React Router** - Client-side routing
-   **JavaScript** - No TypeScript (keeping it simple)

## Getting Started

### Prerequisites

-   [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
-   [Node.js](https://nodejs.org/) (v18 or later)
-   [npm](https://www.npmjs.com/) (comes with Node.js)

### Database Setup

1. Navigate to the `api` directory:

    ```bash
    cd api
    ```

2. Apply database migrations to create the SQLite database:

    ```bash
    dotnet ef database update
    ```

    This will create `library.db` with the necessary tables and seed initial data.

### Running the Application

#### Backend (API)

1. From the `api` directory:

    ```bash
    dotnet run
    ```

2. The API will be available at:
    - `http://localhost:5000` (HTTP)
    - `https://localhost:5001` (HTTPS)
    - Swagger UI: `https://localhost:5001/swagger`

#### Frontend (Client)

1. Navigate to the `client` directory:

    ```bash
    cd client
    ```

2. Install dependencies (first time only):

    ```bash
    npm install
    ```

3. Start the development server:

    ```bash
    npm run dev
    ```

4. Open your browser and navigate to the URL shown in the terminal (typically `http://localhost:5173`)

### Project Structure

```
movie-book-library/
├── api/                    # .NET Web API backend
│   ├── Controllers/        # API endpoints
│   ├── Data/              # DbContext
│   ├── Dtos/              # Data transfer objects
│   ├── Migrations/        # EF Core migrations
│   ├── Models/            # Domain entities
│   ├── Repositories/      # Data access layer
│   └── Services/          # Business logic
├── client/                # React frontend
│   ├── src/
│   │   ├── api/          # API helper functions
│   │   ├── components/   # Reusable UI components
│   │   └── pages/        # Page components
└── cursor/                # Project documentation
```

## Screenshots

![Home Page](client/public/screenshots/home-page.png)
![Library Items](client/public/screenshots/library-items.png)
![Create Item](client/public/screenshots/create-item.png)

## Deployment

This project is fully deployed and live:

### 🌐 Frontend (Vercel)

The React/Vite client is deployed on Vercel.

**Live URL:** https://movie-book-library.vercel.app

### 🛠️ Backend API (Render)

The ASP.NET Core Web API is containerized with Docker and deployed on Render.

**API Base URL:** https://movie-book-library.onrender.com  
(used via `VITE_API_URL` environment variable)

### Infrastructure Summary

- **Frontend:** Vercel, built from the `client` folder using Vite

- **Backend:** Docker image deployed on Render

- **Database:** SQLite + EF Core migrations (auto-applied on container startup)

- **Environment Variables:** VITE_API_URL configured in Vercel

## API Endpoints

-   `GET /api/libraryitems` - Get all items (optional `?type=movie` or `?type=book` filter)
-   `GET /api/libraryitems/{id}` - Get item by ID
-   `POST /api/libraryitems` - Create new item
-   `PUT /api/libraryitems/{id}` - Update existing item
-   `DELETE /api/libraryitems/{id}` - Delete item

## Future Improvements

-   **User Authentication**: Add user accounts and personal libraries
-   **Import/Export**: Export library data to CSV or JSON
-   **Advanced Filtering**: Filter by status, rating, year range, or custom tags
-   **Bulk Operations**: Select and delete multiple items at once
-   **Image Upload**: Upload custom cover images instead of URLs
-   **Reading/Watching Progress**: Track progress for books (pages read) and movies (time watched)

## License

This project is open source and available for personal and educational use.
