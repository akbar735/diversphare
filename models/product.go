package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type SerialNo []string
type Product struct {
	ID            primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	Title         string             `json:"title" bson:"title"`
	Desc          string             `json:"desc" bson:"desc"`
	Price         float64            `json:"price" bson:"price"`
	CategoryId    int                `json:"categoryId" bson:"categoryId"`
	SubCategoryId int                `json:"subcategoryId" bson:"subcategoryId"`
	OwnerId       string             `json:"ownerId" bson:"ownerId"`
	SerialNo      SerialNo           `json:"serialNo" bson:"serialNo"`
	ModelNo       string             `json:"modelNo" bson:"modelNo"`
	CreatedAt     time.Time          `json:"created_at" bson:"created_at"`
	UpdatedAt     time.Time          `json:"updated_at" bson:"updated_at"`
}
