package models

type Psubcategory struct {
	SubcategoryId int    `json:"subCategoryId" bson:"subCategoryId"`
	Label         string `json:"label" bson:"label"`
}
