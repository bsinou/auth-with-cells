package main

import (
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"

	"github.com/bsinou/auth-with-cells/backend"
)

func main() {
	router := gin.Default()

	// Serve ReactJs compiled files
	router.Use(static.Serve("/", static.LocalFile("./frontend/build", true)))

	// Authenticated route
	api := router.Group("/api")
	{
		api.GET("/", backend.Hello)
	}

	// Starts the server in an infinite loop => not production ready.
	router.Run(":8888")
}
