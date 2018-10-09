var audio, musicas = "", i, music_index = 0, timerCont;
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
    document.getElementById("stopBtn").addEventListener("click", stopMusic);
    document.getElementById("sliderVolume").addEventListener("change", volume);
    document.getElementById("sliderMusica").addEventListener("change", posMusic);
    // audio = new Audio(local + musicList[music_index] + ext);
    // audio.loop = false;
    lista();
    timer();
}
function setMusic() {
    audio = new Audio(local + musicList[music_index] + ext);
}
function lista() {
    for (i = 0; i < musicList.length; i++) {
        musicas += musicList[i] + "<br/><br/>";
    }
    document.getElementById("musicas").innerHTML = musicas;
}
function playMusic() {
    setMusic();
    audio.play();
    document.getElementById("playBtn").style.display = "none";
    document.getElementById("pauseBtn").style.display = "initial";
    setInterval(timer,10);
}
function pauseMusic() {
    audio.pause();
    document.getElementById("playBtn").style.display = "initial";
    document.getElementById("pauseBtn").style.display = "none";
}
function loopMusic() {
    if (audio.loop == false) {
        audio.loop = true;
        document.getElementById("repeatBtn").style.color = "#00E676";
    }
    else {
        audio.loop = false;
        document.getElementById("repeatBtn").style.color = "#E0E0E0";
    }
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
function stopMusic() {
    audio.pause();
    audio.currentTime = 0;
    document.getElementById("playBtn").style.display = "initial";
    document.getElementById("pauseBtn").style.display = "none";
    document.getElementById("sliderMusica").value = 0;
}
function volume() {
    audio.volume = (document.getElementById("sliderVolume").value / 100);
}
function posMusic() {
    audio.currentTime = ((document.getElementById("sliderMusica").value / 100) * audio.duration);
}
function timer() {
    var atual = (audio.currentTime).toFixed(0);
    var final = (audio.duration).toFixed(0);
    document.getElementById("timerA").innerHTML = converte(atual);
    document.getElementById("timerF").innerHTML = converte(final);
}
function converte(x) {
    function duasCasas(num) {
        if(num <= 9) {
            num = "0"+num;
        }
        return num;
    }
    var minuto = duasCasas(Math.floor((x%3600)/60));
    var segundo = duasCasas((x%3600)%60);
    var result = minuto+":"+segundo;
    return result;
}
// function fillBar() {
//     var elem = document.getElementById("progBar"); 
//     var width = 1;
//     var id = setInterval(frame, 100);
//     function frame() {
//         if (width >= 100) {
//             clearInterval(id);
//         } else {
//             width++; 
//             elem.style.width = width + '%'; 
//         }
//     }
// }
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