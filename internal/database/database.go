package database

import (
	"context"
	"log"
	"os"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Database struct {
	URL   string
	Port  string
	Mongo *mongo.Client
}

func NewDatabase() *Database {
	url := os.Getenv("mongo_url")
	port := os.Getenv("mongo_port")
	db := &Database{}
	db.Port = port
	db.URL = url

	// Mostrar URL y puerto para verificar
	log.Println("Mongo URL:", db.URL)
	log.Println("Mongo Port:", db.Port)

	err := db.StartMongo()
	if err != nil {
		log.Fatal("Error setting mongo db:", err)
	}
	return db
}

func (d *Database) StartMongo() error {
	usr := os.Getenv("mongo_user")
	pwd := os.Getenv("mongo_pwd")

	// Crear opciones de conexión
	clientOptions := options.Client().ApplyURI(d.URL)
	clientOptions.SetAuth(options.Credential{
		Username: usr,
		Password: pwd,
	})

	// Conectar
	client, err := mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		log.Println("Connection Error:", err)
		return err
	}

	// Verificar conexión
	err = client.Ping(context.TODO(), nil)
	if err != nil {
		log.Println("Test Connection failed with error:", err)
		return err
	}

	log.Println("Connected to MongoDB!")
	d.Mongo = client
	return nil	
}


