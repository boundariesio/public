package main

import (
	"context"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Database interface {
	Collection(string, ...*options.CollectionOptions) *mongo.Collection
}

type MockMongo struct{}

type MockCollection struct {
	Name string
}

type Collection interface {
	Find(context.Context, interface{}) (interface{}, error)
	FindOne(context.Context, interface{}) (interface{}, error)
}

func (c *MockCollection) Find(ctx context.Context, filter interface{}) (interface{}, error) {
	return []map[string]string{}, nil
}

func (c *MockCollection) FindOne(ctx context.Context, filter interface{}) (interface{}, error) {
	return map[string]string{}, nil
}

func (m *MockMongo) Collection(name string, args ...*options.CollectionOptions) *mongo.Collection {
	return new(mongo.Collection)
}
