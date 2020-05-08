package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

type Server struct {
	Echo       *echo.Echo
	Partitions map[string]*Partition
}

func NewServer(db *Db) *Server {
	partitions := map[string]*Partition{}
	partitions["us"] = NewPartition("us", db)
	// partitions["uk"] = NewPartition("uk")
	// partitions["ca"] = NewPartition("ca")
	e := echo.New()
	s := Server{e, partitions}

	e.GET("/healthz", s.handleHealthCheck)

	v2 := e.Group("/v2")

	v2.Use(middleware.Logger())
	v2.Use(middleware.Recover())
	// prometheus.NewPrometheus("echo", nil).Use(e)
	v2.Use(middleware.CORS())
	v2.Use(middleware.Gzip())
	v2.Use(middleware.RequestID())
	v2.Use(middleware.KeyAuth(s.validateKey))
	v2.Any("/*", s.routeToPartition)

	return &s
}

func (s *Server) listen() {
	port, ok := os.LookupEnv("PORT")
	if !ok {
		log.Fatal("PORT is required")
	}

	s.Echo.Logger.Fatal(s.Echo.Start(fmt.Sprintf("0.0.0.0:%s", port)))
}

func (s *Server) validateKey(key string, c echo.Context) (bool, error) {
	return key == "valid", nil
}

func (s *Server) routeToPartition(c echo.Context) (err error) {
	req := c.Request()
	res := c.Response()
	host_parts := strings.Split(req.Host, ".")
	subdomain := host_parts[0]
	partition := s.Partitions[subdomain]

	log.Printf("%v", req.Host)

	if partition == nil {
		err = echo.ErrNotFound
	} else {
		partition.Echo.ServeHTTP(res, req)
	}
	return
}

func (s *Server) handleHealthCheck(c echo.Context) error {
	return c.String(http.StatusOK, "OK")
}
