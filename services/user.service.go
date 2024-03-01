package services

import (
	"bitbucket.org/ali_akbar7352/diversphare/models"
	"bitbucket.org/ali_akbar7352/diversphare/types"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type UserService interface {
	CreateUser(*models.User) error
	LoginHandler(*types.Credential) (*types.LoginResponse, error)
	GetUser(*primitive.ObjectID) (*models.User, error)
	GetAll() ([]*models.User, error)
	UpdateUser(*models.User) error
	DeleteUser(*primitive.ObjectID) error
}
