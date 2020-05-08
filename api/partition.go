package main

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson"
)

type (
	Partition struct {
		Country string
		Echo    *echo.Echo
		Db      *Db
	}
)

func NewPartition(country string, db *Db) (partition *Partition) {
	e := echo.New()

	partition = &Partition{
		Country: country,
		Echo:    e,
		Db:      db,
	}

	addRoutes(partition)

	return
}

func addRoutes(p *Partition) {
	p.Echo.GET("/contains", func(c echo.Context) (err error) {
		coords := new(Coords)
		if err = c.Bind(coords); err != nil {
			return
		}

		c.Response().Header().Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
		c.Response().WriteHeader(http.StatusOK)
		enc := json.NewEncoder(c.Response())

		err = p.Db.FindContaining(p.Country, coords, func(result bson.M) {
			if err = enc.Encode(result); err != nil {
				log.Printf("%v", err)
			}
		})
		c.Response().Flush()

		return
	})

	p.Echo.GET("/:featuretype/contains", func(c echo.Context) (err error) {
		coords := new(Coords)
		if err = c.Bind(coords); err != nil {
			return
		}

		result, err := p.Db.FindOneContaining(p.Country, c.Param("featuretype"), coords)
		if err != nil {
			return
		}

		return c.JSON(http.StatusOK, result)
	})
}
