document.addEventListener('DOMContentLoaded', () => {
    const scriptsGrid = document.getElementById('scriptsGrid');
    const searchInput = document.getElementById('searchInput');
    const filterContainer = document.getElementById('filterContainer');
    const detailContainer = document.getElementById('detailContainer');

    let allScripts = [];
    let currentCategory = 'all';

    // Загрузка данных
    fetch('scripts.json')
        .then(response => response.json())
        .then(data => {
            allScripts = data.scripts;
            init();
        })
        .catch(err => console.error('Error loading scripts:', err));

    function init() {
        const urlParams = new URLSearchParams(window.location.search);
        const scriptId = urlParams.get('id');

        if (scriptId && detailContainer) {
            renderDetail(scriptId);
        } else if (scriptsGrid) {
            renderCategories();
            renderScripts(allScripts);
            setupFilters();
        }
    }

    function renderCategories() {
        const categories = ['all', ...new Set(allScripts.map(s => s.category))];
        filterContainer.innerHTML = '';
        categories.forEach(cat => {
            const btn = document.createElement('button');
            btn.className = `filter-btn ${cat === currentCategory ? 'active' : ''}`;
            btn.dataset.category = cat;
            btn.textContent = cat === 'all' ? 'Все' : cat.charAt(0).toUpperCase() + cat.slice(1);
            btn.addEventListener('click', () => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentCategory = cat;
                filterAndRender();
            });
            filterContainer.appendChild(btn);
        });
    }

    function renderScripts(scripts) {
        scriptsGrid.innerHTML = '';
        if (scripts.length === 0) {
            scriptsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; margin-top: 2rem;">Ничего не найдено 😕</p>';
            return;
        }

        scripts.forEach(script => {
            const card = document.createElement('div');
            card.className = 'script-card';
            card.innerHTML = `
                <h3>${script.name}</h3>
                <p>${script.description}</p>
                <div class="script-tags">
                    ${script.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
                </div>
                <div class="card-actions">
                    <button class="btn btn-primary btn-copy" data-code="${btoa(script.code)}">
                        <i class="fas fa-copy"></i> Код
                    </button>
                    <a href="script.html?id=${script.id}" class="btn btn-secondary">
                        <i class="fas fa-info-circle"></i> Инфо
                    </a>
                </div>
            `;
            scriptsGrid.appendChild(card);
        });

        // Setup copy buttons
        document.querySelectorAll('.btn-copy').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const code = atob(btn.dataset.code);
                copyToClipboard(code, btn);
            });
        });
    }

    function filterAndRender() {
        const query = searchInput.value.toLowerCase();
        const filtered = allScripts.filter(s => {
            const matchesCategory = currentCategory === 'all' || s.category === currentCategory;
            const matchesSearch = s.name.toLowerCase().includes(query) || 
                                  s.description.toLowerCase().includes(query) ||
                                  s.tags.some(t => t.toLowerCase().includes(query));
            return matchesCategory && matchesSearch;
        });
        renderScripts(filtered);
    }

    function setupFilters() {
        searchInput.addEventListener('input', filterAndRender);
    }

    function renderDetail(id) {
        const script = allScripts.find(s => s.id === id);
        if (!script) {
            detailContainer.innerHTML = '<h1>Скрипт не найден</h1><a href="index.html">Вернуться в каталог</a>';
            return;
        }

        document.title = `${script.name} - One-Time Scripts`;

        detailContainer.innerHTML = `
            <div class="detail-header">
                <a href="index.html" style="text-decoration: none; color: var(--primary-color); margin-bottom: 1rem; display: inline-block;">
                    <i class="fas fa-arrow-left"></i> Назад в каталог
                </a>
                <h1>${script.name}</h1>
            </div>

            <div class="detail-meta">
                <span>Категория: <strong>${script.category}</strong></span> | 
                <span>Автор: <strong>${script.author}</strong></span>
                ${script.url ? ` | <a href="${script.url}" target="_blank">GitHub автора</a>` : ''}
            </div>

            <div class="detail-section">
                <h3>Описание</h3>
                <p>${script.description}</p>
            </div>

            <div class="detail-section">
                <h3>Как использовать</h3>
                <div style="background: #f0f0f0; padding: 1rem; border-radius: 8px; white-space: pre-wrap;">${script.instructions}</div>
            </div>

            <div class="detail-section">
                <h3>Код скрипта</h3>
                <div class="code-block">
                    <pre><code>${escapeHtml(script.code)}</code></pre>
                </div>
                <button class="btn btn-primary btn-copy" style="margin-top: 1rem; width: 100%; font-size: 1.1rem; padding: 1rem;" data-code="${btoa(script.code)}">
                    <i class="fas fa-copy"></i> Копировать код
                </button>
            </div>

            <div class="qr-section">
                <h3>Открыть на телефоне</h3>
                <p>Отсканируйте QR-код, чтобы открыть эту страницу на мобильном</p>
                <div class="qr-code">
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(window.location.href)}" alt="QR Code">
                </div>
            </div>

            <div class="detail-section" style="margin-top: 4rem;">
                <h3>Похожие скрипты</h3>
                <div class="scripts-grid" id="similarScripts"></div>
            </div>
        `;

        // Render similar scripts
        const similar = allScripts.filter(s => s.category === script.category && s.id !== script.id).slice(0, 3);
        const similarGrid = document.getElementById('similarScripts');
        if (similar.length > 0) {
            similar.forEach(s => {
                const card = document.createElement('div');
                card.className = 'script-card';
                card.innerHTML = `
                    <h3>${s.name}</h3>
                    <p>${s.description}</p>
                    <a href="script.html?id=${s.id}" class="btn btn-secondary">Подробнее</a>
                `;
                similarGrid.appendChild(card);
            });
        } else {
            similarGrid.innerHTML = '<p>Нет похожих скриптов в этой категории.</p>';
        }

        // Setup copy button
        detailContainer.querySelector('.btn-copy').addEventListener('click', (e) => {
            copyToClipboard(script.code, e.currentTarget);
        });
    }

    function copyToClipboard(text, btn) {
        navigator.clipboard.writeText(text).then(() => {
            const originalContent = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i> Скопировано!';
            btn.style.background = '#2e7d32';
            setTimeout(() => {
                btn.innerHTML = originalContent;
                btn.style.background = '';
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy: ', err);
            alert('Не удалось скопировать код.');
        });
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
});
