package main

import (
	"log"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestThing(t *testing.T) {
	db, err := NewMockDb()
	if err != nil {
		log.Fatal(err)
	}
	p := NewPartition("us", db)
	request, err := http.NewRequest(http.MethodGet, "/v2", nil)
	request.Header.Set("Authorization", "Bearer abc")
	if err != nil {
		t.Fatal(err)
	}
	response := httptest.NewRecorder()

	p.Echo.ServeHTTP(response, request)

	assert.Equal(t, response.Code, http.StatusUnauthorized, "status should be unauthorized")
}
