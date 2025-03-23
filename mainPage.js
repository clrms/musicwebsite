document.addEventListener("DOMContentLoaded", function () {
    let currentAudio = document.getElementById("audio-player");
    let nowPlayingText = document.getElementById("now-playing");
    let songList = document.getElementById("genre-songs");
    let genreSelect = document.getElementById("genre-select");
    let albumSection = document.getElementById("album-section");
    let carousel = document.getElementById("carousel");
    let recommendContainer = document.getElementById("recommend-song-container");
    let mixedSection = document.querySelector(".mixed-section");
    let recommendedSection = document.querySelector(".recommend-song-section");

    let favoriteSongs = [];

    function updatePage(title) {
        document.getElementById("page-title").textContent = title;
    }

    function loadSongs(category) {
        songList.innerHTML = "";

        let songs = {
            "Explore": [{ title: "Sandalan", artist: "6cyclemind", src: "6cyclemind - Sandalan (Lyrics).mp3", bg: "2.png" },
                { title: "Fly Me To The Moon", artist: "Frank Sinatra", src: "Fly Me To The Moon (2008 Remastered).mp3", bg: "46.jpg" },
                { title: "Freaky Friday", artist: "Lil Dicky", src: "Lil Dicky - Freaky Friday (Lyrics) ft. Chris Brown.mp3", bg: "8.jpg" },
                { title: "Sun Flower", artist: "Post Malone", src: "Post Malone - Sunflower (Lyrics) ft. Swae Lee.mp3", bg: "9.jpg" },
                { title: "Bye Bye Bye", artist: "NSYNC", src: "NSYNC - Bye Bye Bye (Lyrics) (Deadpool 3 Soundtrack).mp3", bg: "15.jpg" },
                { title: "Kahit Maputi Na Ang Buhok Ko", artist: "Rey Valera", src: "Rey Valera - Kahit Maputi Na Ang Buhok Ko [Official Lyric Video].mp3", bg: "26.jpg" },
                { title: "Bote at Dyaryo", artist: "Abrakdabra", src: "Bote_t Dyaryo.mp3", bg: "4.jpg" },
                { title: "Shape of You", artist: "Ed Sheeran", src: "Ed Sheeran - Shape of You (Lyrics).mp3", bg: "14.png" },
                { title: "Funkytown", artist: "Lipps Inc.", src: "Lipps Inc. - Funky Town (Lyrics).mp3", bg: "12.jpg" },
                { title: "Tokyo Drift", artist: "Teriyaki Boyz", src: "Tokyo Drift (Fast & Furious) (From The Fast And The Furious_ Tokyo Drift Soundtrack).mp3", bg: "35.jpg" },
            ],
            "All Genres": [
                { title: "Song 2", artist: "Unknown Artist", src: "assets/audio/song2.mp3", bg: "assets/images/song2.jpg" },
                { title: "Silhouette", artist: "KANA-BOON", src: "music1.mp3", bg: "ao.jpeg" },
                { title: "Silhouette", artist: "KANA-BOON", src: "music1.mp3", bg: "ao.jpeg" },
                { title: "Silhouette", artist: "KANA-BOON", src: "music1.mp3", bg: "ao.jpeg" },
                { title: "Silhouette", artist: "KANA-BOON", src: "music1.mp3", bg: "ao.jpeg" },

            ],
            "Disco": [
                { title: "Brother Louie", artist: "Modern Talking", src: "#.mp3", bg: "36.jpg" },
                { title: "Never Gonna Give You Up", artist: "Rick Astley", src: "#.mp3", bg: "37.jpg" },
                { title: "Material Girl", artist: "Madonna", src: "#.mp3", bg: "39.jpg" },
                { title: "Macarena", artist: "Los Del Rio", src: "#.mp3", bg: "40.jpg" },
                { title: "Friday", artist: "Riton x Nightcrawlers", src: "Riton x Nightcrawlers - Friday ft. Mufasa & Hypeman (Dopamine Re-edit) [Official Video].mp3", bg: "#.jpg" },
                
                //OPM//
                { title: "Sayaw Mga Choy", artist: "Discobudots", src: "#.mp3", bg: "#.jpg" },
                { title: "Awitin Mo, Isasayaw Ko", artist: "VST & Company", src: "Awitin Mo, Isasayaw Ko - VST & Company [Official Lyric Video].mp3", bg: "#.jpg" },
                { title: "Disco Fever", artist: "VST & Company", src: "Disco Fever (1978) - VST & Company.mp3", bg: "#.jpg" },
                { title: "Hey Barbara", artist: "IV OF SPADES", src: "IV OF SPADES - Hey Barbara (Official Video).mp3", bg: "#.jpg" },
                { title: "Where Have You been My Disco", artist: "IV OF SPADES", src: "Where Have You been My Disco_  IV OF SPADES (Lyrics).mp3", bg: "#.jpg" },
            ],
            "Electronic Music": [
                { title: "Titanium", artist: "David Guetta", src: "titanium.mp3", bg: "51.jpg" },
                { title: "Roses", artist: "The Chainsmokers", src: "The Chainsmokers - Roses (Official Audio) ft. ROZEZS.mp3", bg: "52.jpg" },
                { title: "Valodja", artist: "Steve Angello", src: "Valodja.mp3", bg: "53.jpgs" },
                { title: "Sun Is Up", artist: "INNA", src: "Inna - Sun Is Up (Ultra Music).mp3", bg: "54.jpg" },
                { title: "Don't You Worry Child", artist: "Swedish House Mafia", src: "Swedish House Mafia ft. John Martin - Don_t You Worry Child.mp3", bg: "55.jpg" },
               
                //OPM//
                { title: "Catching Fellings", artist: "Inigo Pascual", src: "Catching Feelings - Inigo Pasqual.mp3", bg: "#.jpg" },
                { title: "Dance With You", artist: "Skusta Clee", src: "Dance With You - Skusta Clee ft. Yuri Dope.mp3", bg: "#.jpg" },
                { title: "Karma", artist: "Skusta Clee", src: "KARMA - Skusta Clee ft. Gloc 9.mp3", bg: "#.jpg" },
                { title: "Landian", artist: "Fred Engay", src: "Landian - Fred Engay.mp3", bg: "#.jpg" },
                { title: "Vibe With Me", artist: "Matthaios", src: "Matthaios - Vibe With Me.mp3", bg: "#.jpg" },
            ],
            "Funk Music": [
                { title: "Funk Do Bounce", artist: "Ariis", src: "Ariis - FUNK DO BOUNCE [Brazilian Funk].mp3", bg: "31.jpg" },
                { title: "Murder In My Mind", artist: "KORDHELL", src: "KORDHELL - MURDER IN MY MIND.mp3", bg: "32.jpg" },
                { title: "Glory", artist: "Ogryzek", src: "Ogryzek - GLORY (Official Visualiser).mp3", bg: "33.jpg" },
                { title: "ORQUESTRA MALDITA", artist: "TRASHXRL", src: "ORQUESTRA MALDITA (BRAZILIAN PHONK).mp3", bg: "34.jpg" },
                { title: "Tokyo Drift", artist: "Teriyaki Boyz", src: "Tokyo Drift (Fast & Furious) (From The Fast And The Furious_ Tokyo Drift Soundtrack).mp3", bg: "35.jpg" },

                //OPM//
                { title: "Uhaw", artist: "Dilaw", src: "@Dilaw  - Uhaw (Tayong Lahat) (Lyrics).mp3", bg: "#.jpg" },
                { title: "Asan Ka Na Ba", artist: "Zack Tabudlo", src: "Asan Ka Na Ba - Zack Tabudlo (Karaoke).mp3", bg: "#.jpg" },
                { title: "Umaasa", artist: "Calein", src: "Calein - Umaasa (Official Lyric Video).mp3", bg: "#.jpg" },
                { title: "Gabi", artist: "Fred Engay", src: "Gabi  - Fred Engay  Official Audio.mp3", bg: "#.jpg" },
                { title: "Raining In Manila", artist: "Lola Amour", src: "Lola Amour - Raining in Manila (Lyrics).mp3", bg: "#.jpg" },

            ],
            "Folk Music": [
                { title: "Here Come The Sun", artist: "The Beatles", src: "#.mp3", bg: "#.jpg" },
                { title: "Illegal Smile", artist: "John Prine", src: "#.mp3", bg: "#.jpg" },
                { title: "Riptide", artist: "Vance Joy", src: "#.mp3", bg: "#.jpg" },
                { title: "Time In A Bottle", artist: "Jim Croce", src: "#.mp3", bg: "#.jpg" },
                { title: "The Lion's Roar", artist: "First Aid Kit", src: "#.mp3", bg: "#.jpg" },

                //OPM//
                { title: "Ako'y Pinoy", artist: "Florante", src: "Florante - Ako'y Pinoy (Official Lyric Video).mp3", bg: "#.jpg" },
                { title: "Handog", artist: "Florante", src: "Florante - Handog (Official LyrIc Video).mp3", bg: "#.jpg" },
                { title: "Sasakyan Kita", artist: "Gladys and The Boxers with K", src: "Gladys and The Boxers with K  Sasakyan Kita [Official Lyric Video].mp3", bg: "#.jpg" },
                { title: "Langit Na Naman", artist: "Hatdog", src: "Hotdog - Langit Na Naman.mp3", bg: "#.jpg" },
                { title: "Laki Sa Layaw", artist: "Mike Hanopol", src: "Laki Sa Layaw- Mike Hanopol.mp3", bg: "#.jpg" },

            ],
             
            "HipHop": [
                { title: "Low", artist: "Flo Rida", src: "Flo Rida - Low (feat. T-Pain) [from Step Up 2 The Streets O.S.T.  Mail On Sunday] (Official Video).mp3", bg: "6.JPG" },
                { title: "I'll Be Missing You", artist: "Puff Daddy", src: "Puff Daddy ft. Faith Evans & 112 - I_ll Be Missing You (Lyrics).mp3", bg: "7.jpg" },
                { title: "Freaky Friday", artist: "Lil Dicky", src: "Lil Dicky - Freaky Friday (Lyrics) ft. Chris Brown.mp3", bg: "8.jpg" },
                { title: "Sunflower", artist: "Post Malone", src: "Post Malone - Sunflower (Lyrics) ft. Swae Lee.mp3", bg: "9.jpg" },
                { title: "Walkin On Water", artist: "Stray Kids", src: "Walkin On Water (HIP Ver.).mp3", bg: "10.jpg" },

                //OPM//
                { title: "Ice", artist: "ACDMND$", src: "ACDMND$ & Jimmy Pablo - ICE (Official Music Video).mp3", bg: "#.jpg" },
                { title: "Zebbiana", artist: "Skusta Clee", src: "Zebbiana - Skusta Clee ( Official Lyrics.mp3", bg: "#.jpg" },
                { title: "Miracle Nights", artist: "ALLMOST", src: "Miracle Nights - ALLMOST (BASS BOOSTED  LYRICS).mp3", bg: "#.jpg" },
                { title: "BALAGBAG", artist: "Don Pao", src: "BALAGBAG - Don pao ft Flow G (musiCLyrics).mp3", bg: "#.jpg" },
                { title: "SOBRANG SOLID", artist: "Nik Makino", src: "Nik Makino - SOBRANG SOLID (feat. NEXXFRIDAY).mp3", bg: "#.jpg" },
            ],
            "Jazz": [
                { title: "Fly Me To The Moon", artist: "Frank Sinatra", src: "Fly Me To The Moon (2008 Remastered).mp3", bg: "46.jpg" },
                { title: "From  The Start", artist: "Laufey", src: "Laufey - From The Start (Official Music Video).mp3", bg: "47.jpg" },
                { title: "Dream A Little Dream Of Me", artist: "Ella Fitzgerald", src: "Ella Fitzgerald, Louis Armstrong - Dream A Little Dream Of Me (Audio).mp3", bg: "48.jpg" },
                { title: "Song Bird", artist: "Kenny G", src: "Kenny G - Songbird (Offiical Video).mp3", bg: "49.jpg" },
                { title: "My Foolish Heart", artist: "Bill Evans", src: "Bill Evans-My Foolish Heart.mp3", bg: "50.jpg" },
               
                //OPM//
                { title: "Ikaw Lang", artist: "Raffy Quijano", src: "#.mp3", bg: "#.jpg" },
                { title: "Para Sa Atin", artist: "Sitti", src: "#.mp3", bg: "#.jpg" },
                { title: "Chinito", artist: "Yeng Constantino", src: "#.mp3", bg: "#.jpg" },
                { title: "Sa Mata Makikita", artist: "Kael Cortez", src: "#.mp3", bg: "#.jpg" },
                { title: "Kabilugan Ng Buwan", artist: "APO Hiking Society", src: "#.mp3", bg: "#.jpg" },

            ],
            "K-pop": [
                { title: "BANG BANG BANG", artist: "BIGBANG", src: "#.mp3", bg: "41.jpg" },
                { title: "Love Shot", artist: "EXO", src: "#.mp3", bg: "42.jpg" },
                { title: "Super Shy", artist: "New Jeans", src: "#.mp3", bg: "43.jpg" },
                { title: "Gangnam Style", artist: "Psy", src: "#.mp3", bg: "44.jpg" },
                { title: "Gentleman", artist: "Psy", src: "#.mp3", bg: "45.jpg" },
            ],
            "P-pop": [
                { title: "Zero Pressure", artist: "BINI", src: "#.mp3", bg: "56.jpg" },
                { title: "DAM", artist: "SB19", src: "#.mp3", bg: "DAM.jpg" },
                { title: "Daleng Dale", artist: "GAT", src: "#.mp3", bg: "57.jpg" },
                { title: "Kalakal", artist: "SB19", src: "#.mp3", bg: "58.jpg" },
                { title: "Cherry On Top", artist: "BINI", src: "#.mp3", bg: "59.jpg" },
            ],  
            "Reggae": [
                { title: "Country Road", artist: "Tropavibes", src: "Country Road - Tropavibes Reggae Remastered (John Denver).mp3", bg: "#.jpg" },
                { title: "So High", artist: "Sojah", src: "Sojah - So High (Lyrics) [smoke marijuana weÿ get so high like birds in the sky we fly].mp3", bg: "#.jpg" },
                { title: "Ehu Girl", artist: "Kolohe Kai", src: "Kolohe Kai - Ehu Girl (Lyrics).mp3", bg: "#.jpg" },
                { title: "One Day", artist: "Kokoi Baldo", src: "One day reggae lyrics.mp3", bg: "#.jpg" },
                { title: "Wonderful Tonight", artist: "Countdown Studio Band", src: "Wonderful Tonight (Reggae) Lyrics.mp3", bg: "#.jpg" },

                //OPM//
                { title: "Kung Ika'y Akin", artist: "Chocolate Factory", src: "Chocolate Factory - KUNG IKA_Y AKIN (Official Audio).mp3", bg: "#.jpg" },
                { title: "Yakap Sa Dilim", artist: "Brownman Revival", src: "Brownman Revival - Yakap Sa Dilim [Lyric Video].mp3", bg: "#.jpg" },
                { title: "Kumusta Ka Aking Mahal", artist: "DREADSPOT", src: "Kumusta ka aking mahal -Reggae.mp3", bg: "#.jpg" },
                { title: "Inuman Na", artist: "Tropa Vibes", src: "Inuman na - Parokya ni Edgar  TropaVibes Reggae Cover.mp3", bg: "#.jpg" },
                { title: "Bilog Na Naman Ang Buwan", artist: "Tropical Depression", src: "Bilog Na Naman Ang Buwan.mp3", bg: "#.jpg" },
            ],  
            "Rap": [
                { title: "Not Like Us", artist: "Kendrick Lamar", src: "Kendrick Lamar - not like us (Lyrics).mp3", bg: "#.jpg" },
                { title: "God's Plan", artist: "Drake", src: "Drake - God_s Plan (Lyric Video).mp3", bg: "#.jpg" },
                { title: "Rockstar", artist: "Post Malone", src: "Post Malone - rockstar (Lyrics) ft. 21 Savage.mp3", bg: "#.jpg" },
                { title: "Mask Off", artist: "Future", src: "Future - Mask Off (Lyrics  Lyric Video).mp3", bg: "#.jpg" },
                { title: "SICKO MODE", artist: "Travis Scott", src: "Travis Scott - SICKO MODE (Lyrics) ft. Drake.mp3", bg: "#.jpg" },

                //OPM//
                { title: "Fly Baby", artist: "Supafly", src: "Fly Baby - Supafly ft. Sica (Lyrics).mp3", bg: "60.jpg" },
                { title: "Puff Me Up", artist: "Supafly", src: "SUPAFLY - PUFF ME UP (Ft. Gat Putch, Gaspari, OG Cry, Ghoti scale, Sica).mp3", bg: "61.jpg" },
                { title: "Wag Ipagsabi", artist: "Dreycruz", src: "Dreycruz ft. Bert Symoun - Wag Ipagsabi (Official Music Video).mp3", bg: "62.jpg" },
                { title: "Gayuma", artist: "Abra", src: "Gayuma (Lyrics) - Abra (ft. Thyro & Jeriko Aguilar).mp3", bg: "download.jpeg" },
                { title: "Sirena", artist: "Gloc-9", src: "Sirena - Gloc-9 ft. Ebe Dancel (Lyrics).mp3", bg: "sirena.jpeg" },
            ],  
            "Old Song": [
                { title: "You Decorated My Life", artist: "Kenny Rogers", src: "Kenny Rogers - You Decorated My Life (Audio).mp3", bg: "21.jpg" },
                { title: "Against All Odds", artist: "Mariah Carey", src: "Mariah Carey - Against All Odds (Take a Look at Me Now) (Official HD Video) ft. Westlife.mp3", bg: "22.jpg" },
                { title: "Somewhere Only We Know", artist: "Keane", src: "Keane - Somewhere Only We Know (Lyrics).mp3", bg: "23.jpg" },
                { title: "LONELY IS THE NIGHT", artist: "AIR SUPPLY", src: "LONELY IS THE NIGHT -  AIR SUPPLY lyrics.mp3", bg: "24.jpg" },
                { title: "All My Life", artist: "America", src: "All My Life.mp3", bg: "25.jpg" },

                //OPM//
                { title: "Kahit Maputi Na Ang Buhok Ko", artist: "Rey Valera", src: "Rey Valera - Kahit Maputi Na Ang Buhok Ko [Official Lyric Video].mp3", bg: "26.jpg" },
                { title: "Ako'y Sayo Ika'y Akin Lamang", artist: "Daniel Padilla", src: "Ako_y Sayo Ika_y Akin Lamang - Daniel Padilla (Lyrics)  DJ Greatest Hits.mp3", bg: "27.jpg" },
                { title: "Kasama Kang Tumanda", artist: "Daniel Padilla", src: "KASAMA KANG TUMANDA - DANIEL PADILLA.mp3", bg: "28.jpg" },
                { title: "Narda", artist: "Kamikazee", src: "Kamikazee - Narda (Official Lyric Video).mp3", bg: "29.jpg" },
                { title: "Ikaw Na Nga", artist: "Willie Revillame", src: "Wille Revillame - Ikaw Na Nga (Official Lyric Video).mp3", bg: "30.jpg" },
            ],
            "Pop Music": [
                { title: "Happy", artist: "Pharrell Williams", src: "Happy [From Despicable Me 2] - Pharrell Williams (Lyrics).mp3", bg: "11.jpg" },
                { title: "Funky Town", artist: "Lipps Inc.", src: "Lipps Inc. - Funky Town (Lyrics).mp3", bg: "12.jpg" },
                { title: "Dancing Queen", artist: "ABBA", src: "ABBA - Dancing Queen (Official Lyric Video).mp3", bg: "13.png" },
                { title: "Shape Of You", artist: "Ed Sheeran", src: "Ed Sheeran - Shape of You (Lyrics).mp3", bg: "14.png" },
                { title: "Bye Bye Bye", artist: "NSYNC", src: "NSYNC - Bye Bye Bye (Lyrics) (Deadpool 3 Soundtrack).mp3", bg: "15.jpg" },

                //OPM//
                { title: "Sining", artist: "Dionela", src: "Dionela - sining (Lyrics) ft. Jay R.mp3", bg: "#.jpg" },
                { title: "Pagsamo", artist: "Arthur Nery", src: "Arthur Nery - Pagsamo (Lyrics).mp3", bg: "#.jpg" },
                { title: "Marilag", artist: "Dionela", src: "Dionela - Marilag (Official Lyric Video).mp3", bg: "#.jpg" },
                { title: "Rainbow", artist: "South Border", src: "South Border - Rainbow (Lyric).mp3", bg: "#.jpg" },
                { title: "Weak", artist: "Michael Pangilinan", src: "Michael Pangilinan - Weak (Cover) Lyrics.mp3", bg: "#.jpg" },
            ],
            "Rock": [
                { title: "The Wrong Turn", artist: "Classic Rock Greatest Hits", src: "That Wrong Turn.mp3", bg: "1.png" },
                { title: "Before The Dawn", artist: "Judas Priest", src: "Judas Priest - Before The Dawn (Official Audio).mp3", bg: "2.png" },
                { title: "Killing Floor", artist: "Slash", src: "Slash feat. Brian Johnson - Killing Floor (Official Music Video).mp3", bg: "5.png"},
                { title: "APT", artist: "ROSÉ", src: "ROSÉ & Bruno Mars - APT.mp3", bg: "#.jpg" },     
                { title: "The Final Countdown", artist: "Europe", src: "Europe - The Final Countdown (Lyrics).mp3", bg: "#.jpg"},

                //OPM//
                { title: "Usok", artist: "Asin", src: "Asin - Usok  High Quality.mp3", bg: "3.jpg" },
                { title: "Bote dyaryo", artist: "Abrakadabra", src: "Bote_t Dyaryo.mp3", bg: "4.jpg" },
                { title: "Ang Huling El Bimbo", artist: "Eraserheads", src: "Eraserheads - Ang Huling El Bimbo [Lyric Video].mp3", bg: "#.jpg" },
                { title: "Ligaya", artist: "Eraserheads", src: "Eraserheads - Ligaya [Lyric Video].mp3", bg: "#.jpg" },
                { title: "Kisapmata", artist: "Rivermaya", src: "Rivermaya - Kisapmata.mp3", bg: "#.jpg" },
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
                { title: "Finesse", artist: "Bruno Mars", src: "Bruno-MarsFinesse.mp3", bg: "513DWcoo7UL.jpg" },
                { title: "24K Magic", artist: "Bruno Mars", src: "BrunoMars-24kmagic.mp3", bg: "513DWcoo7UL.jpg" },
                { title: "Chunky", artist: "Bruno Mars", src: "BrunoMars-Chunky.mp3", bg: "513DWcoo7UL.jpg" },
                { title: "That's What I Like", artist: "Bruno Mars", src: "BrunoMars-ThatsWhatILike.mp3", bg: "513DWcoo7UL.jpg" },
                { title: "Versace On The Floor", artist: "Bruno Mars", src: "BrunoMars-VersaceOnTheFloor.mp3", bg: "513DWcoo7UL.jpg" },      
            ],
            "Hev-abi": [
                { title: "Alam Mo Ba Girl", artist: "Hev-abi", src: "HevAbi-AlamMoBaGirl", bg: "74f1598e949e7745dd1d78c58fe2869b.jpg" },
                { title: "Binibiroksi", artist: "Hev-abi", src: "HevAbi-Binibiroksi", bg: "74f1598e949e7745dd1d78c58fe2869b.jpg" },
                { title: "C2 Boyz", artist: "Hev-abi", src: "HevAbi-C2Boyz", bg: "74f1598e949e7745dd1d78c58fe2869b.jpg" },
                { title: "From Torillo With Love", artist: "Hev-abi", src: "HevAbi-FromTorilloWithLove", bg: "74f1598e949e7745dd1d78c58fe2869b.jpg" },
                { title: "Introhan Ko Lang", artist: "Hev-abi", src: "HevAbi-IntrohanKoLang", bg: "74f1598e949e7745dd1d78c58fe2869b.jpg" },
                { title: "Kulay Downtown", artist: "Hev-abi", src: "HevAbi-Kulay Downtown", bg: "74f1598e949e7745dd1d78c58fe2869b.jpg" },
                { title: "Still", artist: "Hev-abi", src: "HevAbi-Still", bg: "74f1598e949e7745dd1d78c58fe2869b.jpg" },
                { title: "Sumugal", artist: "Hev-abi", src: "HevAbi-Sumugal", bg: "74f1598e949e7745dd1d78c58fe2869b.jpg" },
                { title: "Walang Alam", artist: "Hev-abi", src: "HevAbi-WalangAlam", bg: "74f1598e949e7745dd1d78c58fe2869b.jpg" },
                { title: "drugr4ts", artist: "Hev-abi", src: "HevAbi-drugr4ts", bg: "74f1598e949e7745dd1d78c58fe2869b.jpg" },
            ],
            "Harry Styles": [
                { title: "Daylight", artist: "Harry Styles", src: "Harry Styles - Daylight.mp3", bg: "harry.jpeg" },
                { title: "Falling", artist: "Harry Styles", src: "Harry Styles - Falling.mp3", bg: "harry.jpeg" },
                { title: "Golden", artist: "Harry Styles", src: "Harry Styles - Golden.mp3", bg: "harry.jpeg" },
                { title: "Satellite", artist: "Harry Styles", src: "Harry Styles - Satellite.mp3", bg: "harry.jpeg" },     
                { title: "Sweet Creature", artist: "Harry Styles", src: "Harry Styles - Sweet Creature.mp3", bg: "harry.jpeg"},  
                { title: "Watermelon Sugar", artist: "Harry Styles", src: "Harry Styles - Watermelon Sugar.mp3", bg: "harry.jpeg" },
                { title: "Sign Of The Times", artist: "Harry Styles", src: "Harry Styles-Sign of the times.mp3", bg: "harry.jpeg" },
                { title: "Adore You", artist: "Harry Styles", src: "HarryStyles-Adore You.mp3", bg: "harry.jpeg" },     
                { title: "As It Was", artist: "Harry Styles", src: "HarryStyles-As It Was.mp3", bg: "harry.jpeg"},  
                { title: "Late Night Talking", artist: "Harry Styles", src: "HarryStyles-Late Night Talking.mp3", bg: "harry.jpeg"},  
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

    function changeGenre() {
        let selectedGenre = genreSelect.value;
        updatePage(selectedGenre);
        loadSongs(selectedGenre);
        albumSection.style.display = "none";
        mixedSection.style.display = "none";
        recommendedSection.style.display = "none";
    }
    
    function goHome() {
        updatePage("Explore");
        loadSongs("Explore");
        albumSection.style.display = "block";
        mixedSection.style.display = "block";
        recommendedSection.style.display = "block";
    }
    
    function loadArtist(artist) {
        updatePage(artist);
        loadSongs(artist);
        albumSection.style.display = "none";
        mixedSection.style.display = "none";
        recommendedSection.style.display = "none";
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

function loadRecommendedSong() {
        recommendContainer.innerHTML = "";

        let recommendedSong = [{ title: "Shape of You", artist: "Ed Sheeran", src: "shapeofyou.mp3", bg: "shapeofyou.jpg" },
        { title: "Blinding Lights", artist: "The Weeknd", src: "blindinglights.mp3", bg: "blindinglights.jpg" },
        { title: "Levitating", artist: "Dua Lipa", src: "levitating.mp3", bg: "levitating.jpg" },
        { title: "Stay", artist: "The Kid LAROI, Justin Bieber", src: "stay.mp3", bg: "stay.jpg" },
        { title: "Uptown Funk", artist: "Mark Ronson ft. Bruno Mars", src: "uptownfunk.mp3", bg: "uptownfunk.jpg" },
        { title: "Shape of You", artist: "Ed Sheeran", src: "shapeofyou.mp3", bg: "shapeofyou.jpg" },
        { title: "Blinding Lights", artist: "The Weeknd", src: "blindinglights.mp3", bg: "blindinglights.jpg" },
        { title: "Levitating", artist: "Dua Lipa", src: "levitating.mp3", bg: "levitating.jpg" },
        { title: "Stay", artist: "The Kid LAROI, Justin Bieber", src: "stay.mp3", bg: "stay.jpg" },
        { title: "Uptown Funk", artist: "Mark Ronson ft. Bruno Mars", src: "uptownfunk.mp3", bg: "uptownfunk.jpg" }
        ];


        recommendedSong.forEach(song => {

    let songCard = document.createElement("div");
    songCard.classList.add("song-card");
    songCard.style.backgroundImage = `url(${song.bg})`;

    let title = document.createElement("div");
    title.classList.add("song-title");
    title.textContent = song.title;

    let artist = document.createElement("div");
    artist.classList.add("song-artist");
    artist.textContent = song.artist;

    songCard.appendChild(title);
    songCard.appendChild(artist);
    recommendContainer.appendChild(songCard);


    songCard.addEventListener("click", function () {
        playSong(song);
    });
  })
    function changeCategory(category) {
    updatePage(category);
    loadSongs(category);

    if (category === "Explore") {
        albumSection.style.display = "block";
        mixedSection.style.display = "block";
        recommendedSection.style.display = "block";
    } else {
        albumSection.style.display = "none";
        mixedSection.style.display = "none";
        recommendedSection.style.display = "none";
    }
}
loadRecommendedSong();

}
});
