package middleware

import (
	"net/http"

	"bitbucket.org/ali_akbar7352/diversphare/utility"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"github.com/golang-jwt/jwt/v5/request"
)

func AuthMiddleware(ctx *gin.Context) {
	// Extract the token from the Authorization header
	tokenString, err := request.AuthorizationHeaderExtractor.ExtractToken(ctx.Request)

	if err != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": "Token is missing"})
		ctx.Abort()
		return
	}

	// Parse the token
	claims := jwt.MapClaims{}
	jwtSecret := []byte(utility.GetEnv("JWT_SECRET", "HELLO_SECRET"))
	token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
		return jwtSecret, nil
	})

	if err != nil || !token.Valid {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
		ctx.Abort()
		return
	}
	// Add the username to the context for later use
	id, exists := claims["id"].(string)

	if !exists {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": "Calims failed"})
		ctx.Abort()
		return
	}
	ctx.Set("userId", id)
	ctx.Next()
}
