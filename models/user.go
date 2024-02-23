package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Address struct {
	State       string `json:"state" bson:"state"`
	City        string `json:"city" bson:"city"`
	Pincode     int    `json:"pincode" bson:"pincode"`
	Country     string `json:"country" bson:"country"`
	FullAddress string `json:"fullAddress" bson:"fullAddress"`
}

type User struct {
	ID            primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	Name          string             `json:"name" bson:"name"`
	Email         string             `json:"email" bson:"email"`
	DOB           string             `json:"dob" bson:"dob"`
	Password      string             `json:"password" bson:"password"`
	Address       Address            `json:"address" bson:"address"`
	ComissionRate float64            `json:"comissionRate" bson:"comissionRate"`
	CountryCode   string             `json:"countryCode" bson:"countryCode"`
	MobileNo      string             `json:"mobileNo" bson:"mobileNo"`
	IsSeller      bool               `json:"isSeller" bson:"isSeller"`
	CreatedAt     time.Time          `json:"created_at" bson:"created_at"`
	UpdatedAt     time.Time          `json:"updated_at" bson:"updated_at"`
}
