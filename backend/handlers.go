package backend

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

// AuthRequest holds client entered creds during the dummy auth process.
type AuthRequest struct {
	Email             string `json:"email"`
	Password          string `json:"password"`
	ReturnSecureToken bool   `json:"returnSecureToken"`
}

// AuthResponse holds the server response during the dummy auth process.
type AuthResponse struct {
	Token        string `json:"token"`
	RefreshToken string `json:"refreshToken"`
	UserID       string `json:"userId"`
	Email        string `json:"email"`
	DisplayName  string `json:"displayName"`
	ExpiresIn    int    `json:"expiresIn"`
}

// PerformDummyLogin is just a fake auth provider that returns a fake token if mail is alice@example.com and pwd non empty.
func PerformDummyLogin(c *gin.Context) {

	var authReq AuthRequest
	if err := c.ShouldBindJSON(&authReq); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "could not retrieve authentication data: " + err.Error()})
		return
	}

	if "alice@example.com" == authReq.Email && authReq.Password != "" {
		authResp := AuthResponse{
			Token:        "a-fake-token",
			RefreshToken: "a-fake-refresh-token",
			UserID:       "alice-s-id",
			Email:        "alice@example.com",
			DisplayName:  "Alice",
			ExpiresIn:    60,
		}
		c.JSON(http.StatusOK, gin.H{"token": authResp})
	} else {
		fmt.Printf("Failed auth for %s / %s \n", authReq.Email, authReq.Password)
		c.JSON(http.StatusUnauthorized, gin.H{"error": "unknown username or password"})
	}

}

// Hello checks if we have a valid token, if yes use the display name greetings, otherwise simply returns Hello world!
func Hello(c *gin.Context) {

	fmt.Printf("In Hello => context: %v\n", c)

	c.JSON(http.StatusOK, gin.H{
		"message": "Hello world!",
	})
}
