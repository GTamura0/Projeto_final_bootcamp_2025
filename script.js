// Dados dos cursos para as áreas de Saúde e Humanas
const courseData = {
    saude: {
        title: 'Área da Saúde — Unimar',
        html: `<p><strong>Principais cursos:</strong> Enfermagem, Fisioterapia, Nutrição, Farmácia.</p>
               <p><strong>Diferenciais:</strong> Hospital universitário, laboratórios, estágios garantidos e projetos comunitários.</p>
               <p><strong>Formato:</strong> Presencial com possibilidades de extensão e cursos de verão.</p>`
    },
    humanas: {
        title: 'Área de Humanas — Unimar',
        html: `<p><strong>Principais cursos:</strong> Administração, Pedagogia, Psicologia, Serviço Social.</p>
               <p><strong>Diferenciais:</strong> Projetos de extensão, estágios em escolas e empresas, formação para o mercado.</p>
               <p><strong>Competências:</strong> Comunicação, liderança, pesquisa e atuação comunitária.</p>`
    }
};

const cursosPorArea = {
    saude: [
        { nome: "Enfermagem", link: "https://oficial.unimar.br/cursos/enfermagem/" },
        { nome: "Fisioterapia", link: "https://oficial.unimar.br/cursos/fisioterapia/" },
        { nome: "Nutrição", link: "https://oficial.unimar.br/cursos/nutricao/" },
        { nome: "Farmácia", link: "https://oficial.unimar.br/cursos/farmacia/" }
    ],
    humanas: [
        { nome: "Administração", link: "https://oficial.unimar.br/cursos/administracao/" },
        { nome: "Ciências contábeis", link: "https://oficial.unimar.br/cursos/ciencias-contabeis/" },
        { nome: "Direito", link: "https://oficial.unimar.br/cursos/direito/" },
        { nome: "Publicidade e Propaganda", link: "https://oficial.unimar.br/cursos/publicidade-e-propaganda/" }
    ]
};

const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');

// Função para abrir modal com informações do curso
function openModal(courseKey) {
    const data = courseData[courseKey];
    if (!data) return;
    modalTitle.textContent = data.title;
    modalBody.innerHTML = data.html + `<p style="margin-top:12px"><a href='#' class='btn' style='text-decoration:none'>Inscreva-se</a> <button class='btn ghost' id='downloadSyllabus'>Baixar ementa</button></p>`;
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
    // Gerenciamento de foco
    modalClose.focus();

    const dl = document.getElementById('downloadSyllabus');
    if (dl) {
        dl.addEventListener('click', (e) => { e.preventDefault(); alert('Simulação: iniciando download da ementa em PDF...'); });
    }
}

// Nova função para mostrar lista de cursos
function openCourseList(area) {
    const cursos = cursosPorArea[area];
    if (!cursos) return;
    modalTitle.textContent = area === "saude" ? "Cursos/Bacharelados da Área da Saúde" : "Cursos/Bacharelados da Área de Humanas";
    modalBody.innerHTML = `<ul style="padding-left:0;list-style:none;">
        ${cursos.map(c =>
            `<li style="margin-bottom:14px;">
                <strong>${c.nome}</strong><br>
                <button class="btn" style="margin-top:4px;" onclick="window.open('${c.link}', '_blank')">Acessar site</button>
            </li>`
        ).join("")}
    </ul>`;
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
    modalClose.focus();
}

function closeModal() {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
}

document.addEventListener('click', (e) => {
    const more = e.target.closest('[data-action="more"]');
    if (more) {
        const card = more.closest('.card');
        const key = card.dataset.course;
        openModal(key);
        return;
    }
    const apply = e.target.closest('[data-action="apply"]');
    if (apply) {
        const card = apply.closest('.card');
        const key = card.dataset.course;
        alert('Abrir página de disciplinas para: ' + (card.querySelector('h3')?.textContent || key));
        return;
    }
    if (e.target === modal) closeModal();
});

modalClose.addEventListener('click', closeModal);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (modal.style.display === 'flex') closeModal();
    }
    if (e.key === 'Enter') {
        const active = document.activeElement;
        if (active && active.classList.contains('card')) {
            openModal(active.dataset.course);
        }
    }
});

document.querySelectorAll('.course-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.dataset.course === "saude" || btn.dataset.course === "humanas") {
            openCourseList(btn.dataset.course);
        } else {
            openModal(btn.dataset.course);
        }
    });
});
