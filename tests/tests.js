module('formalia.js tests');
test('Test a simple form', function() {
	var form =
		'<form>' +
			'<input type="text" name="test1">' +
			'<input type="text" name="test2">' +
			'<input type="text" name="test3">' +
			'<input type="text" name="test4">' +
		'</form>';
	var $form1 = $(form);

	$form1.formalia();

	$form1.find('[name=test1]').prop('value', 'Test 1').trigger('change');;

	var $form2 = $(form);
	$form2.formalia();

	ok($form1.find('[name=test1]').prop('value') == $form2.find('[name=test1]').prop('value'), 'Content is cached and loaded into form again');
});

test('Submitting a form removes cache content', function() {
	var form =
		'<form>' +
			'<input type="text" name="test1">' +
			'<input type="text" name="test2">' +
			'<input type="text" name="test3">' +
			'<input type="text" name="test4">' +
		'</form>';
	var $form1 = $(form);

	$form1.formalia();

	$form1.find('[name=test1]').prop('value', 'Test 1').trigger('change').trigger('submit');

	var $form2 = $(form);
	$form2.formalia();

	ok($form2.find('[name=test1]').prop('value') === '', 'Cached content is cleared on submit.');
	
});