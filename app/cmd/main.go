package main

import (
	"context"
	"log"
	"time"

	"github.com/AndresKenji/reverse-proxy/internal/config"
	"github.com/AndresKenji/reverse-proxy/internal/server"
)

func main() {

	for {
		checkForRestart := make(chan bool)
		ctx, cancel := context.WithCancel(context.Background())
		srv := server.NewServer(ctx, checkForRestart)
		cfgFile, err := srv.GetLatestConfig()
		if err != nil {
			log.Fatal(err.Error())
		}
		if cfgFile == nil {
			log.Println("Loading default config...")
			cfgFile = srv.SetDefaultConfig()
		}
		srv.SetServerMux(cfgFile)

		// Iniciar la validación periódica en una goroutine
		go validateConfigPeriodically(srv, cfgFile, checkForRestart)

		// Iniciar el servidor en una goroutine
		go func() {
			log.Println("API GateWay running on port:", srv.Port)
			if err := srv.StartServer(); err != nil {
				log.Panic(err)
			}
		}()
		// Esperar a que se envíe `true` para reiniciar el servidor o cancelar el contexto
		select {
		case <-checkForRestart:
			log.Println("Restarting the server...")
			cancel() // Cancelar el contexto actual para apagar el servidor
		case <-ctx.Done():
			log.Println("Context canceled, shutting down the server...")
			return // Salir si el contexto fue cancelado por otra razón
		}
	}
}


// Goroutine que valida si hay una nueva configuración cada 5 minutos
func validateConfigPeriodically(srv *server.Server, currentConfig *config.ConfigFile, checkForRestart chan<- bool) {
	ticker := time.NewTicker(5 * time.Minute)
	defer ticker.Stop()

	for {
		select {
		case <-ticker.C:
			latestConfig, err := srv.GetLatestConfig()
			if err != nil {
				log.Printf("Error fetching latest config: %v", err)
				continue
			}
			if latestConfig != nil && latestConfig.CreatedAt.After(currentConfig.CreatedAt) {
				log.Println("Newer config found. Triggering restart.")
				checkForRestart <- true
				return // Salir de la goroutine para permitir el reinicio
			}
		}
	}
}