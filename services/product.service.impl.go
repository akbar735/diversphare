package services

import (
	"context"
	"errors"
	"time"

	"bitbucket.org/ali_akbar7352/diversphare/helper"
	"bitbucket.org/ali_akbar7352/diversphare/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type ProductServiceImpl struct {
	productcollection *mongo.Collection
	ctx               context.Context
}

func NewProductService(productcollection *mongo.Collection, ctx context.Context) ProductService {
	return &ProductServiceImpl{
		productcollection: productcollection,
		ctx:               ctx,
	}
}

func (p *ProductServiceImpl) CreateProduct(product *models.Product, ownerId string) error {
	var existingProduct *models.Product
	query := bson.D{bson.E{Key: "ownerId", Value: product.OwnerId}, bson.E{Key: "modelNo", Value: product.ModelNo}}
	err := p.productcollection.FindOne(p.ctx, query).Decode(&existingProduct)
	if err != nil && err != mongo.ErrNoDocuments {
		return errors.New("internal server error")
	}
	var serialNo []string
	if existingProduct != nil {
		if existingProduct.SerialNo != nil {
			serialNo = helper.MergeAndRemoveDuplicatesNames(existingProduct.SerialNo, product.SerialNo)
		} else {
			serialNo = helper.RemoveDupicatesNames(product.SerialNo)
		}

		if len(serialNo) == len(existingProduct.SerialNo) {
			return errors.New("products are already added")
		}
		existingProduct.SerialNo = serialNo
		existingProduct.UpdatedAt = time.Now()
		update := bson.D{bson.E{Key: "$set", Value: bson.D{
			bson.E{Key: "serialNo", Value: serialNo},
			bson.E{Key: "updated_at", Value: time.Now()},
		}}}
		_, err = p.productcollection.UpdateOne(p.ctx, query, update)
		if err != nil {
			return errors.New("internal server error")
		}
	} else {
		serialNo = helper.RemoveDupicatesNames(product.SerialNo)
		product.SerialNo = serialNo
		product.CreatedAt = time.Now()
		product.UpdatedAt = product.CreatedAt
		_, err := p.productcollection.InsertOne(p.ctx, product)
		return err
	}

	return nil
}

func (p *ProductServiceImpl) UpdateProduct(product *models.Product, ownerId string) error {
	var existingProduct *models.Product
	filter := bson.D{bson.E{Key: "_id", Value: product.ID}}
	err := p.productcollection.FindOne(p.ctx, filter).Decode(&existingProduct)

	if err != nil && err == mongo.ErrNoDocuments {
		return errors.New("product not found for update")
	} else if err != nil {
		return errors.New("internal server error")
	}
	if ownerId != existingProduct.OwnerId {
		return errors.New("unauthorized access")
	}
	serialNo := helper.RemoveDupicatesNames(product.SerialNo)
	update := bson.D{bson.E{Key: "$set", Value: bson.D{
		bson.E{Key: "title", Value: product.Title},
		bson.E{Key: "desc", Value: product.Desc},
		bson.E{Key: "price", Value: product.Price},
		bson.E{Key: "categoryId", Value: product.CategoryId},
		bson.E{Key: "subcategoryId", Value: product.SubCategoryId},
		bson.E{Key: "serialNo", Value: serialNo},
		bson.E{Key: "modelNo", Value: product.ModelNo},
		bson.E{Key: "updated_at", Value: time.Now()},
	}}}
	result, _ := p.productcollection.UpdateOne(p.ctx, filter, update)
	if result.MatchedCount != 1 {
		return errors.New("product not found for update")
	}
	return nil
}

func (p *ProductServiceImpl) GetProduct(productId *primitive.ObjectID) (*models.Product, error) {
	var product *models.Product
	query := bson.D{bson.E{Key: "_id", Value: productId}}
	err := p.productcollection.FindOne(p.ctx, query).Decode(&product)
	if err != nil {
		return nil, err
	}
	return product, nil
}

func (p *ProductServiceImpl) GetAllProduct() ([]*models.Product, error) {
	var products []*models.Product
	query := bson.D{bson.E{}}
	cursor, err := p.productcollection.Find(p.ctx, query)
	if err != nil {
		return nil, err
	}
	for cursor.Next(p.ctx) {
		var product *models.Product
		err := cursor.Decode(&product)
		if err != nil {
			return nil, err
		}
		products = append(products, product)
	}
	if err := cursor.Err(); err != nil {
		cursor.Close(p.ctx)
		return nil, err
	}
	cursor.Close(p.ctx)

	return products, nil
}

func (p *ProductServiceImpl) GetOwnerProducts(ownerId *primitive.ObjectID) ([]*models.Product, error) {
	var products []*models.Product
	query := bson.D{bson.E{Key: "ownerId", Value: ownerId}}
	cursor, err := p.productcollection.Find(p.ctx, query)
	if err != nil {
		return nil, err
	}
	for cursor.Next(p.ctx) {
		var product *models.Product
		err := cursor.Decode(&product)
		if err != nil {
			return nil, err
		}
		products = append(products, product)
	}
	if err := cursor.Err(); err != nil {
		cursor.Close(p.ctx)
		return nil, err
	}
	cursor.Close(p.ctx)

	return products, nil
}

func (p *ProductServiceImpl) DeleteProduct(productId *primitive.ObjectID) error {
	filter := bson.D{bson.E{Key: "_id", Value: productId}}
	result, _ := p.productcollection.DeleteOne(p.ctx, filter)
	if result.DeletedCount != 1 {
		return errors.New("no product found for delete")
	}
	return nil
}
