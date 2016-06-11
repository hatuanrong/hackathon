/**
 * Created by Son Nui on 6/4/2016.
 */
class Sound{
    constructor(name) {
        this.sound = document.createElement("audio");
        this.sound.src = "sound/" + name + ".mp3";
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
    }
    play(){
        this.sound.play();
    }
    stop(){
        this.sound.pause();
    }
}