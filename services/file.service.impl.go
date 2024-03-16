package services

import (
	"context"
	"errors"
	"mime/multipart"
	"os"
	"strings"

	"bitbucket.org/ali_akbar7352/diversphare/utility"
	"github.com/google/uuid"
)

const uploadPath = "./uploads"

type FileServiceImpl struct {
	ctx context.Context
}

func NewFileService(ctx context.Context) FileService {
	return &FileServiceImpl{
		ctx: ctx,
	}
}

// UploadFile implements FileService.
func (f *FileServiceImpl) UploadFile(file *multipart.FileHeader) (string, error) {

	// Create the uploads directory if it doesn't exist
	if _, err := os.Stat(uploadPath); os.IsNotExist(err) {
		os.Mkdir(uploadPath, os.ModePerm)
	}

	newUUID := uuid.New()
	parts := strings.Split(file.Filename, ".")
	var fileId = ""
	if len(parts) > 1 {
		fileId = newUUID.String() + "." + parts[1]
	} else {
		fileId = newUUID.String()
	}

	// Save the uploaded file to the server
	err := utility.SaveUploadedFile(file, uploadPath+"/"+fileId)
	if err != nil {
		return "", err
	}

	return fileId, err
}

// DeleteFile implements FileService.
func (f *FileServiceImpl) DeleteFile(fileId string) error {
	filePath := uploadPath + "/" + fileId

	// Check if the file exists
	_, err := os.Stat(filePath)
	if os.IsNotExist(err) {
		return errors.New("file not found")
	}

	// Attempt to delete the file
	err = os.Remove(filePath)
	if err != nil {
		return errors.New("failed to delete file")
	}
	return nil
}
