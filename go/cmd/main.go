package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/joho/godotenv"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type InputBody struct {
	Title string `json:"title" binding:"required"`
	Body  string `json:"body" binding:"required"`
}

type Contents struct {
	Id    uuid.UUID `json:"id";gorm:"type:uuid;default:uuid_generate_v4()"`
	Title string `json:"title"`
	Body  string `json:"body"`
}


type DBConfig struct {
	User     string
	Password string
	Host     string
	Port     int
	Table    string
}

func getDBConfig() DBConfig {
	port, _ := strconv.Atoi(os.Getenv("DB_PORT"))
	return DBConfig{
		User:     os.Getenv("DB_USER"),
		Password: os.Getenv("DB_PASSWORD"),
		Host:     os.Getenv("DB_HOSST"),
		Port:     port,
		Table:    os.Getenv("DB"),
	}
}

func connectionDB() (*gorm.DB, error) {
	config := getDBConfig()
	dsn := fmt.Sprintf(
		"%s:%s@tcp(%s:%d)/%s?charset=utf8mb4&parseTime=True",
		config.User,
		config.Password,
		config.Host,
		config.Port,
		config.Table,
	)
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	return db, err
}

func errorDB(db *gorm.DB, c *gin.Context) bool {
	if db.Error != nil {
		log.Printf("Error cms: %v", db.Error)
		c.AbortWithStatus(http.StatusInternalServerError)
		return true
	}
	return false
}

func customCORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
			c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
			c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
			c.Writer.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
			c.Next()
	}
}

func setupRouter(db *gorm.DB) *gin.Engine {
	// Disable Console Color
	// gin.DisableConsoleColor()
	r := gin.Default()
	r.Use(customCORSMiddleware())
	posts := r.Group("/posts")
	{
		posts.GET("/:id", func(c *gin.Context) {
			var contents Contents
			id := c.Param("id")
			result := db.Where("id = ?", id).Find(&contents)
			if errorDB(result, c) {
				return
			}
			c.JSON(http.StatusOK, contents)
		})
		posts.GET("", func(c *gin.Context) {
			type Response struct {
				Posts []Contents `json:"posts" binding:"required"`
			}
			var contents []Contents
			result := db.Find(&contents)
			if errorDB(result, c) {
				return
			}
			c.JSON(http.StatusOK, Response{Posts: contents})
		})
		posts.DELETE("/delete/:id", func(c *gin.Context) {
			id := c.Param("id")
			result := db.Where("id = ?", id).Delete(&Contents{})
			if errorDB(result, c) {
				return
			}
		})
		posts.PUT("/edit/:id", func(c *gin.Context) {
			id := c.Param("id")
			var input InputBody
			if err := c.ShouldBind(&input); err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				return
			}

			var contents Contents
			result := db.Where("id = ?", id).Take(&contents)
			if errorDB(result, c) {
				return
			}
			contents.Body = input.Body
			result = db.Save(&contents)
			if errorDB(result, c) {
				return
			}
		})
		posts.POST("/create", func(c *gin.Context) {
			var input InputBody
			if err := c.ShouldBind(&input); err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				return
			} else {
				fmt.Println(input)
				content := Contents{Id: uuid.Must(uuid.NewRandom()), Title: input.Title, Body: input.Body}
				result := db.Select("id", "title", "body").Create(&content)
				if errorDB(result, c) { return }
				c.JSON(http.StatusOK, input)
				return
			}
		})
		posts.OPTIONS("/create", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{"message": "This is a preflight."})
		})
	}
	return r
}

func main() {
	err := godotenv.Load()
	if err!= nil {
		log.Fatal("Error loading.env file")
	}
	db, err := connectionDB()
	r := setupRouter(db)
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}

	r.Run(":8080")
}
