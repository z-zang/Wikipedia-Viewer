// Test
// alert('hello')
// console.log('check0')


//
// document.addEventListener('keydown', getWikipedia);

function fetchInput(){
var searchTerm = document.getElementById("textInput").value;
  if (searchTerm.length == 0){
    alert('Please enter a valid search term!')
  } else {
    // alert(searchTerm);
    getWikipedia(searchTerm);
  }

}

function getWikipedia(searchTerm){
  fetch('https://en.wikipedia.org/w/api.php?action=query&list=search&utf8=1&srsearch=' + searchTerm + '&format=json&formatversion=2&origin=*')
  .then((res) => res.json())

  // forEach would be better but idk how to make it work

  // .then((data) => {
  //   data.query.search.forEach((obj) => {
  //     document.getElementById('results').innerHTML += JSON.stringify(data.query.search[0].wordcount);
  //   })
  // })

  .then((data) => {
    document.getElementById('results').innerHTML = '';
    document.getElementById('pResult').innerHTML = 'Results: ';

    for (var i = 0; i < data.query.search.length; i++){
      var outLink = "https://en.wikipedia.org/?curid=" + JSON.stringify(data.query.search[i].pageid);

      document.getElementById('results').innerHTML +=
      `<div class="result-box" onclick="window.open('${outLink}', 'mywindow');" style="cursor: pointer;">`

      // '<div class="result-box" onclick="window.open('
      // +')'
      +'<h4>'
      + JSON.stringify(data.query.search[i].title)
      + '</h4><p>'
      + JSON.stringify(data.query.search[i].snippet)
      + '...</p>'
      // + '<a href="https://en.wikipedia.org/?curid=' + JSON.stringify(data.query.search[i].pageid) + '" target="_blank">Link to article</a>'
      +'</div><br>';
    }

    if (document.getElementById('results').innerHTML == ''){
      document.getElementById('results').innerHTML = 'No results. Have you spelled your query correctly?';
    }

  })

}



//  Old
function getWikipediaOld(searchTerm){
  var request = new XMLHttpRequest();

  request.open('GET', 'https://en.wikipedia.org/w/api.php?action=query&list=search&utf8=1&srsearch=' + searchTerm + '&format=json&formatversion=2&origin=*', true)
  // request.responseType = 'json'; // not necessary as result is already in json as requested

  // Test
  // console.log('check1', searchTerm)

  request.onload = function(){
    if (this.status >= 200 && this.status < 400) {
      // Test
      // alert('server is responding');
      var response = JSON.parse(this.response);

      console.log(response);
      document.getElementById('main').innerHTML += JSON.stringify(response);

      console.log(response);

    } else {
      console.log('reached server but returned error')
    }

  }

  request.send();
}
