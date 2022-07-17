const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

let tabItem = $$(".tab-item");
let tabItemH3 = $$(".tab-item h3");
let tabPane = $$(".tab-pane");
let line = $(".line");
tabItem.forEach((value, index) => {
  let tabsContent = tabPane[index];
  value.onclick = function () {
    $(".tab-item.active-item").classList.remove("active-item");
    $(".tab-pane.active-content").classList.remove("active-content");
    tabsContent.classList.add("active-content");
    this.classList.add("active-item");

    let lineItemWidth = this.offsetWidth + "px";
    let lineItemLeft = this.offsetLeft + "px";
    line.style.width = lineItemWidth;
    line.style.left = lineItemLeft;
  };
});

//toast
function showErrorToast() {
  toast({
    title: "Thông báo",
    message: "Chức năng này hiện đang được cập nhật, bạn vui lòng thông cảm!",
    type: "error",
    duration: 3000,
  });
}
// Toast function
function toast({ title = "", message = "", type = "info", duration = 3000 }) {
  const main = document.getElementById("toast");
  if (main) {
    const toast = document.createElement("div");

    // Auto remove toast
    const autoRemoveId = setTimeout(function () {
      main.removeChild(toast);
    }, duration + 1000);

    // Remove toast when clicked
    toast.onclick = function (e) {
      if (e.target.closest(".toast__close")) {
        main.removeChild(toast);
        clearTimeout(autoRemoveId);
      }
    };

    const icons = {
      success: "fas fa-check-circle",
      info: "fas fa-info-circle",
      warning: "fas fa-exclamation-circle",
      error: "fas fa-exclamation-circle",
    };
    const icon = icons[type];
    const delay = (duration / 1000).toFixed(2);

    toast.classList.add("toast", `toast--${type}`);
    toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;

    toast.innerHTML = `
					  <div class="toast__icon">
						  <i class="${icon}"></i>
					  </div>
					  <div class="toast__body">
						  <h3 class="toast__title">${title}</h3>
						  <p class="toast__msg">${message}</p>
					  </div>
					  <div class="toast__close">
						  <i class="fas fa-times"></i>
					  </div>
				  `;
    main.appendChild(toast);
  }
}

