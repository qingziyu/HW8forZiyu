var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');


// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



const axios = require("axios");

app.all('*',function (request,response,next){
  response.header('Access-Control-Allow-Origin','*');
  response.header('Access-Control-Allow-Methods','PUT,POST,GET')

  if(request.method=='OPTIONS'){
    response.send(200);
  }
  else {
    next();
  }
})

app.get('/slideshow', function (req, res) {
  axios.get("https://api.themoviedb.org/3/movie/now_playing?api_key=18222ca069988f617ff085e4d8ca094e&language=en-US&page=1")
    .then(function (response){
      var data = response["data"];
      // console.log(data);
      var slideShowMovie = new Array();
      for (var i = 0 ; i<5 ; i++){
        slideShowMovie[i]={
          ID:data.results[i].id,
          title:data.results[i].title,
          backdrop_path:data.results[i].backdrop_path
        }
      }
      // console.log(slideShowMovie);
      res.send(slideShowMovie);
    })
})

app.get('/popMov',function (req, res){
  axios.get('https://api.themoviedb.org/3/movie/popular?api_key=18222ca069988f617ff085e4d8ca094e&language=en-US&page=1')
    .then(function (response){
      var data = response["data"];
      // console.log(data);
      var popMov = new Array();
      for (var i = 0; i<20; i++){
        popMov[i]={
          ID:data.results[i].id,
          title:data.results[i].title,
          poster_path:data.results[i].poster_path
        }
      }
      // console.log(popMov);
      res.send(popMov)
    })
})

app.get('/ratedMov',function (req, res){
  axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=18222ca069988f617ff085e4d8ca094e&language=en-US&page=1')
    .then(function (response){
      const data = response["data"];
      // console.log(data);
      var ratedMov = new Array();
      for (let i = 0; i<20; i++){
        ratedMov[i]={
          ID:data.results[i].id,
          title:data.results[i].title,
          poster_path:data.results[i].poster_path
        }
      }
      // console.log(ratedMov);
      res.send(ratedMov)
    })
})

app.get('/trendingMov',function (req, res){
  axios.get('https://api.themoviedb.org/3/trending/movie/day?api_key=18222ca069988f617ff085e4d8ca094e')
    .then(function (response){
      var data = response["data"];
      // console.log(data);
      var trendingdMov = new Array();
      for (let i = 0; i<20; i++){
        trendingdMov[i]={
          ID:data.results[i].id,
          title:data.results[i].title,
          poster_path:data.results[i].poster_path
        }
      }
      // console.log(trendingdMov);
      res.send(trendingdMov);
    })
})

app.get('/popTV',function (req, res){
  axios.get('https://api.themoviedb.org/3/tv/popular?api_key=18222ca069988f617ff085e4d8ca094e&language=en-US&page=1')
    .then(function (response){
      var data = response["data"];
      // console.log(data);
      var popTV = new Array();
      for (let i = 0; i<20; i++){
        popTV[i]={
          ID:data.results[i].id,
          name:data.results[i].name,
          poster_path:data.results[i].poster_path
        }
      }
      // console.log(popTV);
      res.send(popTV);
    })
})

app.get('/ratedTV',function (req, res){
  axios.get('https://api.themoviedb.org/3/tv/top_rated?api_key=18222ca069988f617ff085e4d8ca094e&language=en-US&page=1')
    .then(function (response){
      var data = response["data"];
      // console.log(data);
      var ratedTV = new Array();
      for (let i = 0; i<20; i++){
        ratedTV[i]={
          ID:data.results[i].id,
          name:data.results[i].name,
          poster_path:data.results[i].poster_path
        }
      }
      // console.log(ratedTV);
      res.send(ratedTV);
    })
})

