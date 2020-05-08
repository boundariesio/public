FROM golang:1.14-alpine AS builder

RUN apk add --no-cache git

ENV CGO_ENABLED=0

WORKDIR /app

COPY go.mod .
COPY go.sum .

RUN go mod download

COPY . .

FROM builder as test

RUN go test -v

RUN go build -o ./server .

FROM alpine:3.9

RUN apk add ca-certificates

COPY --from=test /app/server /app/server

EXPOSE 8080

CMD ["/app/server"]
