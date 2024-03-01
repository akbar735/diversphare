package services

import (
	"context"
	"errors"
	"time"

	"bitbucket.org/ali_akbar7352/diversphare/models"
	"bitbucket.org/ali_akbar7352/diversphare/types"
	"bitbucket.org/ali_akbar7352/diversphare/utility"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type UserServiceImpl struct {
	usercollection *mongo.Collection
	ctx            context.Context
}

func NewUserService(usercollection *mongo.Collection, ctx context.Context) UserService {
	return &UserServiceImpl{
		usercollection: usercollection,
		ctx:            ctx,
	}
}
func (u *UserServiceImpl) CreateUser(user *models.User) error {
	var oneUser *models.User
	query := bson.D{bson.E{Key: "email", Value: user.Email}}
	err := u.usercollection.FindOne(u.ctx, query).Decode(&oneUser)

	if oneUser != nil && oneUser.Email == user.Email {
		return errors.New("already register! please login")
	} else if err != nil && err != mongo.ErrNoDocuments {
		return errors.New("something went wrong! not able to register this time")
	}
	user.CreatedAt = time.Now()
	user.UpdatedAt = user.CreatedAt
	HashedPassword, hashingErr := utility.HashPassword(user.Password)

	if hashingErr != nil {
		return hashingErr
	}
	user.Password = HashedPassword
	_, err = u.usercollection.InsertOne(u.ctx, user)
	return err
}

func (u *UserServiceImpl) LoginHandler(credential *types.Credential) (*types.LoginResponse, error) {
	var user *models.User
	query := bson.D{bson.E{Key: "email", Value: credential.Email}}

	err := u.usercollection.FindOne(u.ctx, query).Decode(&user)

	if err != nil {
		return nil, errors.New("user not found")
	}
	isPassordMatched := utility.CheckPasswordHash(credential.Password, user.Password)
	if !isPassordMatched {
		return nil, errors.New("invalid password")
	}
	token, err := utility.GenerateToken(user)
	if err != nil {
		return nil, err
	}

	return &types.LoginResponse{
		ID:    user.ID.Hex(),
		Name:  user.Name,
		Token: token,
	}, nil
}

func (u *UserServiceImpl) GetUser(id *primitive.ObjectID) (*models.User, error) {
	var user *models.User
	query := bson.D{bson.E{Key: "_id", Value: id}}
	err := u.usercollection.FindOne(u.ctx, query).Decode(&user)
	return user, err
}

func (u *UserServiceImpl) GetAll() ([]*models.User, error) {
	var users []*models.User
	cursor, err := u.usercollection.Find(u.ctx, bson.D{{}})

	if err != nil {
		return nil, err
	}
	for cursor.Next(u.ctx) {
		var user models.User
		err := cursor.Decode(&user)
		if err != nil {
			cursor.Close(u.ctx)
			return nil, err
		}
		users = append(users, &user)
	}

	if err := cursor.Err(); err != nil {
		cursor.Close(u.ctx)
		return nil, err
	}
	cursor.Close(u.ctx)

	if len(users) == 0 {
		return nil, errors.New("user not found")
	}
	return users, nil
}

func (u *UserServiceImpl) UpdateUser(user *models.User) error {
	var existingUser *models.User
	filter := bson.D{bson.E{Key: "_id", Value: user.ID}}
	err := u.usercollection.FindOne(u.ctx, filter).Decode(&existingUser)
	if err != nil {
		return err
	}
	update := bson.D{bson.E{Key: "$set", Value: bson.D{
		bson.E{Key: "name", Value: user.Name},
		bson.E{Key: "dob", Value: user.DOB},
		bson.E{Key: "email", Value: user.Email},
		bson.E{Key: "address", Value: user.Address},
		bson.E{Key: "comissionRate", Value: user.ComissionRate},
		bson.E{Key: "countryCode", Value: user.CountryCode},
		bson.E{Key: "mobileNo", Value: user.MobileNo},
		bson.E{Key: "isSeller", Value: user.IsSeller},
		bson.E{Key: "UpdatedAt", Value: time.Now()},
	}}}

	result, _ := u.usercollection.UpdateOne(u.ctx, filter, update)

	if result.MatchedCount != 1 {
		return errors.New("no matched user found for update")
	}
	return nil
}

func (u *UserServiceImpl) DeleteUser(id *primitive.ObjectID) error {
	filter := bson.D{bson.E{Key: "_id", Value: id}}
	result, _ := u.usercollection.DeleteOne(u.ctx, filter)
	if result.DeletedCount != 1 {
		return errors.New("no user found for delete")
	}
	return nil
}
