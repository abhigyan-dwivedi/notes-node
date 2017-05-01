package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
)

func main() {
	urls := []string{"http://www.oreilly.com", "https://youtube.com", "https://bing.com", "https://msn.com", "https://google.com", "https://facebook.com", "https://github.com", "https://bbc.co.uk"}

	urlCh := make(chan string)
	sizeCh := make(chan string)

	for i := 0; i < 15; i++ {
		go worker(urlCh, sizeCh, i)
	}

	for _, url := range urls {
		go generator(url, urlCh) //load balancing
	}

	for i := 0; i < len(urls); i++ {
		fmt.Printf("\nThe page details: %s", <-sizeCh)
	}

}

func getPage(url string) (int, error) {
	resp, err := http.Get(url)
	if err != nil {
		return 0, err
	}

	defer resp.Body.Close()

	b, err := (ioutil.ReadAll(resp.Body))

	if err != nil {
		return 0, err
	}

	return len(b), nil

}

func worker(urlCh chan string, sizeCh chan string, id int) {
	for {

		url := <-urlCh
		len, err := getPage(url)
		if err == nil {
			sizeCh <- fmt.Sprintf("%s: size:%d 	:id:%d", url, len, id)
		} else {
			sizeCh <- fmt.Sprintf("%s: error:%s :id:%d", url, err, id)
		}
	}

}

func generator(url string, urlCh chan string) {
	urlCh <- url
}
