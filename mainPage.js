document.addEventListener("DOMContentLoaded", function () {
    const homeSections = ["quickPlay", "mixedPlayer", "recommendedSongs"];
    const pages = ["categoryPage", "explorePage", "samplesPage", "albumPage", "albumSongsPage", "aboutUs"]; 
    const pageTitle = document.getElementById("pageTitle");

    document.getElementById("samplesBtn").addEventListener("click", function() {
        showPage("samplesPage", "Samples");
        loadSampleVideos();
    });

    function showPage(pageId, title) {
        homeSections.forEach(id => document.getElementById(id).classList.add("hidden"));
        pages.forEach(id => document.getElementById(id).classList.add("hidden"));
        document.getElementById(pageId).classList.remove("hidden");
        pageTitle.innerText = title;
    }

    function showHome() {
        pages.forEach(id => document.getElementById(id).classList.add("hidden"));
        homeSections.forEach(id => document.getElementById(id).classList.remove("hidden"));
        pageTitle.innerText = "Home";

        loadSongs("quickPlaySongs", songsData.quickPlay);
        loadSongs("mixedSongs", songsData.mixedPlayer);
        loadSongs("recommendedSongsList", songsData.recommendedSongs);
    }

    function loadSongs(sectionId, songsArray) {
        const section = document.getElementById(sectionId);
        section.innerHTML = "";
        
        songsArray.forEach((song, index) => {
            const songCard = document.createElement("div");
            songCard.classList.add("song-card");
            songCard.innerHTML = `
                <img src="${song.img}">
                <div class="song-info">
                    <h3>${song.title}</h3>
                    <p>${song.artist}</p>
                </div>
            `;
            
            // Updated click handler with playlist support
            songCard.addEventListener("click", () => {
                playSong(song, songsArray, index);
            });
            
            section.appendChild(songCard);
        });
    }

    function loadAlbums() {
        const albumSection = document.getElementById("albumArtists");
        albumSection.innerHTML = "";
        
        songsData.albums.forEach(album => {
            const albumCard = document.createElement("div");
            albumCard.classList.add("song-card");
            albumCard.innerHTML = `
                <img src="${album.albumImg}">
                <p>${album.artist}</p>
            `;
            
            albumCard.addEventListener("click", () => {
                showAlbumSongs(album);
            });
            
            albumSection.appendChild(albumCard);
        });
    }

    function loadSampleVideos() {
        const section = document.getElementById("sampleVideos");
        section.innerHTML = "";
        
        songsData.samples.forEach(video => {
            const videoCard = document.createElement("div");
            videoCard.classList.add("video-card");
            
            videoCard.innerHTML = `
                <div class="video-thumbnail">
                    <img src="${video.thumbnail || 'default-thumb.jpg'}">
                    <button class="play-button">▶</button>
                </div>
                <div class="video-info">
                    <h3>${video.title}</h3>
                    <p>${video.artist}</p>
                </div>
                <video class="hidden">
                    <source src="${video.src}" type="video/mp4">
                </video>
            `;
            
            // Optional: Auto-play on hover
            const videoElement = videoCard.querySelector("video");
            videoElement.addEventListener("mouseenter", function() {
                this.play();
            });
            videoElement.addEventListener("mouseleave", function() {
                this.pause();
                this.currentTime = 0;
            });
            
            section.appendChild(videoCard);
        });
    }

    function showAlbumSongs(album) {
        const albumSongsSection = document.getElementById("albumSongs");
        albumSongsSection.innerHTML = "";
        
        album.songs.forEach((song, index) => {
            const songCard = document.createElement("div");
            songCard.classList.add("song-card");
            songCard.innerHTML = `
                <img src="${song.img}">
                <div class="song-text">
                    <h3>${song.title}</h3>
                </div>
            `;
            
            // Updated click handler with playlist support
            songCard.addEventListener("click", () => {
                playSong(song, album.songs, index);
            });
            
            albumSongsSection.appendChild(songCard);
        });
        
        showPage("albumSongsPage", album.artist);
    }

    // Sidebar Navigation
    document.getElementById("homeBtn").addEventListener("click", showHome);
    document.getElementById("exploreBtn").addEventListener("click", function() {
        showPage("explorePage", "Explore");
        loadSongs("exploreSongs", songsData.explore);
    });
    document.getElementById("samplesBtn").addEventListener("click", function() {
        showPage("samplesPage", "Samples");
        loadSampleVideos();
    });
    document.getElementById("albumBtn").addEventListener("click", function() {
        showPage("albumPage", "Albums");
        loadAlbums();
    });
    
    // Genre & Categories Navigation
    document.getElementById("genreSelect").addEventListener("change", function() {
        if (this.value) {
            showPage("categoryPage", this.value + " Songs");
            loadSongs("categorySongs", songsData.genres[this.value]);
        }
    });

    document.getElementById("favoriteBtn").addEventListener("click", function() {
        showPage("categoryPage", "Favorite Songs");
        loadSongs("categorySongs", songsData.categories.Favorite);
    });

    document.getElementById("mostLikedBtn").addEventListener("click", function() {
        showPage("categoryPage", "Most Liked Songs");
        loadSongs("categorySongs", songsData.categories.MostLiked);
    });

    document.getElementById("popularBtn").addEventListener("click", function() {
        showPage("categoryPage", "Popular Songs");
        loadSongs("categorySongs", songsData.categories.Popular);
    });

    // Initialize
    showHome();
});
