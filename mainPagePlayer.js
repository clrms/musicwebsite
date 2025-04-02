  // Audio setup
  const audioPlayer = new Audio();
  let currentPlaylist = [];
  let currentSongIndex = 0;
  let isZoomed = false;

  // DOM elements
  const elements = {
      musicPlayer: document.getElementById('musicPlayer'),
      playerImg: document.getElementById('playerImg'),
      roomBackground: document.getElementById('roomBackground'),
      songTitle: document.getElementById('songTitle'),
      songArtist: document.getElementById('songArtist'),
      playPauseBtn: document.getElementById('playPauseBtn'),
      prevBtn: document.getElementById('prevBtn'),
      nextBtn: document.getElementById('nextBtn'),
      progressBar: document.getElementById('progressBar'),
      progressContainer: document.getElementById('progressContainer')
  };

  // Play song function
  function playSong(song, playlist, index) {
      if (!song) return;

      currentPlaylist = playlist || currentPlaylist;
      currentSongIndex = index || 0;

      elements.playerImg.src = song.img || 'default-cover.jpg';
      elements.roomBackground.src = song.img || 'default-cover.jpg';
      elements.songTitle.textContent = song.title;
      elements.songArtist.textContent = song.artist || 'Unknown Artist';

      audioPlayer.src = song.src;
      audioPlayer.play()
          .then(() => {
              elements.playPauseBtn.textContent = '⏸';
          })
          .catch(error => {
              console.error('Playback failed:', error);
          });
  }

  // Toggle zoom
  function toggleZoom() {
      isZoomed = !isZoomed;
      elements.musicPlayer.classList.toggle('zoomed', isZoomed);
  }

  // Player controls
  function togglePlayPause() {
      if (audioPlayer.paused) {
          audioPlayer.play();
          elements.playPauseBtn.textContent = '⏸';
      } else {
          audioPlayer.pause();
          elements.playPauseBtn.textContent = '⏯';
      }
  }

  function playPrevious() {
      if (currentPlaylist.length === 0) return;
      currentSongIndex = (currentSongIndex - 1 + currentPlaylist.length) % currentPlaylist.length;
      playSong(currentPlaylist[currentSongIndex]);
  }

  function playNext() {
      if (currentPlaylist.length === 0) return;
      currentSongIndex = (currentSongIndex + 1) % currentPlaylist.length;
      playSong(currentPlaylist[currentSongIndex]);
  }

  // Progress bar
  elements.progressContainer.addEventListener('click', (e) => {
      if (!audioPlayer.duration) return;
      const percent = e.offsetX / elements.progressContainer.clientWidth;
      audioPlayer.currentTime = percent * audioPlayer.duration;
  });

  // Time update
  audioPlayer.addEventListener('timeupdate', () => {
      if (audioPlayer.duration) {
          const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
          elements.progressBar.style.width = `${progress}%`;
      }
  });

  // Song ended
  audioPlayer.addEventListener('ended', playNext);

  // Event listeners
  elements.playerImg.addEventListener('click', toggleZoom);
  elements.playPauseBtn.addEventListener('click', togglePlayPause);
  elements.prevBtn.addEventListener('click', playPrevious);
  elements.nextBtn.addEventListener('click', playNext);

  // Test with sample song

  playSong(testSong, [testSong], 0);
