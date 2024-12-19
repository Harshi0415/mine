console.log("Welcome to Spotify");

// Initialize variables
let audioElement = new Audio("song1.mp3");
let masterPlay = document.getElementById("masterPlay");
let progressBar = document.getElementById("progressBar");
let gif = document.getElementById("gif");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let songs = [
    { songName: "Night Changes", filePath: "song1.mp3",coverPath:'coverone.jpg'},
    { songName: "Perfect", filePath: "song2.mp3" },
    { songName: "Stereo Hearts", filePath: "song3.mp3" },
    { songName: "Pick Up the Phone", filePath: "song4.mp3" },
    { songName: "Scars to your Beautiful", filePath: "song5.mp3" },
    { songName: "You were there for me", filePath: "song6.mp3" },
    { songName: "Who says you are not perfect", filePath: "song7.mp3" },
    { songName: "Cheap Thrills-Sean Paul", filePath: "song8.mp3" },
                
    
];

// Optional: Dynamically populate song items (if needed)
songItems.forEach((element, i) => {
    //element.getElementsByTagName("img")[0].src = `cover${i + 1}.jpg`; // Update image dynamically
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; // Update song name
});

// Play/Pause functionality for master play button
masterPlay.addEventListener("click", () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove("fa-play");
        masterPlay.classList.add("fa-pause");
        gif.style.opacity = 1; // Show gif
    } else {
        audioElement.pause();
        masterPlay.classList.remove("fa-pause");
        masterPlay.classList.add("fa-play");
        gif.style.opacity = 0; // Hide gif
    }
});

// Update progress bar as the song plays
audioElement.addEventListener("timeupdate", () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    progressBar.value = progress; // Update progress bar
});

// Seek functionality for progress bar
progressBar.addEventListener("change", () => {
    audioElement.currentTime = (progressBar.value * audioElement.duration) / 100;
});

// Reset all play buttons to the play state
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
        element.classList.remove("fa-pause");
        element.classList.add("fa-play");
    });
};

// Song-specific play functionality
Array.from(document.getElementsByClassName("songItemPlay")).forEach((element, i) => {
    element.addEventListener("click", (e) => {
        makeAllPlays(); // Reset all buttons
        e.target.classList.remove("fa-play");
        e.target.classList.add("fa-pause");

        // Set the audio source dynamically based on the song clicked
        audioElement.src = songs[i].filePath;
        audioElement.currentTime = 0; // Reset playback time
        audioElement.play();

        // Update master play button and gif
        masterPlay.classList.remove("fa-play");
        masterPlay.classList.add("fa-pause");
        gif.style.opacity = 1; // Show gif
    });
});