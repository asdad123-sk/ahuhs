const audio = document.getElementById('audio');
const playlist = document.getElementById('playlist');
const playPauseBtn = document.getElementById('playPause');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

let currentSongIndex = 0;

playlist.addEventListener('click', function (e) {
    if (e.target.tagName === 'LI') {
        const songSrc = e.target.getAttribute('data-src');
        audio.src = songSrc;
        audio.play();
        currentSongIndex = Array.from(playlist.children).indexOf(e.target);
        playPauseBtn.textContent = '暂停';
    }
});

playPauseBtn.addEventListener('click', function () {
    if (audio.paused) {
        audio.play();
        playPauseBtn.textContent = '暂停';
    } else {
        audio.pause();
        playPauseBtn.textContent = '播放';
    }
});

prevBtn.addEventListener('click', function () {
    currentSongIndex = (currentSongIndex - 1 + playlist.children.length) % playlist.children.length;
    const songSrc = playlist.children[currentSongIndex].getAttribute('data-src');
    audio.src = songSrc;
    audio.play();
    playPauseBtn.textContent = '暂停';
});

nextBtn.addEventListener('click', function () {
    currentSongIndex = (currentSongIndex + 1) % playlist.children.length;
    const songSrc = playlist.children[currentSongIndex].getAttribute('data-src');
    audio.src = songSrc;
    audio.play();
    playPauseBtn.textContent = '暂停';
});