/*=============================================
=            app songs            =
=============================================*/
const PLAYER_STORAGE_KEY = "F8_PLAYER";
let listItemSong = $(".list-songs-bottom"); /* danh sach chua bai hat */
let botH3 = $(".media-content h3"); /* title name bai hat tai muc option*/
let botH4 = $(".media-content h4"); /* title name nghe si tai muc option */
let audio = $("#audio"); /* audio phat nhac */
let botImg = $(".media-left-img"); /* anh bai hat tai muc option */
let botPlay = $("button .icon-control-play"); /* nut play */
let botPause = $("button .icon-control-pause"); /* nut pause */
let botNext = $("button .icon-control-end"); /* nut next */
let botPref = $("button .icon-control-start"); /* nut pref */
let index = 1;
let progress = $("#progress");
let botRandom = $("button .icon-shuffle"); /* random */
let botLoop = $("button .icon-loop"); /* loop */
let iconSongBottom = $(".tab-pane-content-2-bottom"); /* song bottom */
let playlist = $(".list-songs-bottom");
let playlistBottom = $(".tab-pane-content-2-bottom");
let muted = $("button .icon-volume-2");
let volumeBot = $(".player-controls-right .volumeBot");
let iconSongBottomRIGHT = $(".content-top-right-list");
let listsongstop = $('.list-songs-top:first-child h4 span')
let app = {
  currenindex: 0,
  isPlaying: false,
  isRandom: false,
  isLoop: false,
  isMuted: false,
  isKeydown: true,
  config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},

  songs: [
    {
      name: "Dịu Dàng Em Đến",
      singer: "ERIK",
      path: "../assets/music/Dịu Dàng Em Đến (Cukak Remix) - ERIK - Bài hát, lyrics.mp3",
      image: '../assets/imgMusic/dde.png',
      duration: "03:21",
    },

    {
      name: "Bâng Khuâng",
      singer: "JustaTee",
      path: "../assets/music/Bâng Khuâng - JustaTee - Bài hát, lyrics.mp3",
      image: `../assets/imgMusic/bk.jpg`,
      duration: "04:33",
    },
    {
      name: "Yêu Đừng Sợ Đau",
      singer: "Ngô Lan Hương",
      path: "../assets/music/2.m4a",
      image: `../assets/imgMusic/aâ.webp`,
      duration: "04:28",
    },
    {
      name: "2AM",
      singer: "JustaTee",
      path: "../assets/music/2AM (Fawng Daw Remix) - JustaTee, BigDaddy - Bài hát, lyrics.mp3",
      image: `../assets/imgMusic/3b03f97a5eb943ad2a1e6a479520d2e3_1438759736.jpg`,
      duration: "04:18",
    },
    {
      name: "Tình Yêu Ngủ Quên",
      singer: "Hoàng Tôn",
      path: "../assets/music/8.mp3",
      image: `../assets/imgMusic/8.jpg`,
      duration: "03:14",
    },
    {
      name: "Ta Còn Đây",
      singer: "JustaTee",
      path: "../assets/music/Ta Còn Đây - JustaTee, Rhymastic, SlimV - Bài hát, lyrics.mp3",
      image: `../assets/imgMusic/t.jpg`,
      duration: "03:01",
    },

    {
      name: "Cuộc Gọi Cuối",
      singer: "JustaTee",
      path: "../assets/music/Cuộc Gọi Cuối (Last Call) - JustaTee - Bài hát, lyrics.mp3",
      image: `../assets/imgMusic/cgc.jpg`,
      duration: "04:36",
    },
    {
      name: "Muốn Em Là",
      singer: "Đại Mèo Remix",
      path: "../assets/music/Muốn Em Là (Đại Mèo Remix) - Keyo - Bài hát, lyrics.mp3",
      image: `../assets/imgMusic/mal.png`,
      duration: "04:16",
    },
    {
      name: "Gieo Quẻ",
      singer: "Hoàng Thuỳ Linh",
      path: "../assets/music/3.mp3",
      image: `../assets/imgMusic/3.webp`,
      duration: "04:00",
    },
    {
      name: "Tránh Duyên",
      singer: "Đình Dũng, Htrol",
      path: "../assets/music/Tránh Duyên (Remix) - Đình Dũng, Htrol - Bài hát, lyrics.mp3",
      image: `../assets/imgMusic/td.png`,
      duration: "05:12",
    },
  ],
  setConfig: function (key, value) {
    this.config[key] = value;
    localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
  },
  //Render display
  //   onclick='itemsSongs(${index})'
  renderDisplay: function () {
    let html = this.songs.map((song, index) => {
      return `<div class='songs-item ${
        index === this.currenindex ? "active-bgc" : ""
      }' data-index='${index}' >
		<div  class="songs-item-img">
		  <div class="songs-item-img-boxImg">
			  <img class="playingIcon"
				src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/icon-playing.gif"
				alt=""
			  />
			  <i class="fas fa-play song-icon-play"></i>
			<img
			  src="${song.image}""
			  class="songs-img"
			/>
		  </div>
		  <div class="songs-item-img-boxTitle">
			<h3>${song.name}</h3>
			<h4>${song.singer}</h4>
		  </div>
		</div>
		<div class="songs-item-title"></div>
		<div class="songs-item-time">
		  <i class="icon icon-heart"></i>
		  <h4>${song.duration}</h4>
		</div>
	  </div>`;
    });

    listItemSong.innerHTML = html.join("");
  },

  //render display Bottom playlist
  renderDisplayBottom: function () {
    let uhtml = this.songs.map((value, index) => {
      return `
		<div class="list-item-songs2 ${
      index === this.currenindex ? "active-bgcc" : ""
    }"  data-index='${index}'>
		<div class="list-item-songs2-left">
		  <i class="icon icon-music-tone-alt"></i>
		  <div class="items-song2-img">
			<i class="icon icon-control-play active-item"></i>
			<img class="imgpro" src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/icon-playing.gif" alt="">
			<img src="${value.image}" alt="">
		  </div>
		  <div class="list-item-songs2-left-title">
			<h3>${value.name}</h3>
			<h4>${value.singer}</h4>
		  </div>
		</div>
		<div class="list-item-songs2-center">
		  <h4>Đang cập nhật...</h4>
		</div>
		<div class="list-item-songs2-right">
		  <i  class="icon icon-heart"></i>
		  <h4>${value.duration}</h4>
		</div>
	  </div>
			`;
    });
    iconSongBottom.innerHTML = uhtml.join("");
  },
  //render display RIGHT playlist
  renderDisplayBottomrifht: function () {
	  let _this = this
    let arrRight = [];
    let uhtmls = this.songs.map((value, index) => {
      return `
	  <ul onclick="showErrorToast();">
		<li >
		  <div class="li-left">
			<img
			  src="${value.image}"
			  alt=""
			/>
			<div class="li-left-text">
			  <h4>${value.name}</h4>
			  <span>${value.singer}</span>
			</div>
		  </div>
		  <div class="li-right">
			<i onclick="showErrorToast();" class="icon icon-heart"></i>
			<i onclick="showErrorToast();" class="icon icon-options"></i>
		  </div>
		</li>
	  </ul>
			`;
    });
	playlist.onclick = function (e) {
		let songNode = e.target.closest(".songs-item:not(.songs-item-time i)");
		let endArr = [];
		if (songNode) {
		  _this.currenindex = Number(songNode.dataset.index);
		  _this.loadCurrentSongs();
		  _this.renderDisplay();
		  audio.play();
		  arrRight.push(uhtmls[_this.currenindex]);
		}
		iconSongBottomRIGHT.innerHTML = arrRight.join(" ");
	  };
	  //khi next
    botNext.onclick = function () {
		if (_this.isRandom) {
		  _this.playRandomSong();
		} else {
		  _this.nextSong();
		}
		  arrRight.push(uhtmls[_this.currenindex]);		  
		  audio.play();
		listsongstop.innerText = 10 - _this.currenindex
		iconSongBottomRIGHT.innerHTML = arrRight.join(" ");
  
		_this.renderDisplay();
	  };
	  //khi pref
	  botPref.onclick = function () {
		if (_this.isRandom) {
		  _this.playRandomSong();
		} else {
		  _this.prefSong();
		}
		  arrRight.push(uhtmls[_this.currenindex]);		  
		  audio.play();
		listsongstop.innerText = 10 - _this.currenindex
		iconSongBottomRIGHT.innerHTML = arrRight.join(" ");
  
		_this.renderDisplay();
	  };
	  //khi random
	  botRandom.onclick = function () {
		_this.isRandom = !_this.isRandom;
		botRandom.style.color = "orange";
		if (_this.isRandom === false) {
		  botRandom.style.color = "white";
		}
		botRandom.classList.toggle("active-orange", _this.isRandom);
			listsongstop.innerText = 10 - _this.currenindex
		  arrRight.push(uhtmls[_this.currenindex]);		  
		iconSongBottomRIGHT.innerHTML = arrRight.join(" ");
		_this.playRandomSong();
		_this.setConfig("isRandom", _this.isRandom);
		_this.renderDisplay();
	  };
	  playlistBottom.onclick = function (e) {
		let itemSongBottom = e.target.closest(".list-item-songs2");
		if (itemSongBottom) {
		  _this.currenindex = Number(itemSongBottom.dataset.index);
		  _this.loadCurrentSongs();
		  $(".imgpro").style.display = "block";
		  listsongstop.innerText = 10 - _this.currenindex
		  arrRight.push(uhtmls[_this.currenindex]);		  
		  iconSongBottomRIGHT.innerHTML = arrRight.join(" ");
			_this.renderDisplayBottom();
		  audio.play();
		}
	  };
  },
  // bài đầu tiên được add
  loadCurrentSongs: function () {
    botH3.innerText = this.currentSong.name;
    botH4.innerText = this.currentSong.singer;
    botImg.src = this.currentSong.image;
    audio.src = this.currentSong.path;
    $(".player-bar-bottom-right h4").innerText = this.currentSong.duration;
  },
  // tạo ra một thuộc tính object mới có thể truy cập bằng this(app)
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currenindex];
      },
    });
    Object.defineProperty(this, "currentSongBottom", {
      get: function () {
        return this.songs[this.currenindex];
      },
    });
  },

  //hàm chứa chức năng handlecontroMusic
  handleSongsContro: function () {
    let _this = this;
    //  khi nhấn vào play thì phát nhạc
    botPlay.onclick = function () {
      audio.play();
    };
    //khi audio duoc play
    audio.onplay = function () {
      botPlay.style.display = "none";
      botPause.style.display = "block";
      botImg.style.animation = "rotate 10s ease-in-out forwards infinite";
      botImg.style.transition = "all 5s ease-in";
    };

    //  khi nhấn vào pause thì dừng nhạc
    botPause.onclick = function () {
      audio.pause();
    };

    //khi audio duoc pause
    audio.onpause = function () {
      botPlay.style.display = "block";
      botPause.style.display = "none";
      botImg.style.transition = "all 5s ease-in";
      botImg.style.animation = "none";
    };

    // khi nhấn phím space, phát/dừng nhạc
    window.addEventListener("keydown", function (e) {
      _this.isKeydown = !_this.isKeydown;
      if (e.key == " " && _this.isKeydown) {
        audio.play();
        botImg.style.animation = "rotate 10s ease-in-out forwards infinite";
      } else {
        audio.pause();
        botImg.style.animation = "none";
      }
    });
    //khi nhan vao space thi khung hinh khong bi chuyen xuong
    window.onkeydown = function (e) {
      var elem = e.target.nodename;
      if (elem !== "TEXTAREA" && elem != "INPUT") {
        return !(e.keyCode == 32);
      }
    };

    //Khi tiến độ bài hát thay đổi thì thanh input thay đổi
    audio.ontimeupdate = function () {
      let numdu = audio.duration;
      let numti = audio.currentTime;
      //thanh trang thai cua progress
      if (numdu) {
        let progressPercent = Math.floor((numti / numdu) * 100);

        progress.value = progressPercent;
      }

      let bottime = parseInt(numti) / 60;
      $(".player-bar-bottom-left h4").innerText = "0" + bottime.toFixed(2);
    };
    //xử lý khi tua song
    progress.onchange = function (e) {
      let seekTime = (audio.duration / 100) * e.target.value;
      audio.currentTime = seekTime;
    };
    //when click on play to play music top
    $(".box-i .icon-control-play").onclick = function () {
      if (_this.isPlaying) {
        _this.isPlaying = false;
        audio.pause();
      } else {
        _this.isPlaying = true;
        audio.play();
      }
    };
    //khi loop
    botLoop.onclick = function () {
      _this.isLoop = !_this.isLoop;
      botLoop.classList.toggle("active-orange", _this.isLoop);
      _this.setConfig("isLoop", _this.isLoop);
      _this.renderDisplay();
    };
    // khi bai hat ket thuc thi next bai hat
    audio.onended = function () {
      // Xu ly loop
      if (_this.isLoop === true) {
        audio.currentTime = 0;
        botPlay.click();
      } else {
        botNext.click();
      }
      _this.renderDisplay();
    };

    /*=============================================
	=            muc bai hat            =
	=============================================*/

    
    /*=====  End of muc bai hat  ======*/

    //click vào bài hát nào thì phát bài hát đó
    playlist.onclick = function (e) {
      let songNode = e.target.closest(".songs-item:not(.songs-item-time i)");
      if (songNode) {
        _this.currenindex = Number(songNode.dataset.index);
        _this.loadCurrentSongs();
        _this.renderDisplay();
        audio.play();
      }
    };
    // khi ấn vào muted thì audio tắt âm thanh
    muted.onclick = function () {
      _this.isMuted = !_this.isMuted;
      if (_this.isMuted) {
        audio.muted = true;
      } else {
        audio.muted = false;
      }
    };
    //điều chỉnh âm lượng audio
    volumeBot.onmousemove = function (e) {
      let value_volume = Number(e.target.value);
      audio.volume = _this.volumecalculate(value_volume);
    };
  },
  // tinh toan volume
  volumecalculate: function (values) {
    return values / 100;
  },
  //tien bai hat
  nextSong: function () {
    this.currenindex++;
    if (this.currenindex >= this.songs.length) {
      this.currenindex = 0;
    }

    this.loadCurrentSongs();
  },
  loadConfig: function () {
    this.isRandom = this.config.isRandom;
    this.isLoop = this.config.isLoop;
    this.renderDisplay();
  },
  //lui bai hat
  prefSong: function () {
    this.currenindex--;
    if (this.currenindex < 0) {
      this.currenindex = this.songs.length - 1;
    }

    this.loadCurrentSongs();
  },
  //random bai hat
  playRandomSong: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex === this.currenindex);
    this.currenindex = newIndex;
    this.loadCurrentSongs();
  },

  //Hàm khởi chạy chức năng
  start: function () {
    // gán cấu hình từ config vào application
    this.loadConfig();
    // tạo ra một thuộc tính object mới có thể truy cập bằng this/ định nghĩa thuộc tính cho object
    this.defineProperties();
    // lắng nghe và xử lý các xự kiện người dùng
    this.handleSongsContro();
    // render playlist ra ngoài màn hình
    this.renderDisplay();
    //tải thông tin bài hát đầu tiên khi chạy dứng dụng
    //tải thông tin danh sách bài hát tại mục 02 (bài hát)
    this.renderDisplayBottom();
    this.loadCurrentSongs();
    this.renderDisplayBottomrifht();
    //Hiển thị trạng thái loop repeat
    botRandom.classList.toggle("active-orange", this.isRandom);
    botLoop.classList.toggle("active-orange", this.isLoop);
  },
};
app.start();

/*=====  End of app songs  ======*/
