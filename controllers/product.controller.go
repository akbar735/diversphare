package controllers

import (
	"net/http"

	"bitbucket.org/ali_akbar7352/diversphare/middleware"
	"bitbucket.org/ali_akbar7352/diversphare/models"
	"bitbucket.org/ali_akbar7352/diversphare/services"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type ProductController struct {
	ProductService services.ProductService
}

func NewProductController(productservice services.ProductService) ProductController {
	return ProductController{
		ProductService: productservice,
	}
}

func (pc *ProductController) CreateProduct(ctx *gin.Context) {
	var product *models.Product

	if err := ctx.ShouldBindJSON(&product); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}
	err := pc.ProductService.CreateProduct(product, product.OwnerId)
	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"messeage": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "success"})
}

func (pc *ProductController) UpdateProduct(ctx *gin.Context) {
	var product *models.Product
	if err := ctx.ShouldBindJSON(&product); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}
	err := pc.ProductService.UpdateProduct(product, product.OwnerId)
	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"messeage": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "success"})
}

func (pc *ProductController) GetProduct(ctx *gin.Context) {
	productid := ctx.Params.ByName("id")

	objectID, err := primitive.ObjectIDFromHex(productid)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid product ID"})
		return
	}
	product, err := pc.ProductService.GetProduct(&objectID)
	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"message": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, product)
}

func (pc *ProductController) GetAllProduct(ctx *gin.Context) {
	products, err := pc.ProductService.GetAllProduct()
	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"message": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, products)
}

func (pc *ProductController) GetOwnerProducts(ctx *gin.Context) {
	productid := ctx.Params.ByName("id")

	objectID, err := primitive.ObjectIDFromHex(productid)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid product ID"})
		return
	}
	products, err := pc.ProductService.GetOwnerProducts(&objectID)
	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"message": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, products)
}

func (pc *ProductController) DeleteProduct(ctx *gin.Context) {
	productid := ctx.Params.ByName("id")
	objectID, err := primitive.ObjectIDFromHex(productid)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}
	err = pc.ProductService.DeleteProduct(&objectID)
	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"message": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"message": "success"})
}

func (pc *ProductController) RegisterProductContller(rg *gin.RouterGroup) {
	productroute := rg.Group("/products")

	productroute.Use(middleware.AuthMiddleware)

	productroute.POST("/addproduct", pc.CreateProduct)
	productroute.PATCH("/updateproduct", pc.UpdateProduct)
	productroute.GET("/getproduct/:id", pc.GetProduct)
	productroute.GET("/getallproduct", pc.GetAllProduct)
	productroute.GET("/getownproduct", pc.GetOwnerProducts)
	productroute.DELETE("/deleteproduct/:id", pc.DeleteProduct)
}
