$(document).ready(function(){
	
	$("#btnOpenPopup").click(function(e)
	{
		var me = this;
		e.preventDefault();
		var clients = [{"id": "2", "name": "India"}, {"id": "3", "name": "Japan"}];
		var messageToSend = JSON.stringify(clients);
		var page = "http://localhost/ngpubsub/";
		var $dialog = $("<div id='iprDialog'></div>")
			.html("<iframe id='the_iframe' style='border:0px' src='" + page + "' width='100%' height='100%' scrolling='no'></iframe>")
			.dialog({
				modal: true,
				title: "Child application (Angular) - Home",
				width: 900,
				height: 600,
				my: "center",
				at: "center",
				of: window,
				minWidth: 850,
				minHeight: 590,
				maxWidth: 950,
				maxHeight: 650,
				resizable: true,
				open: function(ev, ui){
					$(this).parent().css('padding', '0px');
					// Send storage to child window
					//localStorage.setItem('input', JSON.stringify(messageToSend));
					// Send message to child window
					$('#the_iframe').on("load", function() {
						$("#the_iframe")[0].contentWindow.postMessage(messageToSend, '*');
					});
					/*
					setTimeout(function(){
					  $("#the_iframe")[0].contentWindow.postMessage(JSON.stringify(messageToSend), '*');
					}, 500);
					*/
				},
				close: function(ev, ui){
					//localStorage.removeItem('input');
					//localStorage.setItem('input', null);
					//var e = new Event("storage");
					//e.originalEvent = {
					//	key: 'input',
					//	oldValue: JSON.stringify(messageToSend),
					//	newValue: JSON.parse(localStorage.getItem('input'))
					//};
					var e = new Event("message");
					window.dispatchEvent( e );
					$(this).dialog('destroy');
				}
			});
			//console.log(JSON.parse(localStorage.getItem('input')));
	});
	
});

window.addEventListener('storage', this.storageEventHandler, false);

window.addEventListener('message', this.messageEventHandler, false);

function messageEventHandler(evt){
  console.log(evt);
  var msg = evt.data && JSON.parse(evt.data);
  $("#txtConsole").val(msg);
}

function storageEventHandler(evt){
	console.log("oldValue: " + evt.originalEvent.oldValue );
	console.log("storage event called key: " + evt.originalEvent.key );
	console.log("newValue: " + evt.originalEvent.newValue );
	if(evt.originalEvent.key === 'input' && (evt.originalEvent.newValue === null || evt.originalEvent.newValue === 'undefined' || evt.originalEvent.newValue === '')) {
		$("#txtConsole").val('');
	}
}