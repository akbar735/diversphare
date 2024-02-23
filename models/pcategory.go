package models

type Pcategory struct {
	CategoryId int    `json:"categoryId" bson:"categoryId"`
	Label      string `json:"label" bson:"label"`
}
