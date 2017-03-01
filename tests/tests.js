var tmpl = new Domplates();

QUnit.test('simple', function (assert) {
	var el = tmpl.render('tmpl-helloworld', {
		strong: 'World'
	});

	assert.strictEqual(el.querySelectorAll('strong').length, 1, "Passed!");
	assert.strictEqual(el.querySelector('strong').innerHTML, 'World', "Passed!");
});

QUnit.test('simple:remove', function (assert) {
	var el = tmpl.render('tmpl-helloworld', {
		strong: null
	});

	assert.strictEqual(el.querySelectorAll('strong').length, 0, "Passed!");
});

QUnit.test('simple:attributes', function (assert) {
	var el = tmpl.render('tmpl-helloworld', {
		strong: {
			class: 'red',
			html: 'World'
		}
	});

	assert.strictEqual(el.querySelectorAll('strong').length, 1, "Passed!");
	assert.strictEqual(el.querySelector('strong').getAttribute('class'), 'red', "Passed!");
	assert.strictEqual(el.querySelector('strong').innerHTML, 'World', "Passed!");
	assert.strictEqual(el.querySelectorAll('strong.red').length, 1, "Passed!");
});

QUnit.test('repeat', function (assert) {
	var el = tmpl.render('tmpl-users', {
		li: [
			'Laura',
			'Miguel',
			'Guille',
		]
	});

	assert.strictEqual(el.querySelectorAll('li').length, 3, "Passed!");
	assert.strictEqual(el.querySelector('li').innerHTML, 'Laura', "Passed!");
});

QUnit.test('repeat:attributes', function (assert) {
	var el = tmpl.render('tmpl-users', {
		li: [
			{
				html: 'Laura',
				class: 'red',
			},
			{
				html: 'Miguel'
			},
			{
				html: 'Guille',
				class: 'red',
			},
		]
	});

	assert.strictEqual(el.querySelectorAll('li').length, 3, "Passed!");
	assert.strictEqual(el.querySelector('li').innerHTML, 'Laura', "Passed!");
	assert.strictEqual(el.querySelectorAll('li.red').length, 2, "Passed!");
});

QUnit.test('subtemplate', function (assert) {
	var el = tmpl.render('tmpl-users2', {
		h2: 'Hello world',
		template: [
			{
				a: {
					html: 'Laura',
					href: 'http://laura.com'
				}
			},{
				a: {
					html: 'Miguel',
					href: 'http://laura.com',
					class: 'red'
				}
			},{
				a: {
					html: 'Guille',
					href: 'http://guille.com',
					class: 'red'
				}
			},
		],
		a: {
			hidden: true
		}
	});

	assert.strictEqual(el.querySelectorAll('li').length, 3, "Passed!");
	assert.strictEqual(el.querySelector('li a').innerHTML, 'Laura', "Passed!");
	assert.strictEqual(el.querySelectorAll('a.red').length, 2, "Passed!");
	assert.strictEqual(el.querySelector('a.red').innerHTML, 'Miguel', "Passed!");
	assert.strictEqual(el.querySelectorAll('a').length, 3, "Passed!");
	assert.strictEqual(el.querySelectorAll('a[hidden]').length, 1, "Passed!");
});
