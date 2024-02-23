package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Commission struct {
	ID        primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	SellerId  string             `json:"sellerId" bson:"sellerId"`
	OrderId   string             `json:"orderId" bson:"orderId"`
	AmountDue float64            `json:"amountDue" bson:"amountDue"`
}
