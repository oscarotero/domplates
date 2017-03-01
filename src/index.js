'use strict';

class Domplates {
    constructor (context) {
        this.context = context || document;
        this.templates = {};
    }

    getTemplate (id) {
        if (!this.templates[id]) {
            const tmpl = this.context.getElementById(id);

            if (!tmpl) {
                throw new Error(`The template "${id}" has not found`);
            }

            this.setTemplate(id, tmpl);
        }

        return this.templates[id];
    }

    setTemplate (id, template) {
        this.templates[id] = template;
    }

    render (template, data, insert) {
        if (typeof template === 'string') {
            template = this.getTemplate(template);
        }

        if (Array.isArray(data)) {
            return data.map((d) => this.render(template, d, insert));
        }

        const clone = document.importNode(template.content, true);

        Object.keys(data || {}).forEach((selector) => {
            let nodes = clone.querySelectorAll(selector);

            for (let i = 0; i < nodes.length; i++) {
                this.fill(nodes[i], data[selector], i);
            }
        });

        if (insert === true) {
            return template.parentNode.insertBefore(clone, template);
        }

        if (insert instanceof Node) {
            insert.innerHTML = '';
            return insert.appendChild(clone);
        }

        return clone;
    }

    fill (element, data, index) {
        if (typeof data === 'function') {
            data = data(element, index);
        }

        if (element instanceof HTMLTemplateElement) {
            return this.render(element, data, true);
        }

        if (Array.isArray(data)) {
            data.forEach((data, index) => {
                const clone = element.cloneNode(true);
                this.fill(clone, data, index);
                element.parentNode.insertBefore(clone, element);
            });

            return element.parentNode.removeChild(element);
        }

        if (data === null || data === undefined || data === false) {
            return element.parentNode.removeChild(element);
        }

        if (typeof data === 'string' || typeof data === 'number') {
            return element.innerHTML = data;
        }

        if (data instanceof DocumentFragment) {
            return element.appendChild(data);
        }

        if (typeof data === 'object') {
            return Object.keys(data).forEach(function (name) {
                let value = data[name];

                if (typeof value === 'function') {
                    if (name.indexOf('on') === 0) { //it's an event
                        return element.addEventListener(name.substr(2), value);
                    }

                    value = value(element, index);
                }

                if (name === 'html') {
                    element.innerHTML = value;
                } else if (name === 'data' && typeof value === 'object') {
                    Object.keys(value).forEach((key) => element.dataset[key] = value[key]);
                } else {
                    element.setAttribute(name, value);
                }
            });
        }

        throw new Error('Invalid value');
    }
}

//Exports
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.Domplates = factory();
    }
}(this, function () {
    return Domplates;
}));
