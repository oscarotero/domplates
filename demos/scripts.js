const tmpl = new Domplates();

//Hello world
let hw = tmpl.render('tmpl-helloworld', {
    strong: {
        html: 'World',
        class: 'red'
    }
}, true);

//Hello world
tmpl.render('tmpl-helloworld', {
    strong: {
        html: 'World',
        class: 'red'
    }
}, hw);

//Repeat items
tmpl.render('tmpl-users', {
    h2: null,
    li: [
        'Laura',
        'Miguel',
        {
            html: '<em>Guille</em>',
            class: 'red'
        }
    ]
}, true);

//Subtemplates
tmpl.render('tmpl-links', {
    h2: 'Articles from wikipedia',
    template: [
        {
            img: {
                src: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Tsunami_by_hokusai_19th_century.jpg',
                alt: 'The Great Wave off Kanagawa'
            },
            a: {
                href: 'https://en.wikipedia.org/wiki/The_Great_Wave_off_Kanagawa',
                html: 'The Great Wave off Kanagawa'
            }
        },{
            img: {
                src: 'https://upload.wikimedia.org/wikipedia/en/8/8c/NikolaiRoerichRite1.jpg',
                alt: 'The Rite of Spring'
            },
            a: {
                href: 'https://en.wikipedia.org/wiki/The_Rite_of_Spring',
                html: 'The Rite of Spring'
            }
        }
    ]
}, true);

//Events + datalist
tmpl.render('tmpl-button', {
    button: {
        html: 'Click me!',
        onclick: function (event) {
            alert('Hello ' + this.dataset.name);
        },
        data: {
            name: 'Miguel'
        }
    }
}, true);