package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
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

func setupRouter(db *gorm.DB) *gin.Engine {
	// Disable Console Color
	// gin.DisableConsoleColor()
	r := gin.Default()
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
				content := Contents{Id: uuid.Must(uuid.NewRandom()), Title: "aaaz", Body: "bbbbb"}
				result := db.Select("id", "title", "body").Create(&content)
				if errorDB(result, c) { return }
				c.JSON(http.StatusOK, input)
				return
			}
		})
	}
	return r
}

func main() {
	db, err := connectionDB()
	r := setupRouter(db)
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}

	config := cors.DefaultConfig()
	// config.AllowOrigins = []string{
	// 	"http://127.0.0.1:5173",
	// }
	config.AllowAllOrigins = true
	config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE"}
	// config.AllowHeaders = []string{"Origin", "Content-Length", "Content-Type"}
	// config.AllowCredentials = false
	r.Use(cors.New(config))
	// Listen and Server in 0.0.0.0:8080
	r.Run(":8080")
}