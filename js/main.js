var audio = null,              // Variável que irá receber as músicas
    music_index = 0,    // Índice de cada música no array de músicas
    shuffle = false,    // Variável que indica se o botão de shuffle está ativado ou não
    loop = false,       // Variável que indica se o botão de loop está ativado ou não
    showVol = false,    // Variável que indica se a barra de volume está visível ou não
    local_M = "music/", // Variável que indica o local da música
    ext_M = ".mp3",     // Variável que indica a extensão da música
    musicList = [       // Array de músicas
        {nome:"Arctic Monkeys - Do I Wanna Know", artista:"Arctic Monkeys", ano:"2013", genero:"Indie Rock", capa:"WannaKnow"},
        {nome:"Drake - Nice For What", artista:"Drake", ano:"2018", genero:"Hip-Hop", capa:"Nice"},
        {nome:"Drake - Legend", artista:"Drake", ano:"2015", genero:"Hip-Hop", capa:"Legend"},
        {nome:"Migos - Walk It Talk It ft. Drake", artista:"Migos", ano:"2018", genero:"Trap, Hip-Hop", capa:"WalkIt"},
        {nome:"Kendrick Lamar - HUMBLE", artista:"Kendrick Lamar", ano:"2017", genero:"Hip-Hop", capa:"Humble"},
        {nome:"Drake - God's Plan", artista:"Drake", ano:"2018", genero:"Pop, Trap", capa:"GodsPlan"}
    ],
    local_C = "img/",   // Variável que indica o local da imagem de capa
    ext_C = ".jpg",     // Variável que indica a extensão da imagem de capa
    repList = [];   // Lista de reprodução
    playlists = [];

function showModal(x) {
    document.querySelector(("#m"+x+"Modal")).style.display = "block";
}
function closeModal(x) {
    document.querySelector(("#m"+x+"Modal")).style.display = "none";
}
window.onclick = function(event) {
    if (event.target == document.querySelector("#m0Modal")) {
        document.querySelector("#m0Modal").style.display = "none";
    }
    else if (event.target == document.querySelector("#m1Modal")) {
        document.querySelector("#m1Modal").style.display = "none";
    }
    else if (event.target == document.querySelector("#m2Modal")) {
        document.querySelector("#m2Modal").style.display = "none";
    }
    else if (event.target == document.querySelector("#m3Modal")) {
        document.querySelector("#m3Modal").style.display = "none";
    }
    else if (event.target == document.querySelector("#m4Modal")) {
        document.querySelector("#m4Modal").style.display = "none";
    }
    else if (event.target == document.querySelector("#m5Modal")) {
        document.querySelector("#m5Modal").style.display = "none";
    }
}

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
    audio = new Audio(local_M + musicList.nome[music_index] + ext_M);
}
function addRep(index) {
    repList.push(musicList[index]);
    let aux = "";
    for (let i = 0; i < repList.length; i++) {
        aux += "<div class='repLista'><p id='list"+i+"' onclick='selectMusic("+i+")'>" + repList[i].nome + "</p><i class='fas fa-times' onclick='removeMusic("+i+")'></i></div>";
    }
    document.getElementById("repList").innerHTML = aux;
    closeModal(index);
}
function removeMusic(x) {
    // repList.splice(x,1);
}
function selectMusic(x) {
    music_index = x;
    stopMusic();
    setMusic();
    playMusic();
}
function clearRep() {
    repList = [];
}
function setMusic() {
    audio = new Audio(local_M + repList[music_index].nome + ext_M);
}
function colorRep() {
    for(let i = 0; i<repList.length; i++){
        document.getElementById(("list"+i)).style.color = "#E0E0E0";
    }
    document.getElementById(("list"+music_index)).style.color = "#00B0FF";
}
function playMusic() {
    if(audio == null){
        setMusic();
    }
    
        audio.play();
        document.getElementById("playBtn").style.display = "none";
        document.getElementById("pauseBtn").style.display = "initial";
        document.getElementById("info-musica").innerHTML = repList[music_index].nome;
        document.getElementById("info-artista").innerHTML = repList[music_index].artista;
        document.getElementById("info-ano").innerHTML = repList[music_index].ano;
        document.getElementById("info-genero").innerHTML = repList[music_index].genero;
        document.getElementById("capa").innerHTML = '<img src="' + local_C + repList[music_index].capa + ext_C + '"/>';
        colorRep();
        setInterval(timer, 1000);
    
    closeSlideMenuR();
    closeSlideMenuL();
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
    if(loop == false){
        if(shuffle == false){
            if (music_index == repList.length - 1){
                music_index = 0;
            }
            else {
                music_index++;
            }
        }
        else {
            music_index = Math.floor(Math.random() * repList.length);
        }
    }
    stopMusic();
    setMusic();
    playMusic();
}
function prevMusic() {
    if(loop == false){
        if(shuffle == false){
            if (music_index == 0)
                music_index = repList.length - 1;
            else {
                music_index--;
            }
        }
        else {
            music_index = Math.floor(Math.random() * repList.length);
        }
    }
    stopMusic();
    setMusic();
    playMusic();
}
function loopMusic() {
    if (loop == false) {
        loop = true;
        document.getElementById("repeatBtn").style.color = "#00B0FF";
    }
    else {
        loop = false;
        document.getElementById("repeatBtn").style.color = "#E0E0E0";
    }
}
function shuffleMusic() {
    if (shuffle == false) {
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
    if (showVol == false) {
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
function playNow(x) {
    if(repList.length != 0){
        stopMusic();
        clearRep();
    }
    addRep(x);
    setMusic();
    playMusic();
}
function saveList() {
    playlists.push(repList);
    let aux = "";
    for (let i = 0; i < playlists.length; i++) {
        aux += "<p id='playlist"+i+"' onclick='showMusics()'> Playlist "+i+"</p>";
        for (let j = 0; j < repList.length; j++){
            aux += "<p id='pl"+i+"music"+j+"' style='display: none'>"+ repList[j].nome +"</p>";
        }
    }
    document.getElementById("playlists").innerHTML = aux;
}
function showMusics() {
}
function timer() {
    atual = (audio.currentTime).toFixed(0);
    final = (audio.duration).toFixed(0);
    document.getElementById("timerA").innerHTML = converte(atual);
    document.getElementById("timerF").innerHTML = converte(final);
    document.getElementById("sliderMusica").value = (atual / final) * 100;
    if (atual == final) {
        if(loop == false){
            if (shuffle == false) {
                nextMusic();
            }
            else {
                music_index = Math.floor(Math.random() * repList.length);
                stopMusic();
                setMusic();
                playMusic();
            }
        }
        else {
            stopMusic();
            setMusic();
            playMusic();
        }
    }
    document.getElementById("progBar").style.width = (atual / final) * 100 + "%";
}
function converte(x) {
    function duasCasas(num) {
        if (num <= 9) {
            num = "0" + num;
        }
        return num;
    }
    minuto = duasCasas(Math.floor((x % 3600) / 60));
    segundo = duasCasas((x % 3600) % 60);
    result = minuto + ":" + segundo;
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