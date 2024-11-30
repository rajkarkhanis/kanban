package api

import (
	"encoding/json"
	"kanban/db"
	"kanban/models"
	"kanban/utils"
	"net/http"

	"golang.org/x/crypto/bcrypt"
)

func GetHello(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"message": "Hello, World!",
	})
}

func LogIn(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var payload models.AuthPayload

	err := json.NewDecoder(r.Body).Decode(&payload)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
	}

	if payload.Email == "" || !utils.IsValidEmail(payload.Email) {
		http.Error(w, "Invalid email addresss", http.StatusBadRequest)
		return
	}

	dbUser, err := db.GetUserByEmail(payload.Email)
	if err != nil {
		http.Error(w, "User not found", http.StatusUnauthorized)
		return
	}

	err = bcrypt.CompareHashAndPassword([]byte(dbUser.PasswordHash), []byte(payload.Password))
	if err != nil {
		http.Error(w, "Invalid credentials", http.StatusUnauthorized)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Log in successful"))
}

func SignUp(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var payload models.AuthPayload

	err := json.NewDecoder(r.Body).Decode(&payload)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
	}

	if payload.Email == "" || !utils.IsValidEmail(payload.Email) {
		http.Error(w, "Invalid email addresss", http.StatusBadRequest)
		return
	}

	if payload.Password == "" || !utils.IsValidPassword(payload.Password) {
		http.Error(w, "Invalid password", http.StatusBadRequest)
		return
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(payload.Password), bcrypt.DefaultCost)
	if err != nil {
		http.Error(w, "Failed to secure password", http.StatusInternalServerError)
		return
	}

	userID, err := db.CreateUser(payload.Email, string(hashedPassword))
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	response := map[string]interface{}{
		"id":    userID,
		"email": payload.Email,
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	if err := json.NewEncoder(w).Encode(response); err != nil {
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
		return
	}
}

func InitApi() {
	http.HandleFunc("/api/hello", GetHello)
	http.HandleFunc("/api/login", LogIn)
	http.HandleFunc("/api/signup", SignUp)
}
