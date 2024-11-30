package db

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

type User struct {
	ID           int64  `json:"id"`
	Email        string `json:"email"`
	PasswordHash string `json:"password_hash"`
}

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

func GetUserByEmail(email string) (*User, error) {
	query := `SELECT id, email, password_hash FROM users WHERE email = $1`
	row := DB.QueryRow(query, email)

	var user User
	err := row.Scan(&user.ID, &user.Email, &user.PasswordHash)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, fmt.Errorf("User not found")
		}
		return nil, err
	}

	return &user, nil
}

func CreateUser(email, hashedPassword string) (int64, error) {
	// Start a transaction
	tx, err := DB.Begin()
	if err != nil {
		return 0, fmt.Errorf("failed to create database transaction: %w", err)
	}

	// Ensure the transaction is rolled back in case of a panic
	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
		}
	}()

	var userID int64
	// Insert the user into the database and retrieve the ID
	query := "INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id"
	err = tx.QueryRow(query, email, hashedPassword).Scan(&userID)
	if err != nil {
		tx.Rollback()
		return 0, fmt.Errorf("failed to create user: %w", err)
	}

	// Commit the transaction
	if err := tx.Commit(); err != nil {
		return 0, fmt.Errorf("failed to commit transaction: %w", err)
	}

	return userID, nil
}
