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

            for (let i = nodes.length - 1; i >= 0; i--) {
                this.fill(nodes[i], data[selector]);
            }
        });

        if (insert) {
            template.parentNode.insertBefore(clone, template);
        }

        return clone;
    }

    fill (element, data) {
        if (typeof data === 'function') {
            data = data(element);
        }

        if (element instanceof HTMLTemplateElement) {
            return this.render(element, data, true);
        }

        if (Array.isArray(data)) {
            data.forEach((data) => {
                const clone = element.cloneNode(true);
                this.fill(clone, data);
                element.parentNode.insertBefore(clone, element);
            });

            return element.parentNode.removeChild(element);
        }

        if (data === null || data === undefined || data === false) {
            return element.parentNode.removeChild(element);
        }

        if (typeof data === 'string') {
            return element.innerHTML = data;
        }

        if (data instanceof DocumentFragment) {
            return element.appendChild(data);
        }

        if (typeof data === 'object') {
            return Object.keys(data).forEach(function (name) {
                let value = data[name];

                if (typeof value === 'function') {
                    value = value(element);
                }

                if (name === 'html') {
                    element.innerHTML = value;
                } else {
                    element.setAttribute(name, value);
                }
            });
        }

        throw new Error('Invalid value')
    }
}

function handleObject (element, data) {
    
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
