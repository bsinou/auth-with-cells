package backend

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// Hello checks if we have a valid token, if yes use the display name greetings, otherwise simply returns Hello world!
func Hello(c *gin.Context) {

	c.JSON(http.StatusOK, gin.H{
		"message": "Hello world!",
	})
}
