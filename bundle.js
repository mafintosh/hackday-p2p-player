/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	// hls

	var HIGH_Q = window.location.toString().indexOf('high') > -1;

	var mSeedPeer = HIGH_Q ? "/browser-server/master.m3u8" : "/browser-server/index_800_av-p.m3u8";
	var hqDR2 = "https://drevent-lh.akamaihd.net/i/event12_0@427365/master.m3u8";
	var DR2 = "https://dr02-lh.akamaihd.net/i/dr02_0@147055/master.m3u8";

	// poster
	var poster = "http://www.dr.dk/mu-online/api/1.3/bar/52d3f5e66187a2077cbac70e?width=322&height=181";

	var containerElement = document.getElementById("playerHandle");

	// Build the standard video element
	var playerElement = document.createElement("video");

	playerElement.setAttribute("height", "480");
	playerElement.setAttribute("width", "640");
	playerElement.setAttribute("id", "videojs_player");
	playerElement.setAttribute("class", "video-js vjs-default-skin vjs-big-play-centered poc-player");
	playerElement.setAttribute("controls", "");
	playerElement.setAttribute("poster", poster);

	//build src element
	var source = document.createElement("source");
	source.setAttribute("src", DR2);
	source.setAttribute("type", "application/x-mpegURL");

	// append source to player
	playerElement.appendChild(source);

	// append video element to html handle.
	containerElement.appendChild(playerElement);

	// Initialize videojs on video-element id
	var player = videojs('videojs_player', {
	  "nativeControlsForTouch": false
	});

	// var vjsButton = videojs.getComponent('button');
	var Button = videojs.getComponent('Button');

	// Subclass the component (see 'extend' doc for more info)
	// list of components to extend http://docs.videojs.com/docs/guides/components.html
	var hqBtn = videojs.extend(Button, {
	  constructor: function constructor() {
	    Button.apply(this, arguments);
	    this.isHQ = false;
	    /* initialize your button */
	    // Add component specific styling
	    this.addClass("hq-btn");
	    this.el().innerHTML = "HQ";
	  },
	  handleClick: function handleClick() {
	    /* do something on click */
	    console.log("enable hq", !this.isHQ);
	    if (this.isHQ) {
	      this.removeClass("active");
	      this.isHQ = false;
	      player.src({ type: 'application/x-mpegURL', src: DR2 });
	      player.play();
	    } else {
	      this.addClass("active");
	      this.isHQ = true;
	      player.src({ type: 'application/x-mpegURL', src: mSeedPeer });
	      player.play();
	    }
	  }
	});

	window.p2p = p2p;

	function p2p() {
	  player.src({ type: 'application/x-mpegURL', src: mSeedPeer });
	  player.play();
	}

	// Register the new component with videojs
	Button.registerComponent('hqBtn', hqBtn);

	// Add the bingmenu component to the player
	player.getChild('controlBar').addChild('hqBtn');

	var totalConnections = document.getElementById("total-connections");
	var connectionsList = document.getElementById("connections-list");

	function updateTotal(connections, down, up) {
	  console.log("set innerhtml", connections);
	  var totalConn = '<div class="list-data"> | Total Connections: ' + connections + '</div>';
	  var down = '<div class="list-data"> | down ' + down + "/s </div>";
	  var up = '<div class="list-data"> | up' + up + "/s </div>";
	  totalConnections.innerHTML = totalConn + down + up;
	}
	function updateTotalSpeed(down, up) {}
	function addToConnectionList(connection) {
	  var connectionId = connection.id ? connection.id : "unnamed";
	  var connectionUp = connection.upload ? connection.upload : "? kbs";
	  var connectionDown = connection.download ? connection.download : "? kbs";

	  var up = '<div class="list-data"> | up: ' + connectionUp + '</div>';
	  var down = '<div class="list-data"> | down: ' + connectionDown + '</div>';
	  var name = '<div class="list-data"> | name: ' + connectionId + '</div>';

	  var template = name + down + up;

	  var listElement = document.createElement('li');
	  listElement.innerHTML = template;
	  connectionsList.appendChild(listElement);

	  return listElement;
	}
	function updateMonitor(connections) {
	  connectionsList.innerHTML = '';
	  connections.forEach(function (connection) {
	    addToConnectionList(connection);
	  });
	}
	var prettierBytes = __webpack_require__(1);
	// global update state
	setInterval(function () {
	  console.log("global upspeed", prettierBytes(window.totalConnections.upSpeed()));
	  console.log("global downspeed", prettierBytes(window.totalConnections.downSpeed()));
	  if (window.p2pArchive && window.p2pArchive.content) {
	    console.log("nr of peers", window.p2pArchive.content.peers.length);
	    updateTotal(window.p2pArchive.content.peers.length, prettierBytes(window.totalConnections.downSpeed()), prettierBytes(window.totalConnections.upSpeed()));
	  }
	}, 2000);

	updateTotal("1");
	addToConnectionList({ "id": "myId", "upload": "500 kbs", "download": "600 kbs" });
	addToConnectionList({ "id": "myId", "upload": "500 kbs", "download": "600 kbs" });
	updateMonitor([{ "id": "myId", "upload": "666 kbs", "download": "666 kbs" }, { "id": "myId", "upload": "666 kbs", "download": "666 kbs" }, { "id": "myId", "upload": "666 kbs", "download": "666 kbs" }, { "id": "myId", "upload": "666 kbs", "download": "666 kbs" }]);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	module.exports = prettierBytes;

	function prettierBytes(num) {
	  if (typeof num !== 'number' || isNaN(num)) {
	    throw new TypeError('Expected a number, got ' + (typeof num === 'undefined' ? 'undefined' : _typeof(num)));
	  }

	  var neg = num < 0;
	  var units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

	  if (neg) {
	    num = -num;
	  }

	  if (num < 1) {
	    return (neg ? '-' : '') + num + ' B';
	  }

	  var exponent = Math.min(Math.floor(Math.log(num) / Math.log(1000)), units.length - 1);
	  num = Number(num / Math.pow(1000, exponent));
	  var unit = units[exponent];

	  if (num >= 10 || num % 1 === 0) {
	    // Do not show decimals when the number is two-digit, or if the number has no
	    // decimal component.
	    return (neg ? '-' : '') + num.toFixed(0) + ' ' + unit;
	  } else {
	    return (neg ? '-' : '') + num.toFixed(1) + ' ' + unit;
	  }
	}

/***/ })
/******/ ]);