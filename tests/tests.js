const tmpl = new Domplates();

QUnit.test('simple', function (assert) {
	const el = tmpl.render('tmpl-helloworld', {
		strong: 'World'
	});

	assert.strictEqual(el.querySelectorAll('strong').length, 1, "Passed!");
	assert.strictEqual(el.querySelector('strong').innerHTML, 'World', "Passed!");
});

QUnit.test('simple:remove', function (assert) {
	const el = tmpl.render('tmpl-helloworld', {
		strong: null
	});

	assert.strictEqual(el.querySelectorAll('strong').length, 0, "Passed!");
});

QUnit.test('simple:attributes', function (assert) {
	const el = tmpl.render('tmpl-helloworld', {
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
	const el = tmpl.render('tmpl-users', {
		li: [
			'Laura',
			'Miguel',
			'Guille',
		]
	});

	assert.strictEqual(el.querySelectorAll('li').length, 3, "Passed!");
	assert.strictEqual(el.querySelector('li').innerHTML, 'Laura', "Passed!");
});

QUnit.test('repeat:index', function (assert) {
	function key (el, index) {
		return index;
	}

	const el = tmpl.render('tmpl-users', {
		li: [
			key,
			key,
			key,
		]
	});

	assert.strictEqual(el.querySelectorAll('li').length, 3, "Passed!");
	assert.strictEqual(el.querySelector('li').innerHTML, '0', "Passed!");
	assert.strictEqual(el.querySelector('li:nth-child(2)').innerHTML, '1', "Passed!");
	assert.strictEqual(el.querySelector('li:nth-child(3)').innerHTML, '2', "Passed!");
});

QUnit.test('repeat:attributes', function (assert) {
	const el = tmpl.render('tmpl-users', {
		li: [
			{
				html: 'Laura',
				class: 'red',
			},
			{
				html: 'Miguel',
				class: function (el, index) {
					return 'pos-' + index;
				}
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
	assert.strictEqual(el.querySelectorAll('li.pos-1').length, 1, "Passed!");
});

QUnit.test('subtemplate', function (assert) {
	const el = tmpl.render('tmpl-users2', {
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
	assert.strictEqual(el.querySelectorAll('a[hidden]').length, 3, "Passed!");
});

QUnit.test('events', function (assert) {
	const el = tmpl.render('tmpl-helloworld', {
		strong: {
			html: 'world',
			onclick: function (ev) {
				this.innerHTML = 'clicked!';
			}
		}
	});

	const strong = el.querySelector('strong');
    assert.strictEqual(strong.innerHTML, 'world', "Passed!");

	const event = document.createEvent('HTMLEvents');
    event.initEvent('click', true, false);
    strong.dispatchEvent(event);

    assert.strictEqual(strong.innerHTML, 'clicked!', "Passed!");
});
