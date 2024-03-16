package services

import "mime/multipart"

type FileService interface {
	UploadFile(file *multipart.FileHeader) (string, error)
	DeleteFile(fileId string) error
}
