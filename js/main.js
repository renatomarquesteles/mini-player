var audio;
var musicas = [
    "music/Arctic Monkeys - Do I Wanna Know.mp3",
    "music/Drake - God's Plan.mp3",
    "music/Drake - Legend.mp3",
    "music/Drake - Nice For What.mp3",
    "music/Kendrick Lamar - HUMBLE.mp3",
    "music/Migos - Walk It Talk It ft. Drake.mp3"
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
    audio = new Audio(musicas[0]);
}
function playMusic() {
    audio.play();
    document.getElementById("playBtn").style.display = "none";
    document.getElementById("pauseBtn").style.display = "initial";
}
function pauseMusic() {
    audio.pause();
    document.getElementById("playBtn").style.display = "initial";
    document.getElementById("pauseBtn").style.display = "none";
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