(function (global) {
    const _registry = new Map();

    const TemplateRegistry = {
        register(name, rendererFn) {
            console.log(`[TemplateRegistry] Registered template: ${name}`);
            _registry.set(name, rendererFn);
        },
        get(name) {
            if (!_registry.has(name)) {
                console.warn(`[TemplateRegistry] No template found for: ${name}`);
                return null;
            }
            const renderer = _registry.get(name);
            console.log(`[TemplateRegistry][GET] template: ${name}`, renderer);
            return renderer;
        }
    };



    TemplateRegistry.register('timeline', (items, section, container) => {
        const list = document.createElement('ol');
        list.className = 'experience-list';

        items.forEach(entry => {
            const item = document.createElement('li');
            item.className = 'experience-entry';

            const date = document.createElement('span');
            date.className = 'experience-date';
            date.textContent = entry.date || '';
            item.appendChild(date);

            const content = document.createElement('div');
            content.className = 'experience-content';
            const title = document.createElement('h3');
            title.className = 'experience-title';
            title.textContent = entry.title || '';
            content.appendChild(title);

            if (entry.org) {
                const org = document.createElement('p');
                org.className = 'experience-org';
                if (entry.org_url) {
                    const link = document.createElement('a');
                    link.href = entry.org_url;
                    link.target = '_blank';
                    link.rel = 'noopener noreferrer';
                    link.textContent = entry.org;
                    org.appendChild(link);
                } else {
                    org.textContent = entry.org;
                }
                content.appendChild(org);
            }

            if (entry.description) {
                const description = document.createElement('p');
                description.className = 'experience-description';
                description.innerHTML = entry.description;
                content.appendChild(description);
            }

            item.appendChild(content);
            list.appendChild(item);
        });

        container.appendChild(list);
    });

    global.TemplateRegistry = TemplateRegistry;
    console.log("[templates.js] global.TemplateRegistry assigned");
})(window);
