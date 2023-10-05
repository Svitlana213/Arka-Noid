package main
import (
	"fmt"
	"log"
	"net/http"
)
func main() {
	port := ":8084"
	http.HandleFunc("/", MainHandler)
	http.Handle("/template/", http.StripPrefix("/template/", http.FileServer(http.Dir("./template/"))))
	fmt.Println("Starting server on http://localhost" + port)
	log.Fatal(http.ListenAndServe(port, nil))
}
func MainHandler(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/" {
		w.WriteHeader(404)
		return
	}
	http.ServeFile(w, r, "template/index.html")
}