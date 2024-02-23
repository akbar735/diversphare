package controllers

import (
	"net/http"

	"bitbucket.org/ali_akbar7352/diversphare/middleware"
	"bitbucket.org/ali_akbar7352/diversphare/models"
	"bitbucket.org/ali_akbar7352/diversphare/services"
	"bitbucket.org/ali_akbar7352/diversphare/types"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type UserController struct {
	UserService services.UserService
}

func NewUserController(userservice services.UserService) UserController {
	return UserController{
		UserService: userservice,
	}
}

func (uc *UserController) CreateUser(ctx *gin.Context) {
	var user models.User

	if err := ctx.ShouldBindJSON(&user); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	err := uc.UserService.CreateUser(&user)
	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"message": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"message": "success"})
}

func (uc *UserController) LoginHandler(ctx *gin.Context) {
	var credential types.Credential
	if err := ctx.ShouldBindJSON(&credential); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	userDetails, err := uc.UserService.LoginHandler(&credential)
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{"message": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, userDetails)
}
func (uc *UserController) GetUser(ctx *gin.Context) {
	userid := ctx.Params.ByName("id")

	objectID, err := primitive.ObjectIDFromHex(userid)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}
	user, err := uc.UserService.GetUser(&objectID)
	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"message": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, user)
}

func (uc *UserController) GetAll(ctx *gin.Context) {
	users, err := uc.UserService.GetAll()
	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"message": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, users)
}

func (uc *UserController) UpdateUser(ctx *gin.Context) {
	var user models.User

	if err := ctx.ShouldBindJSON(&user); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	err := uc.UserService.UpdateUser(&user)
	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"message": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"message": "success"})
}

func (uc *UserController) DeleteUser(ctx *gin.Context) {
	userid := ctx.Params.ByName("id")
	objectID, err := primitive.ObjectIDFromHex(userid)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}
	err = uc.UserService.DeleteUser(&objectID)
	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"message": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"message": "success"})
}

func (uc *UserController) RegisterUserRoutes(rg *gin.RouterGroup) {
	userroute := rg.Group("/user")
	userroute.POST("/register", uc.CreateUser)
	userroute.POST("/login", uc.LoginHandler)

	pvuserroute := userroute.Group("/pv")

	pvuserroute.Use(middleware.AuthMiddleware)

	pvuserroute.GET("/get/:id", uc.GetUser)
	pvuserroute.GET("/getall", uc.GetAll)
	pvuserroute.PATCH("/update", uc.UpdateUser)
	pvuserroute.DELETE("/delete/:id", uc.DeleteUser)
}
