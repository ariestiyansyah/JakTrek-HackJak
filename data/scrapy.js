var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://buswayapi.apiary.io/busway/koridor/1?apiKey=sHb9LYwHbVXEQZrzGvF0Wi7Jm1Bm5q6E&page=1&per_page=100');
xhr.onreadystatechange = function () {
  if (this.readyState == 4) {
    if (typeof cb !== "undefined") {
      cb(this);
    }
    else {
      alert('Status: '+this.status+'\nHeaders: '+JSON.stringify(this.getAllResponseHeaders())+'\nBody: '+this.responseText);
    }
  }
};
xhr.send(null);