app.get('/trendingTV',function (req, res){
  axios.get('https://api.themoviedb.org/3/trending/tv/day?api_key=18222ca069988f617ff085e4d8ca094e')
    .then(function (response){
      var data = response["data"];
      // console.log(data);
      var trendingTV = new Array();
      for (let i = 0; i<20; i++){
        trendingTV[i]={
          ID:data.results[i].id,
          name:data.results[i].name,
          poster_path:data.results[i].poster_path
        }
      }
      // console.log(trendingTV);
      res.send(trendingTV);
    })
})

app.get('/movie/:tagId', function (req, res){
  // console.log(req.params.tagId);
  var movieInfo = new Array();
  let firstData = axios.get('https://api.themoviedb.org/3/movie/'+ req.params.tagId +'/videos?api_key=18222ca069988f617ff085e4d8ca094e&language=en-US&page=1')
  let secData = axios.get('https://api.themoviedb.org/3/movie/'+ req.params.tagId +'?api_key=18222ca069988f617ff085e4d8ca094e&language=en-US&page=1')
  let thirdData = axios.get('https://api.themoviedb.org/3/movie/'+ req.params.tagId +'/credits?api_key=18222ca069988f617ff085e4d8ca094e&language=en-US&page=1')
  let fourthData = axios.get('https://api.themoviedb.org/3/movie/'+ req.params.tagId +'/reviews?api_key=18222ca069988f617ff085e4d8ca094e&language=en-US&page=1')
  let fifthData = axios.get('https://api.themoviedb.org/3/movie/'+ req.params.tagId +'/recommendations?api_key=18222ca069988f617ff085e4d8ca094e&language=en-US&page=1')
  let sixthData = axios.get('https://api.themoviedb.org/3/movie/'+ req.params.tagId +'/similar?api_key=18222ca069988f617ff085e4d8ca094e&language=en-US&page=1')
  // .then(function (response){
  //   var data = response["data"];
  //   console.log(data);
  // })
  Promise.all([firstData, secData, thirdData, fourthData, fifthData, sixthData]).then((value) => {
    // console.log(value[3])
    // console.log(value[1]['data']);
    movieInfo[0] = value[0]['data']['results'];
    movieInfo[1] = value[1]['data'];
    movieInfo[2] = value[2]['data'];
    movieInfo[3] = value[3]['data']['results'];
    movieInfo[4] = value[4]['data']['results'];
    movieInfo[5] = value[5]['data']['results'];
    // console.log(movieInfo[3]);
    res.json(movieInfo);
  });
})


app.get('/tv/:tagId', function (req, res){
  // console.log(req.params.tagId);
  var tvInfo = new Array();
  let firstData = axios.get('https://api.themoviedb.org/3/tv/'+ req.params.tagId +'/videos?api_key=18222ca069988f617ff085e4d8ca094e&language=en-US&page=1')
  let secData = axios.get('https://api.themoviedb.org/3/tv/'+ req.params.tagId +'?api_key=18222ca069988f617ff085e4d8ca094e&language=en-US&page=1')
  let thirdData = axios.get('https://api.themoviedb.org/3/tv/'+ req.params.tagId +'/credits?api_key=18222ca069988f617ff085e4d8ca094e&language=en-US&page=1')
  let fourthData = axios.get('https://api.themoviedb.org/3/tv/'+ req.params.tagId +'/reviews?api_key=18222ca069988f617ff085e4d8ca094e&language=en-US&page=1')
  let fifthData = axios.get('https://api.themoviedb.org/3/tv/'+ req.params.tagId +'/recommendations?api_key=18222ca069988f617ff085e4d8ca094e&language=en-US&page=1')
  let sixthData = axios.get('https://api.themoviedb.org/3/tv/'+ req.params.tagId +'/similar?api_key=18222ca069988f617ff085e4d8ca094e&language=en-US&page=1')
  // .then(function (response){
  //   var data = response["data"];
  //   console.log(data);
  // })
  Promise.all([firstData, secData, thirdData, fourthData, fifthData, sixthData]).then((value) => {
    // console.log(value)
    // console.log(value[1]['data']);
    tvInfo[0] = value[0]['data']['results'];
    tvInfo[1] = value[1]['data'];
    tvInfo[2] = value[2]['data'];
    tvInfo[3] = value[3]['data']['results'];
    tvInfo[4] = value[4]['data']['results'];
    tvInfo[5] = value[5]['data']['results'];
    // console.log(tvInfo);
    res.json(tvInfo);
  });
})

