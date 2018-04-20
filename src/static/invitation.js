'use strict';

var invitationModal = document.getElementById('invitation-modal');

function showInvitationModal(element) {
    if (!element) {
        return false;
    }
    element.style.display = 'flex';
    initSocket();
}

function closeInvitationModal(element) {
    if (!element) {
        return false;
    }
    if (socket) {
      socket.close();
    }
    element.style.display = 'none';
    resetInvitationModalInputs(element);
}

function resetInvitationModalInputs(element) {
    if (!element) {
        return false;
    }
    var inputs = element.querySelectorAll('.text-input, .textarea-input');
    for (var index = 0; index < inputs.length; index ++) {
        inputs[index].value = '';
    }
}

function requestInvitation(element) {
    var name = element.querySelector('#invitation-name-input');
    if (!name || name.value.trim().length === 0) {
        alert('請填寫姓名');
        return false;
    }

    var email = element.querySelector('#invitation-email-input');
    if (!email || email.value.trim().length === 0) {
        alert('請填寫郵箱');
        return false;
    }
    if (!/\S+@\S+\.\S+/.test(email.value.trim())) {
        alert('請填寫正確的郵箱');
        return false;
    }

    var intro = element.querySelector('#invitation-intro-input');
    if (!intro || intro.value.trim().length === 0) {
        alert('請填寫自我介紹');
        return false;
    }
    sendMessage(JSON.stringify({
      type: 'candidate-create-request',
      payload: {
        name: name.value,
        email: email.value,
        bio: intro.value,
      },
    }));
}

function onShowInvitationModal() {
    showInvitationModal(invitationModal);
}

function onCloseInvitationModal() {
    closeInvitationModal(invitationModal);
}

function onRequestInvitation() {
    requestInvitation(invitationModal);
}

function onRequestSuccessful() {
    closeInvitationModal(invitationModal);
    setTimeout(function() {
      alert('信息已送出，謝謝關注 Matters');
    }, 100);
}

function onRequestFailed(response) {
  switch(response.payload.code) {
    case 'duplicated':
      alert('該郵箱已被使用了');
      break;
    case 'invalid-email':
      alert('郵箱格式錯誤');
      break;
    default:
      alert('申請時發生錯誤，請刷新頁面再試');
  }
}
