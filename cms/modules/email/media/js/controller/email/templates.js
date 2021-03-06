cms.init.add(['email_templates_edit', 'email_templates_add'], function () {
	$('#email_template_email_type').on('change', function () {
		show_options($(this).val());
	});

	$(':radio[name="message_type"]').on('change', function () {
		message_type = $(this).val();
		change_message_redator(message_type)
	});

	function change_message_redator(type) {
		if (type == EMAIL_HTML_TYPE)
			cms.filters.switchOn('email_template_message', DEFAULT_HTML_EDITOR);
		else
			cms.filters.switchOn('email_template_message', DEFAULT_CODE_EDITOR);
	}

	var activeInput;
	$(':input[type="text"]').on('focus', function () {
		activeInput = $(this);
	}).on('focusout', function (e) {
		if(e.relatedTarget && $(e.relatedTarget).hasClass('field-key')) {
			$(this).focus();
			return;
		}
		activeInput = null;
	});

	$('#field_description').on('click', 'a', function () {
		var curInput = activeInput;

		if (activeInput instanceof jQuery) {
			var cursorPos = curInput.prop('selectionStart');
			var v = curInput.val();
			var textBefore = v.substring(0, cursorPos);
			var textAfter = v.substring(cursorPos, v.length);
			curInput.val(textBefore + $(this).text() + textAfter);
		} else {
			cms.filters.exec('email_template_message', 'insert', $(this).text());
		}
		return false;
	});

	show_options($('#email_template_email_type').val());
	function show_options(id) {
		Api.get('email-types.options', {uid: id}, function (resp) {
			var cont = $('#field_description .col-md-9').empty();
			var ul = $('<ul class="list-unstyled" />').appendTo(cont);
			if (resp.response) {
				for (field in resp.response) {
					$('<li><a href="#" class="field-key">{' + field + '}</a> - ' + resp.response[field] + '</li>').appendTo(ul);
				}
			}
		})
	}
	
	$(function() {
		var message_type = $(':radio[name="message_type"]:checked').val();
		change_message_redator(message_type);
	});
});