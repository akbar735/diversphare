package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Review struct {
	ID        primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	ProductId string             `json:"productId" bson:"productId"`
	Title     string             `json:"title" bson:"title"`
	Comment   string             `json:"comment" bson:"comment"`
	Rating    int                `json:"rating" bson:"rating"`
}
