"use strict";

const API_KEY = "AIzaSyB6RQPxv-X6aojxx9IKh0Nc4twyqlMnitI";

let app = {
   result: {
      videos: [],
      selectedVideo: null,
      searchTerm: "iPhone X"
   },

   init: function() {
      //app.videoSearch("iPhone");
      app.youtubeSearch("iPhone X");
   },
   //<iframe className="embed-responsive-item" src={url}> </iframe>
   getVideoList: function(videos) {
      return videos.map((video, index) => {
         const imageUrl = video.snippet.thumbnails.default.url;
         const url = `https://www.youtube.com/embed/${video.id.videoId}`;
         return `<li>
<div class="row">
	<div class="col-md-6 col-xs-4">
		<img class="media-object" src=${imageUrl} /> 
	</div>
	<div class="col-md-6 col-xs-8" >
		<h5 style="color:#000;font-weight:bold">${video.snippet.title}</h5>
		<h6 class="descripcion" style="color:#000; text-transform:none">${video.snippet.description}</h6>
	</div>
</div>
</li>`;
      });
   },
	
	playVideo: function(videos){
		const url = `https://www.youtube.com/embed/${video.id.videoId}`;
		return `<iframe class="embed-responsive-item" src=${url}> </iframe>`;
	},
	/* <p>
						
                        <iframe class="embed-responsive-item" src=${url}> </iframe>
                     </p>*/
   youtubeSearch: function(searchTerm) {
      console.log(searchTerm);

      YTSearch({ key: API_KEY, term: searchTerm }, data => {
         console.log("result", data);
         app.result = {
            videos: data,
            selectedVideo: data[0],
            searchTerm: searchTerm
         };
         var list = app.getVideoList(app.result.videos);
		  var videoYoutube = app.playVideo(app.result.selectedVideo);
         console.log("lis: ", list);
         $("#root").append(list);
		  $("#video").append(videoYoutube);
      });
   },
   videoSearch: function(searchTerm) {
      jQuery.getJSON("list.json", data => {
         console.log("result", data.items);
         app.result = {
            videos: data.items,
            selectedVideo: data.items[0],
            searchTerm: searchTerm
         };
         var list = app.getVideoList(app.result.videos);
         console.log("lis: ", list);
         $("#root").append(list);
      });
   }
};

$(document).ready(app.init);
