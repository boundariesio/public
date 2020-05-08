package main

import (
	"context"
	"log"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

type (
	Db struct {
		Database
	}
	Coords struct {
		Lat float64 `json:"lat" form:"lat" query:"lat"`
		Lng float64 `json:"lng" form:"lng" query:"lng"`
	}
	Feature struct {
		Properties map[string]string `json:"properties"`
		Type       string            `json:"type"`
		Geometry   interface{}       `json:"geometry"`
	}
)

func NewDb() (db *Db, err error) {
	dbUrl, ok := os.LookupEnv("MONGO_URL")
	if !ok {
		log.Fatal("MONGO_URL is required")
	}

	connectCtx, connectCancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer connectCancel()
	client, err := mongo.Connect(connectCtx, options.Client().ApplyURI(dbUrl))
	if err != nil {
		return
	}

	pingCtx, pingCancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer pingCancel()
	err = client.Ping(pingCtx, readpref.Primary())
	if err != nil {
		return
	}

	db = &Db{client.Database("boundaries")}

	return
}

func NewMockDb() (db *Db, err error) {
	db = &Db{&MockMongo{}}
	return
}

func (db *Db) NewCoordsIntersectFilter(coords *Coords) bson.M {
	return bson.M{
		"geometry": bson.M{
			"$geoIntersects": bson.M{
				"$geometry": bson.M{
					"type":        "Point",
					"coordinates": bson.A{coords.Lng, coords.Lat},
				},
			},
		},
	}
}

func (db *Db) FindOneContaining(collection string, featureType string, coords *Coords) (result bson.M, err error) {
	filter := db.NewCoordsIntersectFilter(coords)
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	filter["type"] = featureType
	err = db.Collection(collection).FindOne(ctx, filter).Decode(&result)
	return
}

func (db *Db) FindContaining(collection string, coords *Coords, callback func(bson.M)) (err error) {
	filter := db.NewCoordsIntersectFilter(coords)
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()
	cur, err := db.Collection(collection).Find(ctx, filter)
	if err != nil {
		return
	}
	defer cur.Close(ctx)
	for cur.Next(ctx) {
		var result bson.M
		err = cur.Decode(&result)
		if err != nil {
			return
		}
		callback(result)
	}
	if err = cur.Err(); err != nil {
		return
	}
	return
}
