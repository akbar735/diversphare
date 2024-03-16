package controllers

import (
	"net/http"

	"bitbucket.org/ali_akbar7352/diversphare/middleware"
	"bitbucket.org/ali_akbar7352/diversphare/services"
	"github.com/gin-gonic/gin"
)

type FileController struct {
	FileService services.FileService
}

func NewFileController(fileservice services.FileService) FileController {
	return FileController{
		FileService: fileservice,
	}
}

func (fc *FileController) UploadFile(ctx *gin.Context) {
	file, err := ctx.FormFile("file")
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	url, uploadErr := fc.FileService.UploadFile(file)
	if uploadErr != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": uploadErr.Error()})
		return
	}
	if url != "" {
		ctx.JSON(http.StatusOK, gin.H{"url": url})
	} else {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Unable to get file URL"})
	}
}

func (fc *FileController) DeleteFile(ctx *gin.Context) {
	fileId := ctx.Params.ByName("fileid")
	err := fc.FileService.DeleteFile(fileId)
	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"error": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"message": "File has been deleted successfully"})
}

func (fc *FileController) RegisterFileContller(rg *gin.RouterGroup) {
	fileroute := rg.Group("/files")

	fileroute.Use(middleware.AuthMiddleware)

	fileroute.POST("/upload", fc.UploadFile)
	fileroute.DELETE("/delete/:fileid", fc.DeleteFile)
}
