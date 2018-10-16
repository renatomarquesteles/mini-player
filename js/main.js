var audio = null,       // Variável que irá receber as músicas
    music_index = 0,    // Índice de cada música no array de músicas
    shuffle = false,    // Variável que indica se o botão de shuffle está ativado ou não
    loop = false,       // Variável que indica se o botão de loop está ativado ou não
    showVol = false,    // Variável que indica se a barra de volume está visível ou não
    valorVol = 100,           // Variável que irá guardar o valor do volume
    local_M = "music/", // Variável que indica o local da música
    ext_M = ".mp3",     // Variável que indica a extensão da música
    listagem,           // Variável que servirá de key para o localStorage
    p = 0,              // Variável para ser usada nas keys do localStorage
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
    repList = [],       // Lista de reprodução
    playlist = [],      // Lista de playlists
    filtro = document.getElementById("filtro"), // Variável para filtragem da pesquisa de músicas
    nomes = [],     // Vetor para guardar os nomes das músicas para utilizar no filtro
    timerIntervalo;

window.onclick = function(event) {      // Funções para fechar modal e sidebars clicando na tela
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
    else if (event.target == document.querySelector("#m6Modal")) {
        document.querySelector("#m6Modal").style.display = "none";
    }
    else if (event.target == document.querySelector("#m7Modal")) {
        document.querySelector("#m7Modal").style.display = "none";
    }
    else if (event.target == document.querySelector("#m8Modal")) {
        document.querySelector("#m8Modal").style.display = "none";
    }
    else if (event.target == document.querySelector("#m99Modal")) {
        document.querySelector("#m99Modal").style.display = "none";
        closeSlideMenuL();
        closeSlideMenuR();
    }
}
window.onload = function () {       // Comandos que serão executados ao carregar a página
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
    // for (let i = 0; i<10; i++){     // Pega playlists armazenadas no localStorage
    //     playlist.push(localStorage.getItem(('Playlist '+i)) ? JSON.parse(localStorage.getItem(('Playlist '+i))) : []);
    // }
}
// Modal
function showModal(x) {   // Mostra o modal
    document.querySelector(("#m"+x+"Modal")).style.display = "block";
}
function closeModal(x) {    // Fecha o modal
    document.querySelector(("#m"+x+"Modal")).style.display = "none";
}
// Lista de Reprodução
function addRep(index) {    // Adiciona uma música à lista de reprodução
    if(repList.indexOf(musicList[index]) != -1){
        showModal(9);
        document.getElementById("aviso").innerHTML = "Aviso: Foi adicionada uma música repetida na lista de reprodução.";
        // alert("Adicionou uma música repetida na lista de reprodução!");
    }
    repList.push(musicList[index]);
    attList();
    closeModal(index);
}
function removeMusic(x) {   // Remove uma música da lista de reprodução
    if (x == music_index){
        stopMusic();
        if(repList.length > 1){
            nextMusic();
            repList.splice(x,1);
            if(music_index > 0){
                music_index--;
            }
        }
        else{
            repList = [];
            music_index = 0;
        }
    }
    else if (x < music_index){
        music_index--;
        repList.splice(x,1);
    }
    else if (x > music_index){
        repList.splice(x,1);
    }
    if(repList.length == 0){
        clearInterval(timerIntervalo);
        audio = null;
        document.getElementById("info-musica").innerHTML = "Nenhuma faixa adicionada à lista de reprodução";
        document.getElementById("info-artista").innerHTML = "";
        document.getElementById("info-ano").innerHTML = "";
        document.getElementById("info-genero").innerHTML = "";
        document.getElementById("capa").innerHTML = "<img src='img/capa.jpg' />";
        document.getElementById("timerA").innerHTML = "00:00";
        document.getElementById("timerF").innerHTML = "00:00";
        document.getElementById("sliderMusica").value = 0;
        document.getElementById("progBar").style.width = "0%";
    }
    attList();
}
function attList() {    // Atualiza a lista de reprodução
    let aux = "";
    for (let i = 0; i < repList.length; i++) {
        aux += `<div class="repLista"><p id='list${i}' onclick='selectMusic(${i})'>${repList[i].nome}</p><i class='fas fa-times' onclick='removeMusic(${i})'></i></div>`;
    }
    document.getElementById("repList").innerHTML = aux;
    if(repList.length > 0){
        colorRep();
    }
}
function selectMusic(x) {   // Seleciona uma música da lista de reprodução para tocar
    music_index = x;
    stopMusic();
    setMusic();
    playMusic();
}
function colorRep() {   // Destaca a música atual na lista de reprodução
    for(let i = 0; i<repList.length; i++){
        document.getElementById(("list"+i)).style.color = "#E0E0E0";
    }
    document.getElementById(("list"+music_index)).style.color = "#00B0FF";
}
// Player
function setMusic() {   // Define a música que irá tocar
    audio = new Audio(local_M + repList[music_index].nome + ext_M);
}
function playMusic() {  // Inicia a música
    if(audio == null){
        if(repList.length > 0){
            setMusic();
            playMusic();
        }
        else{
            openSlideMenuL();
        }
    }
    else {
        audio.play();
        document.getElementById("playBtn").style.display = "none";
        document.getElementById("pauseBtn").style.display = "initial";
        document.getElementById("info-musica").innerHTML = repList[music_index].nome;
        document.getElementById("info-artista").innerHTML = repList[music_index].artista;
        document.getElementById("info-ano").innerHTML = repList[music_index].ano;
        document.getElementById("info-genero").innerHTML = repList[music_index].genero;
        document.getElementById("capa").innerHTML = `<img src="${local_C}${repList[music_index].capa}${ext_C}"/>`;
        colorRep();
        volume();
        timerIntervalo = setInterval(timer, 1000);
        closeSlideMenuL();
        closeSlideMenuR();
    }
}
function pauseMusic() { // Pausa a música
    audio.pause();
    document.getElementById("playBtn").style.display = "initial";
    document.getElementById("pauseBtn").style.display = "none";
    closeSlideMenuL();
    closeSlideMenuR();
}
function stopMusic() {  // Para e reseta a música
    if(audio == null){
        openSlideMenuL();
    }
    else {
        audio.pause();
        audio.currentTime = 0;
        document.getElementById("playBtn").style.display = "initial";
        document.getElementById("pauseBtn").style.display = "none";
        document.getElementById("sliderMusica").value = 0;
    }
}
function nextMusic() {  // Passa para a música seguinte
    if(audio == null){
        openSlideMenuL();
    }
    else{
        if(loop == false){  // Verifica se o botão repeat está ativo
            if(shuffle == false){   // Verifica se o botão aleatório(shuffle) está ativo
                if (music_index >= repList.length - 1){
                    stopMusic();
                    music_index = 0;
                    setMusic();
                    playMusic();
                }
                else {
                    music_index++;
                    stopMusic();
                    setMusic();
                    playMusic();
                }
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
            playMusic();
        }
    }
}
function prevMusic() {  // Volta para a música anterior
    if(audio == null){
        openSlideMenuL();
    }
    else{
        if(loop == false){  // Verifica se o botão repeat está ativo
            if(shuffle == false){   // Verifica se o botão aleatório(shuffle) está ativo
                if (music_index == 0){
                    music_index = repList.length - 1;
                }
                else if (music_index < repList.length){
                    music_index--;
                }
                else {
                    music_index = repList.length - 1;
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
}
function loopMusic() {  // Ativa ou desativa a função repeat
    if (loop == false) {
        loop = true;
        document.getElementById("repeatBtn").style.color = "#00B0FF";
    }
    else {
        loop = false;
        document.getElementById("repeatBtn").style.color = "#E0E0E0";
    }
    closeSlideMenuL();
    closeSlideMenuR();
}
function shuffleMusic() {   // Ativa ou desativa a função aleatório(shuffle)
    if (shuffle == false) {
        shuffle = true;
        document.getElementById("shuffleBtn").style.color = "#00B0FF";
    }
    else {
        shuffle = false;
        document.getElementById("shuffleBtn").style.color = "#E0E0E0";
    }
    closeSlideMenuL();
    closeSlideMenuR();
}
function volume() {     // Determina o volume da música
    valorVol = document.getElementById("sliderVolume").value;   // a função volume recebe valores entre 0 e 1, o input "sliderVolume" está setado com valores de 0 a 100
    document.getElementById("volBar").style.width = valorVol + "px";
    if (audio != null){
        audio.volume = (valorVol / 100);
    }
    closeSlideMenuL();
    closeSlideMenuR();
}
function posMusic() {   // Determina a posição atual (minutos e segundos) da música
    audio.currentTime = ((document.getElementById("sliderMusica").value / 100) * audio.duration);
}
function btnVol() {     // Mostra ou esconde a barra de volume
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
    closeSlideMenuL();
    closeSlideMenuR();
}
function timer() {  // Barra de reprodução da música
    atual = (audio.currentTime).toFixed(0);
    final = (audio.duration).toFixed(0);
    document.getElementById("timerA").innerHTML = converte(atual);
    document.getElementById("timerF").innerHTML = converte(final);
    document.getElementById("sliderMusica").value = (atual / final) * 100;
    if (atual == final) {   // Quando a música termina
        if(loop == false){  // Verifica se o botão repeat está ativo
            if (shuffle == false) { // Verifica se o botão aleatório(shuffle) está ativo
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
// Sidebar Musicas
function playNow(x) {   // Adiciona música na lista de reprodução e começa a tocá-la
    if(audio != null){  // Se já tiver alguma música tocando, pará-la
        stopMusic();
    }
    repList = [];
    music_index = 0;
    repList.push(musicList[x]);
    attList();
    setMusic();
    playMusic();
    closeModal(x);
    closeModal(99);
}
function filtrar() {
    var nomeMusica = document.getElementById("filtro").value.toLowerCase();
    for(let i = 0; i<=5; i++){
        nomes.push(document.getElementById(`musica${i}`).innerText.toLowerCase());
        if (nomeMusica == null){
            document.getElementById(`musica${i}`).style.display = 'block';
        }
        else if (nomes[i].indexOf(nomeMusica) != -1){
            document.getElementById(`musica${i}`).style.display = 'block';
        }
        else{
            document.getElementById(`musica${i}`).style.display = 'none';
        }
    }
}
// Playlist
function createPL() {   // Cria e armazena uma playlist
    var objeto = new Object();
    objeto.nome = document.getElementById("NomePL").value;  // Nome da playlist
    objeto.musica = [];
    var musicas = document.getElementsByName("musica");     // Armazenas as opções de músicas
    for (let i = 0; i < musicas.length; i++){
        if (musicas[i].checked) {   // Verifica as que foram selecionadas
            if(musicas[i].value == "0"){
                objeto.musica.push(musicList[0]);
            }else if (musicas[i].value == "1") {
                objeto.musica.push(musicList[1]);
            }else if (musicas[i].value == "2") {
                objeto.musica.push(musicList[2]);
            }else if (musicas[i].value == "3") {
                objeto.musica.push(musicList[3]);
            }else if (musicas[i].value == "4") {
                objeto.musica.push(musicList[4]);
            }else if (musicas[i].value == "5") {
                objeto.musica.push(musicList[5]);
            }
        }
    }
    playlist.push(objeto);
    document.getElementById("NomePL").value = "";
    document.getElementsByName("musica").checked = false;
    closeModal(6);
    attPlaylist();
    // listagem = "Playlist "+p;
    // p++;
    // localStorage.setItem(listagem, JSON.stringify(playlist));   // Armazena playlist no localStorage
}
function selectPL(y) {  // Lista e mostra opções da playlist selecionada
    showModal(7);
    let aux = "";
    for (let i = 0; i<playlist[y].musica.length; i++){
        aux += playlist[y].musica[i].nome+"<br/>";  // Listagem das músicas da playlist
    }
    document.getElementById("opcoesPL").innerHTML = `<h1>${playlist[y].nome}</h1><div class="itemList">${aux}</div><button class="btn-Centro" onclick="playPL(${y})">PLAY</button><button class="btn-Centro" onclick="editPL(${y})">EDITAR</button><button class="btn-Centro" onclick="removePL(${y})">EXCLUIR</button>`;
}
function editPL(y){     // Edita playlist criando uma nova
    closeModal(7);
    var nomePL = document.getElementById("NomePL").value = playlist[y].nome;
    playlist.splice(y,1);
    showModal(6);
    document.getElementById("NomePL").value = nomePL;
}
function removePL(y){   // Exclui playlist
    closeModal(7);
    playlist.splice(y,1);
    attPlaylist();
}
function playPL(y) {    // Adiciona playlist à lista de reprodução
    if (audio != null){
        stopMusic();
    }
    repList = [];
    music_index = 0;
    for (let i = 0; i<playlist[y].musica.length; i++){
        repList.push(playlist[y].musica[i]);
    }    
    attList();
    setMusic();
    playMusic();
    closeModal(7);
    closeModal(99);
}
function attPlaylist() {    // Atualiza lista de playlists
    let aux = "";
    for (let i = 0; i < playlist.length; i++) {
        aux += `<p onclick="selectPL(${i})">${playlist[i].nome}</p>`;
    }
    document.getElementById("playlists").innerHTML = aux;
}
function PLlist(z) {    // Mostra a lista de Playlists quando se quer adicionar uma música à uma playlist já criada
    showModal(8);   // Abre modal com as opções de playlist
    let aux = "";
    for(let i = 0; i<playlist.length; i++){
        aux += `<p><label><input type="checkbox" name="playlist" value="${i}">${playlist[i].nome}</label></p>`;
    }
    document.getElementById("PLlist").innerHTML = aux + '<label onclick="showModal(6), closeModal(8)"><i class="fas fa-plus-circle"></i> Criar Playlist</label>';
    document.getElementById("botaoAddPL").innerHTML = `<button class="btn-Embaixo" onclick="addPL(${z})">OK</button>`;
}
function addPL(x){  // Adiciona a música à(s) playlist(s) selecionada(s)
    var lista = document.getElementsByName("playlist");
    for (let i = 0; i < lista.length; i++){
        if (lista[i].checked) {
            for (let j = 0; j<playlist.length; j++){
                if(lista[i].value == j){
                    playlist[j].musica.push(musicList[x]);
                }
            }
        }
    }
    closeModal(8);
    closeModal(x);
    closeModal(99);
    closeSlideMenuL();
}
// Sidebars
function openSlideMenuL() {     // Função para abrir a sidebar no lado esquerdo (left)
    document.getElementById("menu-musicas").style.width = '200px';
    closeSlideMenuR();
    showModal(99);
}
function closeSlideMenuL() {    // Função para fechar a sidebar no lado esquerdo (left)
    document.getElementById("menu-musicas").style.width = '0';
}
function openSlideMenuR() {     // Função para abrir a sidebar no lado direito (right)
    document.getElementById("menu-playlists").style.width = '200px';
    closeSlideMenuL();
    showModal(99);
}
function closeSlideMenuR() {    // Função para fechar a sidebar no lado direito (right)
    document.getElementById("menu-playlists").style.width = '0';
}
// Diversos
function converte(x) {      // Função que converte o tempo das músicas em segundos para minutos:segundos com duas casas cada (ex: 59:59)
    function duasCasas(num) {
        if (num <= 9) {
            num = "0" + num;
        }
        return num;
    }
    minuto = duasCasas(Math.floor(x / 60));
    segundo = duasCasas(x % 60);
    result = minuto + ":" + segundo;
    return result;
}