app.get('/cast/:tagId', function (req, res){
  // console.log(req.params.tagId);
  var castInfo = new Array();
  let firstData = axios.get('https://api.themoviedb.org/3/person/'+ req.params.tagId +'?api_key=18222ca069988f617ff085e4d8ca094e&language=en-US&page=1')
  let secData = axios.get('https://api.themoviedb.org/3/person/'+ req.params.tagId +'/external_ids?api_key=18222ca069988f617ff085e4d8ca094e&language=en-US&page=1')
  Promise.all([firstData, secData]).then((value) => {
    // console.log(value)
    // console.log(value[1]['data']);
    castInfo[0] = value[0]['data'];
    castInfo[1] = value[1]['data'];
    // console.log(castInfo);
    res.json(castInfo);
  });
})


app.get('/cast/:tagId', function (req, res){
  // console.log(req.params.tagId);
  var castInfo = new Array();
  let firstData = axios.get('https://api.themoviedb.org/3/person/'+ req.params.tagId +'?api_key=18222ca069988f617ff085e4d8ca094e&language=en-US&page=1')
  let secData = axios.get('https://api.themoviedb.org/3/person/'+ req.params.tagId +'/external_ids?api_key=18222ca069988f617ff085e4d8ca094e&language=en-US&page=1')
  Promise.all([firstData, secData]).then((value) => {
    // console.log(value)
    // console.log(value[1]['data']);
    castInfo[0] = value[0]['data'];
    castInfo[1] = value[1]['data'];
    // console.log(castInfo);
    res.json(castInfo);
  });
})

app.get("/search/", async function (req, res) {
  const { search: query } = req.query;
  // console.log({query});
  const url = `https://api.themoviedb.org/3/search/multi?api_key=18222ca069988f617ff085e4d8ca094e&language=en-US&query=${query}&size=10&limit=10`;
  axios.get(url).then(function (response) {
    var data = response["data"];
    console.log(data);
    var searchResults = new Array();
    let i = 0;
    let j = 0;
    while (searchResults.length < 7 || i == data.results.length){
      if (data.results[i].backdrop_path == null){
        i++;
        continue;
      }
      searchResults[j] = {
        ID: data.results[i].id,
        type: data.results[i].media_type,
        poster_path: `https://image.tmdb.org/t/p/w500${data.results[i].backdrop_path}`,
        name: data.results[i].name || data.results[i].title,
      }
      if (searchResults[j].type == 'movie'){
        searchResults[j].ID = "watch/movie/".concat(searchResults[j].ID);
      }else {
        searchResults[j].ID = "watch/TV/".concat(searchResults[j].ID)
      }
      j++;
      i++;
    }

    // for (let i = 0; searchResults.length < 7; i++) {
    //   if (data.results[i].backdrop_path == null){
    //     continue;
    //   }
    //   searchResults[i] = {
    //     ID: data.results[i].id,
    //     type: data.results[i].media_type,
    //     poster_path: `https://image.tmdb.org/t/p/w500${data.results[i].backdrop_path}`,
    //     name: data.results[i].name || data.results[i].title,
    //   };
    //   if (searchResults[i].type == 'movie'){
    //     searchResults[i].ID = "watch/movie/".concat(searchResults[i].ID);
    //   }else {
    //     searchResults[i].ID = "watch/TV/".concat(searchResults[i].ID)
    //   }
    //   // console.log(searchResults[i].ID);
    // }
    res.send(searchResults);
  });
});

app.use(express.static(path.join(__dirname, 'dist/untitled')));
app.use('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist/untitled/index.html'));
});

app.listen(8080,function (){
  console.log("8080")
})





module.exports = app;
