$(() => {

  var Chat = {

    init: () => {
      Chat.socket = io({ autoConnect: false });
      Chat.cacheElements();
      Chat.bindEvents();

      Chat.$joinRoomModal.modal({
        backdrop: 'static',
        keyboard: false,
        show: true
      });
    },

    cacheElements: () => {
      Chat.$chatDiv = $('#chatDiv');
      Chat.$chatForm = $('#chatForm');
      Chat.$chatMessageInput = $('#chatMessageInput');
      Chat.$chatMessages = $('#chatMessages');
      Chat.$joinRoomForm = $('#joinRoomForm');
      Chat.$joinRoomModal = $('#joinRoomModal');
      Chat.$memberList = $('#memberList');
      Chat.$modalFormError = $('#modalFormError');
      Chat.$nickname = $('#nickname');
      Chat.$roomName = $('#roomName');
      Chat.$roomNameModal = $('#roomNameModal');
    },

    bindEvents: () => {
      Chat.socket.on('connect', Chat.onConnect);
      Chat.socket.on('message', Chat.onMessage);
      Chat.socket.on('server message', Chat.onServerMessage);
      Chat.socket.on('update member list', Chat.onUpdateMemberList);

      Chat.$joinRoomForm.submit(e => {
        e.preventDefault();
        let roomName = Chat.$roomNameModal.val().trim();
        let nickname = Chat.$nickname.val().trim();

        if (roomName === '' || nickname === '') {
          Chat.$modalFormError.text('No blank values!').css('color', 'red');
          return;
        }

        Person.nickname = nickname;
        Person.roomName = roomName;
        Chat.socket.open();
        Chat.$joinRoomModal.modal('hide');
      });

      Chat.$chatForm.submit(e => {
        e.preventDefault();
        Chat.socket.emit('message', Chat.$chatMessageInput.val(), Person);
        Chat.$chatMessageInput.val('');
        return false;
      });
    },

    onConnect: () => {
      Person.socketId = Chat.socket.id;
      Chat.socket.emit('join room', Person);
      Chat.$roomName.text(Person.roomName);
    },

    onMessage: (nickname, msg) => {
      let chatMessage = '<strong>' + nickname + ': </strong>' + msg;
      Chat.$chatMessages.append($('<li>').html(chatMessage));
      Chat.$chatDiv.scrollTop(Chat.$chatDiv.get(0).scrollHeight);
    },

    onServerMessage: msg => {
      Chat.$chatMessages.append($('<li>').html('<strong>' + msg + '</strong>'));
      Chat.$chatDiv.scrollTop(Chat.$chatDiv.get(0).scrollHeight);
    },

    onUpdateMemberList: members => {
      $('#memberList li').remove();
      for (const member in members) {
        Chat.$memberList.append($('<li>').text(`${members[member].nickname}`));
      }
    }
  };

  var Person = {
    roomName: '',
    nickname: ''
  };

  Chat.init();
});
