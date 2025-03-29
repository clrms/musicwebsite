// Audio player setup
const audioPlayer = new Audio();
let currentPlaylist = [];
let currentSongIndex = 0;

// DOM elements
const playerImg = document.getElementById('playerImg');
const songTitle = document.getElementById('songTitle');
const songArtist = document.getElementById('songArtist');
const playPauseBtn = document.getElementById('playPauseBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const volumeSlider = document.getElementById('volumeSlider');
const progressBar = document.querySelector('.progress-bar');

// Enhanced play song function
function playSong(song, playlist, index) {
    currentPlaylist = playlist || currentPlaylist;
    currentSongIndex = index || 0;
    
    // Update player UI
    playerImg.src = song.img || 'default-cover.jpg';
    songTitle.textContent = song.title;
    songArtist.textContent = song.artist;
    
    // Set audio source
    audioPlayer.src = song.src;
    audioPlayer.play()
        .then(() => {
            playPauseBtn.textContent = '⏸';
        })
        .catch(error => {
            console.error('Playback failed:', error);
        });
}

// Player controls
playPauseBtn.addEventListener('click', () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseBtn.textContent = '⏸';
    } else {
        audioPlayer.pause();
        playPauseBtn.textContent = '⏯';
    }
});

prevBtn.addEventListener('click', () => {
    if (currentPlaylist.length > 0) {
        currentSongIndex = (currentSongIndex - 1 + currentPlaylist.length) % currentPlaylist.length;
        playSong(currentPlaylist[currentSongIndex]);
    }
});

nextBtn.addEventListener('click', () => {
    if (currentPlaylist.length > 0) {
        currentSongIndex = (currentSongIndex + 1) % currentPlaylist.length;
        playSong(currentPlaylist[currentSongIndex]);
    }
});

// Volume control
volumeSlider.addEventListener('input', () => {
    audioPlayer.volume = volumeSlider.value / 100;
});

// Initialize volume
audioPlayer.volume = volumeSlider.value / 100;

// Progress bar update
audioPlayer.addEventListener('timeupdate', () => {
    if (audioPlayer.duration) {
        const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressBar.style.width = `${progress}%`;
    }
});

// When song ends
audioPlayer.addEventListener('ended', () => {
    nextBtn.click();
});
