console.log('spotify');
let songIndex = 0;
let audioElement = new Audio('resources/music/01. Lalla Lalla Lori - Vishal Dadlani, Shivi [dTunes].mp3');
let masterPlay = document.querySelector('.master_play_icon');
let progressBar = document.querySelector('#progress_bar');
let songs = document.querySelectorAll('.music');
let subPlayIcons = document.querySelectorAll('#music_template_play');
let previous = document.querySelector('#previous')
let next = document.querySelector('#next')

let songsList = [
    {
        song: 'Lalla Lalla Lori',
        filePath: 'resources/music/01. Lalla Lalla Lori - Vishal Dadlani, Shivi [dTunes].mp3',
        coverPath: 'resources/music image/istockphoto-483495210-612x612.jpg'
    },
    {
        song: 'Teri Meri Kahaani',
        filePath: 'resources/music/12. Teri Meri Kahaani (SongsMp3.Com).mp3',
        coverPath: 'resources/music image/istockphoto-1203044169-612x612.jpg'
    },
    {
        song: 'Sooraj Dooba Hain',
        filePath: 'resources/music/13 - Sooraj Dooba Hain - Amaal Mallik, Arijit Singh, Aditi Singh Sharma - Roy (ExD$R).mp3',
        coverPath: 'resources/music image/istockphoto-994379168-612x612.jpg'
    },
    {
        song: ' Tere Bin Nahin Laage',
        filePath: 'resources/music/17 Tere Bin Nahin Laage.mp3',
        coverPath: 'resources/music image/istockphoto-1058251118-612x612.jpg'
    },
    {
        song: 'Tu Jo Hain',
        filePath: 'resources/music/18. Tu Jo Hain (Mr. X).mp3',
        coverPath: 'resources/music image/istockphoto-1142649448-612x612.jpg'
    },
    {
        song: 'Jeena Jeena',
        filePath: 'resources/music/30 Jeena Jeena (Remix).mp3',
        coverPath: 'resources/music image/istockphoto-1181169462-612x612.jpg'
    },
    {
        song: 'Chal Mere Ghar',
        filePath: 'resources/music/85 - Yo Yo Honey Singh - Chal Mere Ghar (By.Gauravunit).mp3',
        coverPath: 'resources/music image/istockphoto-1224225082-612x612.jpg'
    },
    {
        song: 'Alcoholic',
        filePath: 'resources/music/78 - Alcoholic - Shaukeens - Honey Singh - 320Kbps.mp3',
        coverPath: 'resources/music image/istockphoto-1393391667-612x612.jpg'
    }
];

// Initialize song list
songs.forEach((element, i) => {
    element.querySelector('#music_template').src = songsList[i].coverPath;
    element.querySelector('.song_name').innerText = songsList[i].song;
});

// Master play button functionality
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.src = 'resources/pause_circle_24dp_FILL0_wght400_GRAD0_opsz24.svg';
        // updatePlayIcons('pause', songIndex);
    } else {
        audioElement.pause();
        masterPlay.src = 'resources/play_circle_24dp_FILL0_wght400_GRAD0_opsz24.svg';
        // updatePlayIcons('play', songIndex);
    }
});

// Update progress bar as the song plays
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    progressBar.value = progress;
});

// Seek through the song
progressBar.addEventListener('change', () => {
    audioElement.currentTime = (progressBar.value * audioElement.duration) / 100;
});

// Individual song play buttons
subPlayIcons.forEach((element, index) => {
    element.addEventListener('click', () => {
        if (songIndex !== index) {
            songIndex = index;
            audioElement.src = songsList[songIndex].filePath;
            audioElement.play();
            masterPlay.src = 'resources/play_circle_24dp_FILL0_wght400_GRAD0_opsz24.svg';
            document.querySelector('.song_img_display').src = songsList[songIndex].coverPath;
            document.querySelector('.song_name_display').innerText = songsList[songIndex].song;
            updatePlayIcons('pause', songIndex);
        } else {
            if (audioElement.paused || audioElement.currentTime <= 0) {
                audioElement.play();
                element.src = 'resources/pause_circle_24dp_FILL0_wght400_GRAD0_opsz24.svg';
                masterPlay.src = 'resources/pause_circle_24dp_FILL0_wght400_GRAD0_opsz24.svg';
            } else {
                audioElement.pause();
                element.src = 'resources/play_arrow_24dp_FILL0_wght400_GRAD0_opsz24.svg';
                masterPlay.src = 'resources/play_circle_24dp_FILL0_wght400_GRAD0_opsz24.svg';
            }
        }
    });
});

// Function to update play/pause icons
function updatePlayIcons(state, index) {
    subPlayIcons.forEach((icon, i) => {
        if (i === index) {
            icon.src = state === 'play' ? 'resources/pause_circle_24dp_FILL0_wght400_GRAD0_opsz24.svg' : 'resources/play_arrow_24dp_FILL0_wght400_GRAD0_opsz24.svg';
        } else {
            icon.src = 'resources/pause_circle_24dp_FILL0_wght400_GRAD0_opsz24.svg';
        }
    });
}

// Sync master play button with individual play buttons
audioElement.addEventListener('play', () => {
    masterPlay.src = 'resources/play_circle_24dp_FILL0_wght400_GRAD0_opsz24.svg';
    updatePlayIcons('pause', songIndex);
});

audioElement.addEventListener('pause', () => {
    masterPlay.src = 'resources/pause_circle_24dp_FILL0_wght400_GRAD0_opsz24.svg';
    updatePlayIcons('play', songIndex);
});


// Previous button functionality
previous.addEventListener('click', () => {
    // Decrease the song index
    songIndex--;
    // If the index is less than 0, set it to the last song
    if (songIndex < 0) {
        songIndex = songsList.length - 1;
    }
    // Update the audio source to the new song
    audioElement.src = songsList[songIndex].filePath;
    // Play the new song
    audioElement.play();
    document.querySelector('.song_img_display').src = songsList[songIndex].coverPath;
    document.querySelector('.song_name_display').innerText = songsList[songIndex].song;
    // Update play icons to show pause for the new song
    updatePlayIcons('pause', songIndex);
})

next.addEventListener('click', () => {
    songIndex++;
    if (songIndex >= songsList.length) {
        songIndex = 0;
    }

    audioElement.src = songsList[songIndex].filePath;
    audioElement.play();
    document.querySelector('.song_img_display').src = songsList[songIndex].coverPath;
    document.querySelector('.song_name_display').innerText = songsList[songIndex].song;
    // Update play icons to show pause for the new song
    updatePlayIcons('pause', songIndex);
})