const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

let listItemSong = document.querySelector(".list-songs-bottom");
let app = {
  songs: [
    {
      name: "2AM",
      singer: "JustaTee, BigDaddy",
      path: "../assets/music/2AM (Fawng Daw Remix) - JustaTee, BigDaddy - Bài hát, lyrics.mp3",
      image: `../assets/imgMusic/3b03f97a5eb943ad2a1e6a479520d2e3_1438759736.jpg`,
      duration: "04:11",
    },
    {
      name: "Bâng Khuâng",
      singer: "JustaTee",
      path: "../assets/music/Bâng Khuâng - JustaTee - Bài hát, lyrics.mp3",
      image: `../assets/imgMusic/bk.jpg`,
      duration: "04:20",
    },
    {
      name: "Ta Còn Đây",
      singer: "JustaTee, Rhymastic, SlimV",
      path: "../assets/music/Ta Còn Đây - JustaTee, Rhymastic, SlimV - Bài hát, lyrics.mp3",
      image: `../assets/imgMusic/t.jpg`,
      duration: "03:01",
    },
    {
      name: "Tình Yêu Ngủ Quên",
      singer: "Hoàng Tôn, LyHan, Orinn Remix",
      path: "../assets/music/8.mp3",
      image: `../assets/imgMusic/8.jpg`,
      duration: "03:14",
    },
    {
      name: "Dịu Dàng Em Đến",
      singer: "ERIK, Cukak Remix",
      path: "../assets/music/Dịu Dàng Em Đến (Cukak Remix) - ERIK - Bài hát, lyrics.mp3",
      image: `../assets/imgMusic/dde.png`,
      duration: "03:14",
    },
    {
      name: "Yêu Đừng Sợ Đau",
      singer: "Ngô Lan Hương, Cukak Remix",
      path: "../assets/music/2.m4a",
      image: `../assets/imgMusic/aâ.webp`,
      duration: "03:53",
    },
    {
      name: "Cuộc Gọi Cuối",
      singer: "JustaTee, Rhymastic, SlimV",
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
  //Render display
  renderDisplay: function () {
    let html = this.songs.map((song, id) => {
      return `<div class="songs-item">
		<div class="songs-item-img">
		  <div class="songs-item-img-boxImg">
			  <img class="playingIcon"
				src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/icon-playing.gif"
				alt=""
			  />
			  <i class="fas fa-play song-icon-play"></i>
			<img
			  src="${song.image}=""
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

  //Hàm khởi chạy chức năng
  start: function () {
    this.renderDisplay();
  },
};

app.start();
