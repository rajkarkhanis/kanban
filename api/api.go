package api

import (
	"encoding/json"
	"net/http"
)

func GetHello(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"message": "Hello, World!",
	})
}

func InitApi() {
	http.HandleFunc("/api/hello", GetHello)
}
