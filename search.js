const musicData = [
  { title: "Song 1", url: "audio.mp3" },
  { title: "Song 2", url: "music/song2.mp3" },
  { title: "Song 3", url: "music/song3.mp3" },
  { title: "Song 4", url: "music/song4.mp3" }
];

function searchMusic() {
  const query = document.getElementById('search-bar').value.toLowerCase();
  const results = musicData.filter(song => song.title.toLowerCase().includes(query));
  displayResults(results);
}

function displayResults(results) {
  const musicList = document.getElementById('music-list');
  musicList.innerHTML = ''; // Clear previous results

  if (results.length === 0) {
      musicList.innerHTML = '<p>No songs found</p>';
      return;
  }

  results.forEach(song => {
      const div = document.createElement('div');
      div.classList.add('music-item');
      div.innerText = song.title;
      div.onclick = () => playSong(song.url);
      musicList.appendChild(div);
  });
}

function playSong(url) {
  const audioPlayer = document.getElementById('audio-player');
  const audioSource = document.getElementById('audio-source');
  audioSource.src = url;
  audioPlayer.load();
  audioPlayer.play();
}