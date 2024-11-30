package utils

import "testing"

func TestIsValidEmail(t *testing.T) {
	cases := []struct {
		email    string
		expected bool
	}{
		{"test@example.com", true},
		{"user@sub.domain.com", true},
		{"invalid-email", false},
		{"@missing-local.com", false},
		{"missing-at.com", false},
	}

	for _, c := range cases {
		result := IsValidEmail(c.email)
		if result != c.expected {
			t.Errorf("IsValidEmail(%q) = %v; want %v", c.email, result, c.expected)
		}
	}
}

func TestIsValidPassword(t *testing.T) {
	cases := []struct {
		password string
		expected bool
	}{
		{"Secure@123", true},
		{"weakpass", false},
		{"NoSpecial123", false},
		{"Short@1", false},
		{"Valid$Pass1", true},
	}

	for _, c := range cases {
		result := IsValidPassword(c.password)
		if result != c.expected {
			t.Errorf("IsValidPassword(%q) = %v; want %v", c.password, result, c.expected)
		}
	}
}
