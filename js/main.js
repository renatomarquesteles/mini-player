var audio, musicas = "", i, music_index = 0, timerCont, shuffle = false,showVol = false;
var local = "music/"
var ext = ".mp3"
var musicList = [
    "Arctic Monkeys - Do I Wanna Know",
    "Drake - Nice For What",
    "Drake - Legend",
    "Migos - Walk It Talk It ft. Drake",
    "Kendrick Lamar - HUMBLE",
    "Drake - God's Plan"
]
var capas = [
    "godsplan.jpg",
    "legend.jpg",
    "niceforwhat.jpg",
    "walkittalkit.jpg",
    "doiwannaknwo.jpg",
    "humble.jpg"
]
window.onload = function () {
    document.getElementById("playBtn").addEventListener("click", playMusic);
    document.getElementById("pauseBtn").addEventListener("click", pauseMusic);
    document.getElementById("repeatBtn").addEventListener("click", loopMusic);
    document.getElementById("nextBtn").addEventListener("click", nextMusic);
    document.getElementById("prevBtn").addEventListener("click", prevMusic);
    document.getElementById("stopBtn").addEventListener("click", stopMusic);
    document.getElementById("shuffleBtn").addEventListener("click", shuffleMusic)
    document.getElementById("sliderVolume").addEventListener("change", volume);
    document.getElementById("sliderMusica").addEventListener("change", posMusic);
    document.getElementById("btnVolume").addEventListener("click", btnVol);
    audio = new Audio(local + musicList[music_index] + ext);
    // audio.loop = false;
    // lista();
}
function setMusic() {
    audio = new Audio(local + musicList[music_index] + ext);
}
// function lista() {
//     for (i = 0; i < musicList.length; i++) {
//         musicas += musicList[i] + "<br/><br/>";
//     }
//     document.getElementById("musicas").innerHTML = musicas;
// }
function playMusic() {
    setMusic();
    audio.play();
    document.getElementById("playBtn").style.display = "none";
    document.getElementById("pauseBtn").style.display = "initial";
    setInterval(timer,1000);
}
function pauseMusic() {
    audio.pause();
    document.getElementById("playBtn").style.display = "initial";
    document.getElementById("pauseBtn").style.display = "none";
}
function stopMusic() {
    audio.pause();
    audio.currentTime = 0;
    document.getElementById("playBtn").style.display = "initial";
    document.getElementById("pauseBtn").style.display = "none";
    document.getElementById("sliderMusica").value = 0;
}
function nextMusic() {
    if (music_index == musicList.length - 1)
        music_index = 0;
    else {
        music_index++;
    }
    stopMusic();
    playMusic();
}
function prevMusic() {
    if (music_index == 0)
        music_index = musicList.length-1;
    else {
        music_index--;
    }
    stopMusic();
    playMusic();
}
function loopMusic() {
    if (audio.loop == false) {
        audio.loop = true;
        document.getElementById("repeatBtn").style.color = "#00B0FF";
    }
    else {
        audio.loop = false;
        document.getElementById("repeatBtn").style.color = "#E0E0E0";
    }
}
function shuffleMusic() {
    if(shuffle == false){
        shuffle = true;
        document.getElementById("shuffleBtn").style.color = "#00B0FF";
    }
    else {
        shuffle = false;
        document.getElementById("shuffleBtn").style.color = "#E0E0E0";
    }
}
function volume() {
    audio.volume = (document.getElementById("sliderVolume").value / 100);
    document.getElementById("volBar").style.width = document.getElementById("sliderVolume").value + "px";
}
function posMusic() {
    audio.currentTime = ((document.getElementById("sliderMusica").value / 100) * audio.duration);
}
function btnVol() {
    if(showVol == false){
        showVol = true;
        document.querySelector('#sliderVolume').style.display = "block";
        document.querySelector('#volBar').style.display = "block";
        document.querySelector('.barraVol').style.display = "flex";
    }
    else {
        showVol = false;
        document.querySelector('#sliderVolume').style.display = "none";
        document.querySelector('#volBar').style.display = "none";
        document.querySelector('.barraVol').style.display = "none";
    }
}
function timer() {
    atual = (audio.currentTime).toFixed(0);
    final = (audio.duration).toFixed(0);
    document.getElementById("timerA").innerHTML = converte(atual);
    document.getElementById("timerF").innerHTML = converte(final);
    document.getElementById("sliderMusica").value = (atual/final)*100;
    if(atual == final) {
        if(shuffle == false){
            music_index++;
            stopMusic();
            playMusic();
        }
        else{
            music_index = Math.floor(Math.random() * musicList.length);
        }
    }
    document.getElementById("progBar").style.width = (atual/final)*100 +"%";
}
function converte(x) {
    function duasCasas(num) {
        if(num <= 9) {
            num = "0"+num;
        }
        return num;
    }
    minuto = duasCasas(Math.floor((x%3600)/60));
    segundo = duasCasas((x%3600)%60);
    result = minuto+":"+segundo;
    return result;
}
function openSlideMenuL() {     // Função para abrir a sidebar no lado esquerdo (left)
    document.getElementById("menu-musicas").style.width = '200px';
    document.getElementById("content").style.marginLeft = '200px';
}
function closeSlideMenuL() {    // Função para fechar a sidebar no lado esquerdo (left)
    document.getElementById("menu-musicas").style.width = '0';
    document.getElementById("content").style.marginLeft = '0';
}
function openSlideMenuR() {     // Função para abrir a sidebar no lado direito (right)
    document.getElementById("menu-playlists").style.width = '200px';
    document.getElementById("content").style.marginLeft = '-200px';
}
function closeSlideMenuR() {    // Função para fechar a sidebar no lado direito (right)
    document.getElementById("menu-playlists").style.width = '0';
    document.getElementById("content").style.marginLeft = '0';
}