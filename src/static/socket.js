'use strict';

var socket = null;
var defaultPath = 'wss://matters.news/api/action';
var path = generatePath();

function generatePath() {
  var url = new URL(window.location.href);
  var apiTarget = url.searchParams.get('target');
  switch(apiTarget) {
    case '1':
      return 'wss://stage.matters.news/api/action';
    case '2':
      return 'wss://stageb.matters.news/api/action';
    case '3':
      return 'ws://localhost:8888/api/action';
  }
  return defaultPath;
}

function initSocket() {
  socket = new WebSocket(path)

  socket.onopen = function(data) {
  };

  socket.onclose = function(data) {
  };

  socket.onmessage = function(data) {
    onSocketMessage(data);
  };

  socket.onerror = function(data) {
    onSocketError(data);
  };
}

function onSocketError(data) {
  alert('連線發生問題，請刷新頁面再試');
}

function onSocketMessage(data) {
  var response = JSON.parse(data.data);
  switch(response.type) {
    case 'candidate-create-success':
      onRequestSuccessful();
      break;
    case 'candidate-create-failure':
      onRequestFailed(response);
      break;
  }
}

function sendMessage(data) {
  if (!socket) {
    initSocket();
  }
  socket.send(data);
}
