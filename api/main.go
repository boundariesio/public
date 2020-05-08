package main

import "log"

func main() {
	db, err := NewDb()
	if err != nil {
		log.Fatal(err)
	}
	s := NewServer(db)
	s.listen()
}
