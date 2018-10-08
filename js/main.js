var musicas = [
    "Arctic Monkeys - Do I Wanna Know.mp3",
    "Drake - God's Plan.mp3",
    "Drake - Legend.mp3",
    "Drake - Nice For What.mp3",
    "Kendrick Lamar - HUMBLE.mp3",
    "Migos - Walk It Talk It ft. Drake.mp3"    
]
var capas = [
    "godsplan.jpg",
    "legend.jpg",
    "niceforwhat.jpg",
    "walkittalkit.jpg",
    "doiwannaknwo.jpg",
    "humble.jpg"
]
var audio = new Audio('audioFile');
audio.play();


function openSlideMenuL() {
    document.getElementById("menu-musicas").style.width = '200px';
    document.getElementById("content").style.marginLeft = '200px';
}
function closeSlideMenuL() {
    document.getElementById("menu-musicas").style.width = '0';
    document.getElementById("content").style.marginLeft = '0';
}
function openSlideMenuR() {
    document.getElementById("menu-playlists").style.width = '200px';
    document.getElementById("content").style.marginLeft = '-200px';
}
function closeSlideMenuR() {
    document.getElementById("menu-playlists").style.width = '0';
    document.getElementById("content").style.marginLeft = '0';
}