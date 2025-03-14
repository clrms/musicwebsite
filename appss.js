document.addEventListener("DOMContentLoaded", function () {
    let currentAudio = document.getElementById("audio-player");
    let nowPlayingText = document.getElementById("now-playing");
    let songList = document.getElementById("genre-songs");
    let genreSelect = document.getElementById("genre-select");
    let albumSection = document.getElementById("album-section"); // Para mawala kapag nagbago ng section

    let favoriteSongs = [];

    function updatePage(title) {
        document.getElementById("page-title").textContent = title;
    }

    function loadSongs(category) {
        songList.innerHTML = "";
        
        let songs = {
            "Explore": [
                { title: "Silhouette", artist: "KANA-BOON", src: "music1.mp3", bg: "ao.jpeg" },
            ],
            "All-Genres": [
                { title: "Song 2", artist: "Unknown Artist", src: "assets/audio/song2.mp3", bg: "assets/images/song2.jpg" },
            ],
            "Favorite": [
                { title: "Blinding Lights", artist: "The Weeknd", src: "weeknd1.mp3", bg: "weeknd1.jpg" },
                { title: "Levitating", artist: "Dua Lipa", src: "dua1.mp3", bg: "dua1.jpg" },
                { title: "Save Your Tears", artist: "The Weeknd", src: "saveyourtears.mp3", bg: "saveyourtears.jpg" }
            ],
            "Most Liked": [
                { title: "Blinding Lights", artist: "The Weeknd", src: "weeknd1.mp3", bg: "weeknd1.jpg" },
                { title: "Levitating", artist: "Dua Lipa", src: "dua1.mp3", bg: "dua1.jpg" },
                { title: "Shape of You", artist: "Ed Sheeran", src: "shape.mp3", bg: "shape.jpg" }
            ],
            "Popular": [
                { title: "Uptown Funk", artist: "Mark Ronson ft. Bruno Mars", src: "uptown.mp3", bg: "uptown.jpg" },
                { title: "Shape of You", artist: "Ed Sheeran", src: "shape.mp3", bg: "shape.jpg" },
                { title: "Despacito", artist: "Luis Fonsi", src: "despacito.mp3", bg: "despacito.jpg" }
            ],
            "Disco": [
                { title: "Stayin' Alive", artist: "Bee Gees", src: "stayin.mp3", bg: "stayin.jpg" },
                { title: "Dancing Queen", artist: "ABBA", src: "dancingqueen.mp3", bg: "dancingqueen.jpg" },
                { title: "September", artist: "Earth, Wind & Fire", src: "september.mp3", bg: "september.jpg" }
            ],
            "Electric Music": [
                { title: "Titanium", artist: "David Guetta", src: "titanium.mp3", bg: "titanium.jpg" },
                { title: "Animals", artist: "Martin Garrix", src: "animals.mp3", bg: "animals.jpg" },
                { title: "Wake Me Up", artist: "Avicii", src: "wakemeup.mp3", bg: "wakemeup.jpg" }
            ],
            "Folk Music": [
                { title: "Take Me Home, Country Roads", artist: "John Denver", src: "countryroads.mp3", bg: "countryroads.jpg" },
                { title: "The Sound of Silence", artist: "Simon & Garfunkel", src: "soundofsilence.mp3", bg: "soundofsilence.jpg" },
                { title: "Blowin’ in the Wind", artist: "Bob Dylan", src: "blowininthewind.mp3", bg: "blowininthewind.jpg" }
            ],
            "Funk Music": [
                { title: "Superstition", artist: "Stevie Wonder", src: "superstition.mp3", bg: "superstition.jpg" },
                { title: "Give Up the Funk", artist: "Parliament", src: "giveupthefunk.mp3", bg: "giveupthefunk.jpg" },
                { title: "Sex Machine", artist: "James Brown", src: "sexmachine.mp3", bg: "sexmachine.jpg" }
            ],
            "HipHop": [
                { title: "Lose Yourself", artist: "Eminem", src: "loseyourself.mp3", bg: "loseyourself.jpg" },
                { title: "Sicko Mode", artist: "Travis Scott", src: "sicko.mp3", bg: "sicko.jpg" },
                { title: "God's Plan", artist: "Drake", src: "godsplan.mp3", bg: "godsplan.jpg" }
            ],
            "Jazz": [
                { title: "Take Five", artist: "Dave Brubeck", src: "takefive.mp3", bg: "takefive.jpg" },
                { title: "Feeling Good", artist: "Nina Simone", src: "feelinggood.mp3", bg: "feelinggood.jpg" },
                { title: "Fly Me to the Moon", artist: "Frank Sinatra", src: "flymetothemoon.mp3", bg: "flymetothemoon.jpg" }
            ],
            "K-pop": [
                { title: "Dynamite", artist: "BTS", src: "dynamite.mp3", bg: "dynamite.jpg" },
                { title: "Kill This Love", artist: "BLACKPINK", src: "killthislove.mp3", bg: "killthislove.jpg" },
                { title: "Lovesick Girls", artist: "BLACKPINK", src: "lovesickgirls.mp3", bg: "lovesickgirls.jpg" }
            ],
            "Old OPM Song": [
                { title: "Anak", artist: "Freddie Aguilar", src: "anak.mp3", bg: "anak.jpg" },
                { title: "Banal Na Aso", artist: "Yano", src: "banalnaaso.mp3", bg: "banalnaaso.jpg" },
                { title: "Kahit Maputi Na Ang Buhok Ko", artist: "Rey Valera", src: "kahitmaputi.mp3", bg: "kahitmaputi.jpg" }
            ],
            "Old Song": [
                { title: "Hotel California", artist: "Eagles", src: "hotelcalifornia.mp3", bg: "hotelcalifornia.jpg" },
                { title: "Stand by Me", artist: "Ben E. King", src: "standbyme.mp3", bg: "standbyme.jpg" },
                { title: "Imagine", artist: "John Lennon", src: "imagine.mp3", bg: "imagine.jpg" }
            ],
            "Pop-Music": [
                { title: "Shape of You", artist: "Ed Sheeran", src: "shape.mp3", bg: "shape.jpg" },
                { title: "Havana", artist: "Camila Cabello", src: "havana.mp3", bg: "havana.jpg" },
                { title: "Someone Like You", artist: "Adele", src: "someone.mp3", bg: "someone.jpg" }
            ],
            "Rock": [
                { title: "Bohemian Rhapsody", artist: "Queen", src: "bohemian.mp3", bg: "bohemian.jpg" },
                { title: "Smells Like Teen Spirit", artist: "Nirvana", src: "nirvana.mp3", bg: "nirvana.jpg" },
                { title: "Sweet Child O' Mine", artist: "Guns N' Roses", src: "sweetchild.mp3", bg: "sweetchild.jpg" }
            ]
        };

        let artistSongs = {
            "Bruno Mars": [
                { title: "Just The Way You Are", artist: "Bruno Mars", src: "bruno1.mp3", bg: "bruno1.jpg" },
                { title: "Grenade", artist: "Bruno Mars", src: "bruno2.mp3", bg: "bruno2.jpg" },
                { title: "Locked Out of Heaven", artist: "Bruno Mars", src: "bruno3.mp3", bg: "bruno3.jpg" }
            ],
            "Hev-abi": [
                { title: "Hev Song 1", artist: "Hev-abi", src: "hev1.mp3", bg: "hev1.jpg" },
                { title: "Hev Song 2", artist: "Hev-abi", src: "hev2.mp3", bg: "hev2.jpg" },
                { title: "Hev Song 3", artist: "Hev-abi", src: "hev3.mp3", bg: "hev3.jpg" }
            ],
            "Aklas": [
                { title: "Aklas Song 1", artist: "Aklas", src: "aklas1.mp3", bg: "aklas1.jpg" },
                { title: "Aklas Song 2", artist: "Aklas", src: "aklas2.mp3", bg: "aklas2.jpg" },
                { title: "Aklas Song 3", artist: "Aklas", src: "aklas3.mp3", bg: "aklas3.jpg" }
            ],
        };

        let selectedSongs = songs[category] || artistSongs[category];

        if (!selectedSongs) return;

        selectedSongs.forEach(song => {
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
        
        // I-HIDE ANG ALBUM SECTION
        if (category === "Explore") {
            albumSection.style.display = "block"; // Pakita ulit sa Home
        } else {
            albumSection.style.display = "none"; // Itago sa ibang sections
        }
    }

    function changeGenre() {
        let selectedGenre = genreSelect.value;
        updatePage(selectedGenre);
        loadSongs(selectedGenre);

        // I-HIDE ANG ALBUM SECTION
        albumSection.style.display = "none";
    }

    function goHome() {
        updatePage("Explore");
        loadSongs("Explore");

        // IBALIK ANG ALBUM SECTION
        albumSection.style.display = "block";
    }

    function loadArtist(artist) {
        updatePage(artist);
        loadSongs(artist);

        // I-HIDE ANG ALBUM SECTION KAPAG PUMILI NG ARTIST
        albumSection.style.display = "none";
    }

    // I-EXPORT ANG FUNCTIONS PARA MAGAMIT SA HTML ONCLICK
    window.changeCategory = changeCategory;
    window.changeGenre = changeGenre;
    window.goHome = goHome;
    window.loadArtist = loadArtist;

    // DEFAULT LOAD NG SONGS
    loadSongs("Explore");
});
