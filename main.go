package main

import (
	"fmt"
	"kanban/api"
	"kanban/db"
	"log"
	"net/http"
)

func main() {
	db.InitDB()
	api.InitApi()

	// Start the server on port 8080
	fmt.Println("Server is running on http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
