const cursosPorArea = {
  saude: { title: 'Cursos da Área da Saúde', items: [
    { nome: 'Enfermagem', link: 'https://oficial.unimar.br/cursos/enfermagem/' },
    { nome: 'Fisioterapia', link: 'https://oficial.unimar.br/cursos/fisioterapia/' },
    { nome: 'Nutrição', link: 'https://oficial.unimar.br/cursos/nutricao/' },
    { nome: 'Farmácia', link: 'https://oficial.unimar.br/cursos/farmacia/' } ] },
  humanas: { title: 'Cursos da Área de Humanas', items: [
    { nome: 'Administração', link: 'https://oficial.unimar.br/cursos/administracao/' },
    { nome: 'Ciências Contábeis', link: 'https://oficial.unimar.br/cursos/ciencias-contabeis/' },
    { nome: 'Direito', link: 'https://oficial.unimar.br/cursos/direito/' },
    { nome: 'Publicidade e Propaganda', link: 'https://oficial.unimar.br/cursos/publicidade-e-propaganda/' } ] }
};
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');
let lastFocus = null;
function openCourseList(area) {
  if (area === 'ti') { window.location.href = 'tecnologia.html'; return; }
  const data = cursosPorArea[area];
  if (!data || !modal) return;
  lastFocus = document.activeElement;
  modalTitle.textContent = data.title;
  modalBody.innerHTML = '<ul>' + data.items.map(c =>
    '<li><strong>' + c.nome + '</strong><a class="btn btn-sm" href="' + c.link + '" target="_blank" rel="noopener">Acessar site</a></li>'
  ).join('') + '</ul>';
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  modalClose.focus();
}
function closeModal() {
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (lastFocus && lastFocus.focus) lastFocus.focus();
}
document.querySelectorAll('.course-card').forEach(btn => {
  btn.addEventListener('click', () => openCourseList(btn.dataset.course));
});
if (modalClose) modalClose.addEventListener('click', closeModal);
if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal && modal.classList.contains('open')) closeModal();
  if (e.key === 'Tab' && modal && modal.classList.contains('open')) {
    const f = modal.querySelectorAll('button, a[href]');
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
});
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');
if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const open = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    navToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  });
  mainNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mainNav.classList.remove('open')));
}
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('fName');
    const mail = document.getElementById('fMail');
    const nameErr = document.getElementById('fNameErr');
    const mailErr = document.getElementById('fMailErr');
    let ok = true;
    nameErr.textContent = ''; mailErr.textContent = '';
    if (!name.value.trim() || name.value.trim().length < 2) { nameErr.textContent = 'Informe seu nome.'; ok = false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail.value.trim())) { mailErr.textContent = 'Informe um e-mail válido.'; ok = false; }
    if (!ok) { (!nameErr.textContent ? mail : name).focus(); return; }
    document.getElementById('formOk').hidden = false;
    form.reset();
    name.focus();
  });
}
