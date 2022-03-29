"use strict"
const ytKey = 'AIzaSyCg2PZMWAzuHJmRu2tntt3pUPDVlxHbqEU',
  searchBtn = document.getElementById('searchBtn'),
  searchInput = document.getElementById('searchInput'),
  showIns = document.querySelectorAll('.showIn'),
  thumbnailImg = document.getElementById('thumbnailImg')
  
  
  searchInput.focus()

function loadJSON(filePath, success, error) {
  const xhr = new XMLHttpRequest()
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        if (success) success(JSON.parse(xhr.responseText))
      } else {
        if (error) error(xhr)
      }
    }
  }
  xhr.open("GET", filePath, true)
  xhr.send()
}


let channelName, publishDate, thumbnailUrl, viewCount, subCount, videosCount, madeForKids, country


function search() {
  const splittedSearchInput = searchInput.value.split('/channel/')[1]

  loadJSON(`https://www.googleapis.com/youtube/v3/channels?id=${splittedSearchInput}&key=${ytKey}&part=statistics,status,%20snippet`,
    (data) => {
      const base = data.items[0]

      thumbnailUrl = base.snippet.thumbnails.medium.url
      const arr = [
        channelName = base.snippet.title,
        publishDate = base.snippet.publishedAt,
        videosCount = base.statistics.videoCount,
        subCount = base.statistics.subscriberCount,
        viewCount = base.statistics.viewCount,
        country = base.snippet.country,
        madeForKids = base.status.madeForKids
      ]


      thumbnailImg.setAttribute('src', thumbnailUrl)

      for(let i =0; i < arr.length; i++){
        if(arr[i]){
          showIns[i].innerHTML = arr[i]
        } else{
          showIns[i].innerHTML = '-'
        }
        
      }


    }
  )
}

searchBtn.addEventListener('click', search)




