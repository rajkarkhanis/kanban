package db

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv" // For loading environment variables
	_ "github.com/lib/pq"      // PostgreSQL driver
)

var DB *sql.DB

// Initialize the database connection
func InitDB() {
	// Load environment variables from the .env file (only for local development)
	if os.Getenv("ENV") != "production" {
		err := godotenv.Load() // Load .env file only for local dev
		if err != nil {
			log.Fatal("Error loading .env file")
		}
	}

	// Get all the DB-related environment variables
	dbHost := os.Getenv("DB_HOST")
	dbPort := os.Getenv("DB_PORT")
	dbUser := os.Getenv("DB_USER")
	dbPassword := os.Getenv("DB_PASSWORD")
	dbName := os.Getenv("DB_NAME")

	// Construct the connection string using the environment variables
	connStr := fmt.Sprintf("postgres://%s:%s@%s:%s/%s?sslmode=require",
		dbUser, dbPassword, dbHost, dbPort, dbName)

	if connStr == "" {
		log.Fatal("Database connection string is not set")
	}

	// Open the database connection
	DB, err := sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	// Optionally, check if the database is reachable
	err = DB.Ping()
	if err != nil {
		log.Fatal("Failed to ping database:", err)
	}

	log.Println("Connected to the database successfully!")
}
