document.addEventListener("DOMContentLoaded", function () {
    let currentAudio = document.getElementById("audio-player");
    let nowPlayingText = document.getElementById("now-playing");
    let songList = document.getElementById("genre-songs");
    let genreSelect = document.getElementById("genre-select");
    let albumSection = document.getElementById("album-section");
    let carousel = document.getElementById("carousel");
    let recommendsongsection = document.getElementById("recommend-song-section")

    let favoriteSongs = [];

    function updatePage(title) {
        document.getElementById("page-title").textContent = title;
    }

    function loadSongs(category) {
        songList.innerHTML = "";

        let songs = {
            "Explore": [{ title: "Sandalan", artist: "6cyclemind", src: "6cyclemind - Sandalan (Lyrics).mp3", bg: "2.png" },
                { title: "Silhouette", artist: "KANA-BOON", src: "music1.mp3", bg: "ao.jpeg" },
                { title: "Silhouette", artist: "KANA-BOON", src: "music1.mp3", bg: "ao.jpeg" },
                { title: "Silhouette", artist: "KANA-BOON", src: "music1.mp3", bg: "ao.jpeg" },
                { title: "Silhouette", artist: "KANA-BOON", src: "music1.mp3", bg: "ao.jpeg" },
                { title: "Silhouette", artist: "KANA-BOON", src: "music1.mp3", bg: "ao.jpeg" },
            ],
            "All Genres": [
                { title: "Song 2", artist: "Unknown Artist", src: "assets/audio/song2.mp3", bg: "assets/images/song2.jpg" },
                { title: "Silhouette", artist: "KANA-BOON", src: "music1.mp3", bg: "ao.jpeg" },
                { title: "Silhouette", artist: "KANA-BOON", src: "music1.mp3", bg: "ao.jpeg" },
                { title: "Silhouette", artist: "KANA-BOON", src: "music1.mp3", bg: "ao.jpeg" },
                { title: "Silhouette", artist: "KANA-BOON", src: "music1.mp3", bg: "ao.jpeg" },
                
            ],
            "Disco": [
                { title: "Stayin' Alive", artist: "Bee Gees", src: "stayin.mp3", bg: "stayin.jpg" },
                { title: "Dancing Queen", artist: "ABBA", src: "dancingqueen.mp3", bg: "dancingqueen.jpg" },
                { title: "Silhouette", artist: "KANA-BOON", src: "music1.mp3", bg: "ao.jpeg" },
                { title: "Silhouette", artist: "KANA-BOON", src: "music1.mp3", bg: "ao.jpeg" },
                { title: "Silhouette", artist: "KANA-BOON", src: "music1.mp3", bg: "ao.jpeg" },
            
            ],
            "Electric Music": [
                { title: "Titanium", artist: "David Guetta", src: "titanium.mp3", bg: "titanium.jpg" },
                { title: "Animals", artist: "Martin Garrix", src: "animals.mp3", bg: "animals.jpg" },
                { title: "Silhouette", artist: "KANA-BOON", src: "music1.mp3", bg: "ao.jpeg" },
                { title: "Silhouette", artist: "KANA-BOON", src: "music1.mp3", bg: "ao.jpeg" },
                { title: "Silhouette", artist: "KANA-BOON", src: "music1.mp3", bg: "ao.jpeg" },
                
            ],
            "Folk Music": [
                { title: "Take Me Home, Country Roads", artist: "John Denver", src: "countryroads.mp3", bg: "countryroads.jpg" },
                { title: "Animals", artist: "Martin Garrix", src: "animals.mp3", bg: "animals.jpg" },
                { title: "Silhouette", artist: "KANA-BOON", src: "music1.mp3", bg: "ao.jpeg" },
                { title: "Silhouette", artist: "KANA-BOON", src: "music1.mp3", bg: "ao.jpeg" },
                { title: "Silhouette", artist: "KANA-BOON", src: "music1.mp3", bg: "ao.jpeg" },
                
            ],
            "Funk Music": [
                { title: "Superstition", artist: "Stevie Wonder", src: "superstition.mp3", bg: "superstition.jpg" },
                { title: "Give Up the Funk", artist: "Parliament", src: "giveupthefunk.mp3", bg: "giveupthefunk.jpg" },
                { title: "Animals", artist: "Martin Garrix", src: "animals.mp3", bg: "animals.jpg" },
                { title: "Silhouette", artist: "KANA-BOON", src: "music1.mp3", bg: "ao.jpeg" },
                { title: "Silhouette", artist: "KANA-BOON", src: "music1.mp3", bg: "ao.jpeg" },
                { title: "Silhouette", artist: "KANA-BOON", src: "music1.mp3", bg: "ao.jpeg" },
           
            ],

"HipHop": [
                { title: "Stayin' Alive", artist: "Bee Gees", src: "stayin.mp3", bg: "stayin.jpg" },
                { title: "Dancing Queen", artist: "ABBA", src: "dancingqueen.mp3", bg: "dancingqueen.jpg" },
                { title: "Animals", artist: "Martin Garrix", src: "animals.mp3", bg: "animals.jpg" },
                { title: "Silhouette", artist: "KANA-BOON", src: "music1.mp3", bg: "ao.jpeg" },
                { title: "Silhouette", artist: "KANA-BOON", src: "music1.mp3", bg: "ao.jpeg" },
                
            
            ],
            "Jazz": [
                { title: "Titanium", artist: "David Guetta", src: "titanium.mp3", bg: "titanium.jpg" },
                { title: "Animals", artist: "Martin Garrix", src: "animals.mp3", bg: "animals.jpg" },
                { title: "Animals", artist: "Martin Garrix", src: "animals.mp3", bg: "animals.jpg" },
                { title: "Silhouette", artist: "KANA-BOON", src: "music1.mp3", bg: "ao.jpeg" },
                { title: "Silhouette", artist: "KANA-BOON", src: "music1.mp3", bg: "ao.jpeg" },
                
            ],
            "K-pop": [
                { title: "Take Me Home, Country Roads", artist: "John Denver", src: "countryroads.mp3", bg: "countryroads.jpg" },
                { title: "Animals", artist: "Martin Garrix", src: "animals.mp3", bg: "animals.jpg" },
                { title: "Animals", artist: "Martin Garrix", src: "animals.mp3", bg: "animals.jpg" },
                { title: "Silhouette", artist: "KANA-BOON", src: "music1.mp3", bg: "ao.jpeg" },
                { title: "Silhouette", artist: "KANA-BOON", src: "music1.mp3", bg: "ao.jpeg" },
                
            ],
            "Old OPM Song": [
                { title: "Superstition", artist: "Stevie Wonder", src: "superstition.mp3", bg: "superstition.jpg" },
                { title: "Give Up the Funk", artist: "Parliament", src: "giveupthefunk.mp3", bg: "giveupthefunk.jpg" },
                { title: "Animals", artist: "Martin Garrix", src: "animals.mp3", bg: "animals.jpg" },
                { title: "Animals", artist: "Martin Garrix", src: "animals.mp3", bg: "animals.jpg" },
                { title: "Silhouette", artist: "KANA-BOON", src: "music1.mp3", bg: "ao.jpeg" },
             
            ],"Old Song": [
                { title: "Stayin' Alive", artist: "Bee Gees", src: "stayin.mp3", bg: "stayin.jpg" },
                { title: "Dancing Queen", artist: "ABBA", src: "dancingqueen.mp3", bg: "dancingqueen.jpg" },
                { title: "Animals", artist: "Martin Garrix", src: "animals.mp3", bg: "animals.jpg" },
                { title: "Animals", artist: "Martin Garrix", src: "animals.mp3", bg: "animals.jpg" },
                { title: "Silhouette", artist: "KANA-BOON", src: "music1.mp3", bg: "ao.jpeg" },
             
            
            ],
            "Pop Music": [
                { title: "Titanium", artist: "David Guetta", src: "titanium.mp3", bg: "titanium.jpg" },
                { title: "Animals", artist: "Martin Garrix", src: "animals.mp3", bg: "animals.jpg" },
                { title: "Animals", artist: "Martin Garrix", src: "animals.mp3", bg: "animals.jpg" },
                { title: "Animals", artist: "Martin Garrix", src: "animals.mp3", bg: "animals.jpg" },
                { title: "Silhouette", artist: "KANA-BOON", src: "music1.mp3", bg: "ao.jpeg" },
                
            ],
            "Rock": [
                { title: "Take Me Home, Country Roads", artist: "John Denver", src: "countryroads.mp3", bg: "countryroads.jpg" },
                { title: "Animals", artist: "Martin Garrix", src: "animals.mp3", bg: "animals.jpg" },
                { title: "Animals", artist: "Martin Garrix", src: "animals.mp3", bg: "animals.jpg" },     
                { title: "Animals", artist: "Martin Garrix", src: "animals.mp3"}, 
                
            ],
           
            "Favorite": [{ title: "Blinding Lights", artist: "The Weeknd", src: "weeknd1.mp3", bg: "weeknd1.jpg" },
                { title: "Take Me Home, Country Roads", artist: "John Denver", src: "countryroads.mp3", bg: "countryroads.jpg" },
                { title: "Animals", artist: "Martin Garrix", src: "animals.mp3", bg: "animals.jpg" },
                { title: "Animals", artist: "Martin Garrix", src: "animals.mp3", bg: "animals.jpg" },     
                { title: "Animals", artist: "Martin Garrix", src: "animals.mp3"}, 
                { title: "Blinding Lights", artist: "The Weeknd", src: "weeknd1.mp3", bg: "weeknd1.jpg" },
                { title: "Take Me Home, Country Roads", artist: "John Denver", src: "countryroads.mp3", bg: "countryroads.jpg" },
                { title: "Animals", artist: "Martin Garrix", src: "animals.mp3", bg: "animals.jpg" },
                { title: "Animals", artist: "Martin Garrix", src: "animals.mp3", bg: "animals.jpg" },     
                { title: "Animals", artist: "Martin Garrix", src: "animals.mp3"},
                         
                        ],
            "Most Liked": [{ title: "Levitating", artist: "Dua Lipa", src: "dua1.mp3", bg: "dua1.jpg" },
                { title: "Take Me Home, Country Roads", artist: "John Denver", src: "countryroads.mp3", bg: "countryroads.jpg" },
                { title: "Animals", artist: "Martin Garrix", src: "animals.mp3", bg: "animals.jpg" },
                { title: "Animals", artist: "Martin Garrix", src: "animals.mp3", bg: "animals.jpg" },     
                { title: "Animals", artist: "Martin Garrix", src: "animals.mp3"}, 
                { title: "Blinding Lights", artist: "The Weeknd", src: "weeknd1.mp3", bg: "weeknd1.jpg" },
                { title: "Take Me Home, Country Roads", artist: "John Denver", src: "countryroads.mp3", bg: "countryroads.jpg" },
                { title: "Animals", artist: "Martin Garrix", src: "animals.mp3", bg: "animals.jpg" },
                { title: "Animals", artist: "Martin Garrix", src: "animals.mp3", bg: "animals.jpg" },     
                { title: "Animals", artist: "Martin Garrix", src: "animals.mp3"},
                          ],
            "Popular": [{ title: "Uptown Funk", artist: "Mark Ronson ft. Bruno Mars", src: "uptown.mp3", bg: "uptown.jpg" },
                { title: "Take Me Home, Country Roads", artist: "John Denver", src: "countryroads.mp3", bg: "countryroads.jpg" },
                { title: "Animals", artist: "Martin Garrix", src: "animals.mp3", bg: "animals.jpg" },
                { title: "Animals", artist: "Martin Garrix", src: "animals.mp3", bg: "animals.jpg" },     
                { title: "Animals", artist: "Martin Garrix", src: "animals.mp3"}, 
                { title: "Blinding Lights", artist: "The Weeknd", src: "weeknd1.mp3", bg: "weeknd1.jpg" },
                { title: "Take Me Home, Country Roads", artist: "John Denver", src: "countryroads.mp3", bg: "countryroads.jpg" },
                { title: "Animals", artist: "Martin Garrix", src: "animals.mp3", bg: "animals.jpg" },
                { title: "Animals", artist: "Martin Garrix", src: "animals.mp3", bg: "animals.jpg" },     
                { title: "Animals", artist: "Martin Garrix", src: "animals.mp3"},
                       ],
            "Bruno Mars": [
                { title: "Just The Way You Are", artist: "Bruno Mars", src: "bruno1.mp3", bg: "bruno1.jpg" },
                { title: "Grenade", artist: "Bruno Mars", src: "bruno2.mp3", bg: "bruno2.jpg" },
                { title: "Take Me Home, Country Roads", artist: "John Denver", src: "countryroads.mp3", bg: "countryroads.jpg" },
                { title: "Animals", artist: "Martin Garrix", src: "animals.mp3", bg: "animals.jpg" },
                { title: "Animals", artist: "Martin Garrix", src: "animals.mp3", bg: "animals.jpg" },     
                { title: "Animals", artist: "Martin Garrix", src: "animals.mp3"},  
                { title: "Take Me Home, Country Roads", artist: "John Denver", src: "countryroads.mp3", bg: "countryroads.jpg" },
                { title: "Animals", artist: "Martin Garrix", src: "animals.mp3", bg: "animals.jpg" },
                { title: "Animals", artist: "Martin Garrix", src: "animals.mp3", bg: "animals.jpg" },     
                { title: "Animals", artist: "Martin Garrix", src: "animals.mp3"}, 
            ],
            "Hev-abi": [
                { title: "Hev Song 1", artist: "Hev-abi", src: "hev1.mp3", bg: "hev1.jpg" },
                { title: "Hev Song 2", artist: "Hev-abi", src: "hev2.mp3", bg: "hev2.jpg" },
                { title: "Hev Song 3", artist: "Hev-abi", src: "hev3.mp3", bg: "hev3.jpg" },
                { title: "Animals", artist: "Martin Garrix", src: "animals.mp3", bg: "animals.jpg" },     
                { title: "Animals", artist: "Martin Garrix", src: "animals.mp3"},  
                { title: "Take Me Home, Country Roads", artist: "John Denver", src: "countryroads.mp3", bg: "countryroads.jpg" },
                { title: "Animals", artist: "Martin Garrix", src: "animals.mp3", bg: "animals.jpg" },
                { title: "Animals", artist: "Martin Garrix", src: "animals.mp3", bg: "animals.jpg" },     
                { title: "Animals", artist: "Martin Garrix", src: "animals.mp3"},
            ],
            "Aklas": [
                { title: "Aklas Song 1", artist: "Aklas", src: "aklas1.mp3", bg: "aklas1.jpg" },
                { title: "Aklas Song 2", artist: "Aklas", src: "aklas2.mp3", bg: "aklas2.jpg" },
                { title: "Aklas Song 3", artist: "Aklas", src: "aklas3.mp3", bg: "aklas3.jpg" },
                { title: "Animals", artist: "Martin Garrix", src: "animals.mp3", bg: "animals.jpg" },     
                { title: "Animals", artist: "Martin Garrix", src: "animals.mp3"},  
                { title: "Take Me Home, Country Roads", artist: "John Denver", src: "countryroads.mp3", bg: "countryroads.jpg" },
                { title: "Animals", artist: "Martin Garrix", src: "animals.mp3", bg: "animals.jpg" },
                { title: "Animals", artist: "Martin Garrix", src: "animals.mp3", bg: "animals.jpg" },     
                { title: "Animals", artist: "Martin Garrix", src: "animals.mp3"},
                { title: "Animals", artist: "Martin Garrix", src: "animals.mp3"},
            ],
            "Recommend Song": [
                
            ]
        };

        let selectedSongs = songs[category] || [];
        selectedSongs.forEach(song => createSongCard(song));
    }

    function createSongCard(song) {
        let songCard = document.createElement("div");
        songCard.classList.add("song-card");
        songCard.style.backgroundImage = `url(${song.bg})`;
        songCard.style.backgroundSize = "cover";
        songCard.style.backgroundPosition = "center";

        let title = document.createElement("div");
        title.classList.add("song-title");
        title.textContent = song.title;

        let artist = document.createElement("div");
        artist.classList.add("song-artist");
        artist.textContent = song.artist;

        let favButton = document.createElement("button");
        favButton.classList.add("fav-button");
        favButton.textContent = "★";

        favButton.addEventListener("click", function (event) {
            event.stopPropagation();
            if (!favoriteSongs.includes(song)) {
                favoriteSongs.push(song);
                alert(`${song.title} added to favorites!`);
            }
        });

        songCard.appendChild(title);
        songCard.appendChild(artist);
        songCard.appendChild(favButton);
        songList.appendChild(songCard);

        songCard.addEventListener("click", function () {
            playSong(song);
        });
    }

    function playSong(song) {
        currentAudio.src = song.src;
        currentAudio.play().catch(error => {
            console.error("Error playing audio:", error);
            alert("Failed to play the audio.");
        });

        nowPlayingText.textContent = `Now Playing: ${song.title} - ${song.artist}`;
    }

    function changeCategory(category) {
        updatePage(category);
        loadSongs(category);
        albumSection.style.display = (category === "Explore") ? "block" : "none";
    }

    function changeGenre() {
        let selectedGenre = genreSelect.value;
        updatePage(selectedGenre);
        loadSongs(selectedGenre);
        albumSection.style.display = "none";
    }

    function goHome() {
        updatePage("Explore");
        loadSongs("Explore");
        albumSection.style.display = "block";
    }

    function loadArtist(artist) {
        updatePage(artist);
        loadSongs(artist);
        albumSection.style.display = "none";
    }

    window.changeCategory = changeCategory;
    window.changeGenre = changeGenre;
    window.goHome = goHome;
    window.loadArtist = loadArtist;

    loadSongs("Explore");

    

    const mixedSongs = [
        { title: "My Supreme", artist: "Various", img: "supreme.jpg", src: "supreme.mp3" },
        { title: "My Mix 1", artist: "Various", img: "mix1.jpg", src: "mix1.mp3" },
        { title: "My Mix 2", artist: "Various", img: "mix2.jpg", src: "mix2.mp3" },
        { title: "My Mix 3", artist: "Various", img: "mix3.jpg", src: "mix3.mp3" },
        { title: "My Mix 4", artist: "Various", img: "mix4.jpg", src: "mix4.mp3" },
        { title: "My Mix 5", artist: "Various", img: "mix5.jpg", src: "mix5.mp3" },
        { title: "My Mix 6", artist: "Various", img: "mix6.jpg", src: "mix6.mp3" },
         { title: "My Supreme", artist: "Various", img: "supreme.jpg", src: "supreme.mp3" },
        { title: "My Mix 1", artist: "Various", img: "mix1.jpg", src: "mix1.mp3" },
        { title: "My Mix 2", artist: "Various", img: "mix2.jpg", src: "mix2.mp3" },
        { title: "My Mix 3", artist: "Various", img: "mix3.jpg", src: "mix3.mp3" },
        { title: "My Mix 4", artist: "Various", img: "mix4.jpg", src: "mix4.mp3" },
        { title: "My Mix 5", artist: "Various", img: "mix5.jpg", src: "mix5.mp3" },
        { title: "My Mix 6", artist: "Various", img: "mix6.jpg", src: "mix6.mp3" },
        { title: "My Supreme", artist: "Various", img: "supreme.jpg", src: "supreme.mp3" },
        { title: "My Mix 1", artist: "Various", img: "mix1.jpg", src: "mix1.mp3" },
        { title: "My Mix 2", artist: "Various", img: "mix2.jpg", src: "mix2.mp3" },
        { title: "My Mix 3", artist: "Various", img: "mix3.jpg", src: "mix3.mp3" },
        { title: "My Mix 4", artist: "Various", img: "mix4.jpg", src: "mix4.mp3" },
        { title: "My Mix 5", artist: "Various", img: "mix5.jpg", src: "mix5.mp3" },
        { title: "My Mix 6", artist: "Various", img: "mix6.jpg", src: "mix6.mp3" },
    ];

    function loadMixedSongs() {
        carousel.innerHTML = "";

        mixedSongs.forEach(song => {
            let card = document.createElement("div");
            card.classList.add("song-card1");
            card.style.backgroundImage = `url('${song.img}')`;
            card.innerHTML = `<p>${song.title}</p><p>${song.artist}</p>`;

            card.addEventListener("click", function () {
                playSong(song);
            });

            carousel.appendChild(card);
        });
    }

    function scrollLeft() {
        carousel.scrollBy({ left: -200, behavior: "smooth" });
    }

    function scrollRight() {
        carousel.scrollBy({ left: 200, behavior: "smooth" });
    }

    window.scrollLeft = scrollLeft;
    window.scrollRight = scrollRight;

    loadMixedSongs();
});
