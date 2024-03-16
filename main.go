package main

import (
	"context"
	"fmt"
	"log"
	"time"

	"bitbucket.org/ali_akbar7352/diversphare/controllers"
	"bitbucket.org/ali_akbar7352/diversphare/services"
	"bitbucket.org/ali_akbar7352/diversphare/utility"
	"github.com/gin-gonic/gin"
	cors "github.com/itsjamie/gin-cors"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

var (
	server            *gin.Engine
	userservice       services.UserService
	productservice    services.ProductService
	fileservice       services.FileService
	usercontroller    controllers.UserController
	productcontroller controllers.ProductController
	filecontroller    controllers.FileController
	ctx               context.Context
	usercollection    *mongo.Collection
	productcollection *mongo.Collection
	mongoclient       *mongo.Client
	err               error
	db                *mongo.Database
)

func init() {
	ctx := context.TODO()
	connectuin_string := utility.GetEnv("CONNECTION_URI", "mongodb://localhost:27017")
	println(connectuin_string)
	mongoconn := options.Client().ApplyURI(connectuin_string)
	mongoclient, err = mongo.Connect(ctx, mongoconn)
	if err != nil {
		log.Fatal(err)
	}
	err = mongoclient.Ping(ctx, readpref.Primary())

	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("mongo connection established")
	db = mongoclient.Database("diversphare")

	usercollection = db.Collection("users")
	productcollection = db.Collection("products")

	userservice = services.NewUserService(usercollection, ctx)
	productservice = services.NewProductService(productcollection, ctx)
	fileservice = services.NewFileService(ctx)

	usercontroller = controllers.NewUserController(userservice)
	productcontroller = controllers.NewProductController(productservice)
	filecontroller = controllers.NewFileController(fileservice)

	server = gin.Default()
	server.MaxMultipartMemory = 8 << 20 // 8 MiB
}

func main() {
	defer mongoclient.Disconnect(ctx)

	server.Use(cors.Middleware(cors.Config{
		Origins:         "*",
		Methods:         "GET, PUT, POST, DELETE",
		RequestHeaders:  "Origin, Authorization, Content-Type",
		ExposedHeaders:  "",
		MaxAge:          50 * time.Second,
		Credentials:     false,
		ValidateHeaders: false,
	}))
	server.Static("/files", "./uploads")

	basepath := server.Group("/v1")
	usercontroller.RegisterUserRoutes(basepath)
	productcontroller.RegisterProductContller(basepath)
	filecontroller.RegisterFileContller(basepath)
	log.Fatal(server.Run(":9090"))
}
