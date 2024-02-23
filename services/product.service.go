package services

import (
	"bitbucket.org/ali_akbar7352/diversphare/models"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type ProductService interface {
	CreateProduct(*models.Product, string) error
	UpdateProduct(*models.Product, string) error
	GetProduct(*primitive.ObjectID) (*models.Product, error)
	GetAllProduct() ([]*models.Product, error)
	GetOwnerProducts(*primitive.ObjectID) ([]*models.Product, error)
	DeleteProduct(*primitive.ObjectID) error
}
