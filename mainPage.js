document.addEventListener("DOMContentLoaded", function () {
    const homeSections = ["quickPlay", "mixedPlayer", "recommendedSongs"];
    const pages = ["categoryPage", "explorePage", "samplesPage", "albumPage", "albumSongsPage"];
    const pageTitle = document.getElementById("pageTitle");

    function showPage(pageId, title) {
        homeSections.forEach(id => document.getElementById(id).classList.add("hidden"));
        pages.forEach(id => document.getElementById(id).classList.add("hidden"));
        document.getElementById(pageId).classList.remove("hidden");
        pageTitle.innerText = title;
    }

    function showHome() {
        pages.forEach(id => document.getElementById(id).classList.add("hidden"));
        homeSections.forEach(id => document.getElementById(id).classList.remove("hidden"));
        pageTitle.innerText = "Quick Play";

        // ✅ Load Songs into Home Sections
        loadSongs("quickPlaySongs", songsData.quickPlay);
        loadSongs("mixedSongs", songsData.mixedPlayer);
        loadSongs("recommendedSongsList", songsData.recommendedSongs);
    }

    
    function loadSongs(sectionId, songsArray) {
        const section = document.getElementById(sectionId);
        section.innerHTML = ""; // Clear previous songs
        songsArray.forEach(song => {
            const songCard = document.createElement("div");
            songCard.classList.add("song-card");
            songCard.innerHTML = `
                <img src="${song.img}"> <!-- 🔥 Image lang -->
                <div class="song-info">
                    <h3>${song.title}</h3>
                    <p>${song.artist}</p>
                </div>
            `;
            songCard.addEventListener("click", () => playSong(song));
            section.appendChild(songCard);
        });
    }
    
    
    function createSongCard(song) {
        const songCard = document.createElement("div");
        songCard.classList.add("song-card");

        songCard.innerHTML = `
            <img src="${song.img}">
            <h3>${song.title}</h3>
            <p>${song.artist}</p>
        `;

        songCard.addEventListener("click", () => playSong(song));
        return songCard;
    }

    function playSong(song) {
        playerImg.src = song.img;
        playerTitle.innerText = song.title;
        playerArtist.innerText = song.artist;
        audioPlayer.src = song.src;
        audioPlayer.play();
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
            albumCard.addEventListener("click", function () {
                showAlbumSongs(album); // ✅ Hindi mag-play ng song, lalabas lang ang songs
            });
            albumSection.appendChild(albumCard);
        });
    }
    

    function showAlbumSongs(album) {
        const albumSongsSection = document.getElementById("albumSongs");
        albumSongsSection.innerHTML = "";
        album.songs.forEach(song => {
            const songCard = document.createElement("div");
            songCard.classList.add("song-card");
            songCard.innerHTML = `
                <img src="${song.img}">
                <p>${song.title}</p>
            `;
            songCard.addEventListener("click", () => playSong(song)); // ✅ Dito lang mag-play
            albumSongsSection.appendChild(songCard);
        });
        showPage("albumSongsPage", album.artist);
    }
    

    // ✅ Sidebar Navigation
    document.getElementById("homeBtn").addEventListener("click", showHome);
    document.getElementById("exploreBtn").addEventListener("click", function () {
        showPage("explorePage", "Explore");
        loadSongs("exploreSongs", songsData.explore);
    });
    document.getElementById("samplesBtn").addEventListener("click", function () {
        showPage("samplesPage", "Samples");
        loadSongs("sampleVideos", songsData.samples);
    });
    document.getElementById("albumBtn").addEventListener("click", function () {
        showPage("albumPage", "Albums");
        loadAlbums();
    });

    // ✅ Genre & Categories Navigation
    document.getElementById("genreSelect").addEventListener("change", function () {
        if (this.value) {
            showPage("categoryPage", this.value + " Songs");
            loadSongs("categorySongs", songsData.genres[this.value]);
        }
    });

    document.getElementById("favoriteBtn").addEventListener("click", function () {
        showPage("categoryPage", "Favorite Songs");
        loadSongs("categorySongs", songsData.categories.Favorite);
    });

    document.getElementById("mostLikedBtn").addEventListener("click", function () {
        showPage("categoryPage", "Most Liked Songs");
        loadSongs("categorySongs", songsData.categories.MostLiked);
    });

    document.getElementById("popularBtn").addEventListener("click", function () {
        showPage("categoryPage", "Popular Songs");
        loadSongs("categorySongs", songsData.categories.Popular);
    });

    showHome();
});
