package utility

import (
	"os"
	"time"

	"bitbucket.org/ali_akbar7352/diversphare/models"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

func GetEnv(key, fallback string) string {
	if value, ok := os.LookupEnv(key); ok {
		return value
	}
	return fallback
}

func GenerateToken(user *models.User) (string, error) {
	// Create a new JWT token with the username as a claim
	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id":            user.ID,
		"name":          user.Name,
		"dob":           user.DOB,
		"address":       user.Address,
		"comissionRate": user.ComissionRate,
		"isSeller":      user.IsSeller,
		"exp":           time.Now().Add(time.Hour * 1).Unix(), // Token expiration time
	})

	var jwtSecret = []byte(GetEnv("JWT_SECRET", "HELLO_SECRET"))
	// Sign the token with the secret key
	tokenString, err := claims.SignedString(jwtSecret)

	if err != nil {
		return "", err
	}

	return tokenString, nil
}

// HashPassword hashes a plaintext password using bcrypt
func HashPassword(password string) (string, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	return string(hashedPassword), nil
}

// CheckPasswordHash compares a hashed password with its plaintext version
func CheckPasswordHash(password, hashedPassword string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
	return err == nil
}
