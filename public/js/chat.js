// This file is executed in the browser, when people visit /chat/<random id>

$(function () {
	display();
	showMessage();
	//<li class="left clearfix"><span class="chat-img pull-left"><img src="http://placehold.it/50/55C1E7/fff&text=U" alt="User Avatar" class="img-circle" /></span><div class="chat-body clearfix"><div class="header"><strong class="primary-font">Jack Sparrow</strong> <small class="pull-right text-muted"><span class="glyphicon glyphicon-time"></span>12 mins ago</small></div><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornaredolor, quis ullamcorper ligula sodales.</p></div></li>
	$('#btn-chat').on('click', function (e) {
		e.preventDefault();
		var msg = $("#btn-input").val().trim();
		if (msg === '') {


		} else {

			var chatObj = {
				me: sessionStorage.userId,
				you: sessionStorage.user2,
				msg: msg
			}
			$("#btn-input").val('');
			console.log(chatObj)
			$.post("/api/chat/", chatObj, function (req, res) {

			}).then(display);
		}
	})
	// $('.media').on('click', function (e) {
	// 	e.prenventDefault();
	// 	#msg-summary

	// })
	/// dispaly msg onload
	function showMessage() {
		$.get('/api/messages/' + sessionStorage.userId, function (data) {
			if (data.length > 0) {
				for (var index = 0; index < data.length; index++) {
					var mesDiv = $('<div>');
					mesDiv.html('<tr data-status="pagado"><td><div class="ckbox"><input type="checkbox" id="checkbox1"><label for="checkbox1"></label></div> </td><td><a href="javascript:;" class="star"><i class="glyphicon glyphicon-star"></i></a></td><td><div class="media"><a href="#" class="pull-left"><img src="https://s3.amazonaws.com/uifaces/faces/twitter/fffabs/128.jpg" class="media-photo"></a><div class="media-body"> <span class="media-meta pull-right">Febrero 13, 2016</span><p class="summary" id="msg-summary">' + data[index].my_message + '</p></div></div></td> </tr>')
					$('#msg-row').append(mesDiv);

				}

			} else {
				$('#msg-row').text('No Chat');
			}

		})

	}

	function display() {
		$.get('/api/chat/' + sessionStorage.userId + '/' + sessionStorage.user2, function (data) {
			console.log(data);
			if (data.length > 0) {
				for (var index = 0; index < data.length; index++) {
					if (data[index].userId == sessionStorage.userId) {
						var newDiv = $('<div>');
						newDiv.html(' <li class="left clearfix"><span class="chat-img pull-left"><img src="http://placehold.it/50/55C1E7/fff&text=U" alt="User Avatar" class="img-circle" /></span><div class="chat-body clearfix"><div class="header"><strong class="primary-font">Jack Sparrow</strong> <small class="pull-right text-muted"><span class="glyphicon glyphicon-time"></span>12 mins ago</small></div><p>' + data[index].my_message + '</p></div></li>');
						$('#chat_id').append(newDiv);
					} else {
						var newDiv = $('<div>');
						newDiv.html(' <li class="right clearfix"><span class="chat-img pull-right"><img src="http://placehold.it/50/55C1E7/fff&text=U" alt="User Avatar" class="img-circle" /></span><div class="chat-body clearfix"><div class="header"><strong class="primary-font">Jack Sparrow</strong> <small class="pull-right text-muted"><span class="glyphicon glyphicon-time"></span>12 mins ago</small></div><p>' + data[index].my_message + '</p></div></li>');
						$('#chat_id').append(newDiv);
					}
				}

			} else {
				$('#chat_id').text('no records');
			}

		})



	}
});