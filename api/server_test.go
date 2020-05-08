package main

import (
	"log"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestBadKeyIsUnauthorized(t *testing.T) {
	db, err := NewMockDb()
	if err != nil {
		log.Fatal(err)
	}
	s := NewServer(db)
	request, err := http.NewRequest(http.MethodGet, "/v2", nil)
	request.Header.Set("Authorization", "Bearer abc")
	if err != nil {
		t.Fatal(err)
	}
	response := httptest.NewRecorder()

	s.Echo.ServeHTTP(response, request)

	assert.Equal(t, response.Code, http.StatusUnauthorized, "status should be unauthorized")
}

func TestNoKeyIsBadRequest(t *testing.T) {
	db, err := NewMockDb()
	if err != nil {
		log.Fatal(err)
	}
	s := NewServer(db)
	request, err := http.NewRequest(http.MethodGet, "/v2", nil)
	if err != nil {
		t.Fatal(err)
	}
	response := httptest.NewRecorder()

	s.Echo.ServeHTTP(response, request)

	assert.Equal(t, response.Code, http.StatusBadRequest, "status should be bad request")
}

func TestHealthCheckHandler(t *testing.T) {
	db, err := NewMockDb()
	if err != nil {
		log.Fatal(err)
	}
	s := NewServer(db)
	request, err := http.NewRequest(http.MethodGet, "/healthz", nil)
	if err != nil {
		t.Fatal(err)
	}
	response := httptest.NewRecorder()

	s.Echo.ServeHTTP(response, request)

	assert.Equal(t, response.Code, http.StatusOK, "should be a 200")
	assert.Equal(t, response.Body.String(), "OK", "should return OK")
}
