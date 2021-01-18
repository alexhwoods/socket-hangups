package main

import (
	"fmt"
	"net/http"
	"time"
)

func main() {
	http.HandleFunc("/", HelloServer)
	http.ListenAndServe(":4004", nil)
}

func HelloServer(w http.ResponseWriter, r *http.Request) {
	timer1 := time.NewTimer(3 * time.Second)
	<-timer1.C

	fmt.Fprint(w, "b-go", r.URL.Path[1:])
}
