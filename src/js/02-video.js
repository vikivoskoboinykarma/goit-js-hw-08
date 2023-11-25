
import Player from "@vimeo/player";
import throttle from "lodash.throttle";

const iframe = document.querySelector("#vimeo-player");

const player = new Player(iframe);

const STORAGE_KEY = "videoplayer-current-time";

const savedTime = localStorage.getItem(STORAGE_KEY) || 0;

player.setCurrentTime(savedTime);

const saveTime = function (data) {
    localStorage.setItem(STORAGE_KEY, data.seconds);
};
const throttledSaveTime = throttle(saveTime, 1000);

player.on("timeupdate", throttledSaveTime,);