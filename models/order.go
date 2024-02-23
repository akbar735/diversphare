package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type PaymentDetail struct {
	Mode          string  `json:"mode" bson:"mode"`
	MerchantName  string  `json:"merchantName" bson:"merchantName"`
	TransactionId string  `json:"transactionId" bson:"transactionId"`
	Amount        float64 `json:"amount" bson:"amount"`
}

type Order struct {
	ID              primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	UserId          string             `json:"userId" bson:"userId"`
	ProductId       string             `json:"productId" bson:"productId"`
	Qty             int                `json:"qty" bson:"qty"`
	OrderStatus     string             `json:"orderStatus" bson:"orderStatus"`
	OrderTrackingId string             `json:"orderTrackingId" bson:"orderTrackingId"`
	PaymentDetail   PaymentDetail      `json:"paymentDetail" bson:"paymentDetail"`
}
