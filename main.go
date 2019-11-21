package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gobuffalo/packr"

	"github.com/bsinou/auth-with-cells/backend"
)

func main() {
	router := gin.Default()

	// Serve ReactJs compiled files with Packr under /ui prefix
	box := packr.NewBox("./frontend/build")
	router.StaticFS("/ui", box)
	// and redirect the root of the website
	router.GET("/", func(c *gin.Context) {
		c.Redirect(http.StatusMovedPermanently, "/ui")
	})

	// Dummy auth entry point
	authG := router.Group("/auth")
	{
		authG.POST("/login", backend.PerformDummyLogin)
	}

	// Authenticated routes
	api := router.Group("/api")
	{
		api.GET("/", backend.Hello)
	}

	// Starts the server in an infinite loop => not production ready.
	router.Run(":8888")
}
