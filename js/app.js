/* ============================================
   Tá Feito v2 — App Principal
   ============================================ */

let state = {
  step: 0,
  totalSteps: 0,
  dados: Storage.getDados(),
  modelo: null,
  tipoDoc: 'cv',
  editando: false,
  experienciaCount: 0
};

function init() {
  Router.init();
  renderScreens();
  verificarRascunho();
  Router.go('home');
}

function renderScreens() {
  const content = document.getElementById('app-content');
  content.innerHTML = `
    <div id="screen-home" class="screen active"></div>
    <div id="screen-documentos" class="screen"></div>
    <div id="screen-perfil" class="screen"></div>
    <div id="screen-planos" class="screen"></div>
    <div id="screen-editor" class="screen"></div>
    <div id="screen-preview" class="screen"></div>
    <div id="screen-pagamento" class="screen"></div>
    <div id="screen-sucesso" class="screen"></div>
  `;
  renderHome();
  renderDocumentos();
  renderPerfil();
  renderPlanos();
}

function navegar(route) {
  Router.go(route);
}

function atualizarProgresso(step, total) {
  const pct = total > 0 ? Math.min(100, Math.round((step / total) * 100)) : 0;
  const fill = document.getElementById('progress-fill');
  if (fill) fill.style.width = pct + '%';
  Storage.setProgresso(step, total);
}

function showToast(msg, type = 'info') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = msg;
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 300); }, 3000);
}

/* ============================================
   HOME
   ============================================ */
function renderHome() {
  const el = document.getElementById('screen-home');
  el.innerHTML = `
    <div class="home-container" style="flex:1;display:flex;flex-direction:column;justify-content:center;gap:var(--space-lg);padding:var(--space-lg) 0;">
      <div style="text-align:center;">
        <h1 style="font-family:var(--font-heading);font-size:28px;line-height:1.3;margin-bottom:var(--space-md);">
          O teu documento profissional,<br>em minutos.
        </h1>
        <p style="color:var(--color-text-secondary);font-size:15px;line-height:1.6;margin-bottom:var(--space-lg);">
          Cria currículos, declarações, cartas e documentos profissionais com modelos premium. Tu dizes. Nós fazemos.
        </p>
      </div>
      <div class="home-actions" style="display:flex;flex-direction:column;gap:var(--space-md);">
        <button class="btn btn-primary btn-full btn-lg" onclick="iniciarCriacao()">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
          Começar agora
        </button>
      </div>
      <div style="display:flex;justify-content:center;gap:var(--space-xl);margin-top:var(--space-xl);padding:var(--space-lg);background:var(--color-surface);border-radius:var(--radius-md);border:1px solid var(--color-border);">
        <div style="text-align:center;">
          <div style="font-size:24px;font-weight:700;color:var(--color-primary);" id="stat-docs">0</div>
          <div style="font-size:12px;color:var(--color-text-secondary);">documentos criados</div>
        </div>
        <div style="text-align:center;">
          <div style="font-size:24px;font-weight:700;color:var(--color-primary);">10</div>
          <div style="font-size:12px;color:var(--color-text-secondary);">modelos premium</div>
        </div>
        <div style="text-align:center;">
          <div style="font-size:24px;font-weight:700;color:var(--color-primary);">🇦🇴</div>
          <div style="font-size:12px;color:var(--color-text-secondary);">Feito em Angola</div>
        </div>
      </div>
    </div>
  `;
  animarContador();
}

function animarContador() {
  let count = 0;
  const el = document.getElementById('stat-docs');
  if (!el) return;
  const target = 152;
  const interval = setInterval(() => {
    count += Math.ceil((target - count) / 8);
    el.textContent = count;
    if (count >= target) { el.textContent = target; clearInterval(interval); }
  }, 60);
}

function verificarRascunho() {
  const rascunho = Storage.getRascunho();
  if (!rascunho) return;
  const el = document.getElementById('screen-home');
  if (!el) return;
  const actions = el.querySelector('.home-actions');
  if (!actions) return;
  const btn = document.createElement('button');
  btn.className = 'btn btn-outline btn-full';
  btn.innerHTML = '📋 Continuar rascunho anterior';
  btn.onclick = () => {
    state.dados = rascunho.dados || {};
    state.modelo = rascunho.modelo;
    state.step = rascunho.step || 0;
    Storage.setDados(state.dados);
    iniciarEditor();
  };
  actions.appendChild(btn);
}

/* ============================================
   DOCUMENTOS
   ============================================ */
function renderDocumentos() {
  const el = document.getElementById('screen-documentos');
  el.innerHTML = `
    <div style="padding:var(--space-md) 0;">
      <h2 style="font-family:var(--font-heading);font-size:22px;margin-bottom:var(--space-md);">Criar Documento</h2>
      <p style="color:var(--color-text-secondary);margin-bottom:var(--space-lg);font-size:14px;">Escolhe o tipo de documento que precisas criar.</p>
      <div style="display:flex;flex-direction:column;gap:var(--space-md);">
        <div class="card card-interactive" onclick="iniciarCriacao('cv')" style="border:2px solid var(--color-primary);">
          <div style="display:flex;align-items:center;gap:var(--space-md);">
            <div style="width:48px;height:48px;background:var(--color-primary);border-radius:var(--radius-md);display:flex;align-items:center;justify-content:center;color:white;font-size:20px;">📄</div>
            <div style="flex:1;">
              <div style="font-weight:600;font-size:16px;">Currículo (CV)</div>
              <div style="font-size:13px;color:var(--color-text-secondary);">5 modelos premium • 1000 Kz</div>
            </div>
            <div class="badge">Popular</div>
          </div>
        </div>
        ${CONFIG.models.docTypes.map(t => `
          <div class="card card-interactive" onclick="iniciarCriacao('${t.id}')">
            <div style="display:flex;align-items:center;gap:var(--space-md);">
              <div style="width:44px;height:44px;background:var(--color-surface-hover);border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center;font-size:18px;">📄</div>
              <div>
                <div style="font-weight:500;">${t.name}</div>
                <div style="font-size:12px;color:var(--color-text-secondary);">750 Kz</div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

/* ============================================
   PERFIL
   ============================================ */
function renderPerfil() {
  const el = document.getElementById('screen-perfil');
  const d = state.dados;
  el.innerHTML = `
    <div style="padding:var(--space-md) 0;">
      <h2 style="font-family:var(--font-heading);font-size:22px;margin-bottom:var(--space-lg);">Meu Perfil</h2>
      <div style="display:flex;flex-direction:column;gap:var(--space-md);">
        <div class="card">
          <label style="font-size:13px;color:var(--color-text-secondary);margin-bottom:4px;display:block;">Nome completo</label>
          <input class="input" id="perfil-nome" value="${escapeHtml(d.nome||'')}" placeholder="Teu nome" oninput="salvarPerfil()">
        </div>
        <div class="card">
          <label style="font-size:13px;color:var(--color-text-secondary);margin-bottom:4px;display:block;">E-mail</label>
          <input class="input" id="perfil-email" value="${escapeHtml(d.email||'')}" placeholder="teu@email.com" type="email" oninput="salvarPerfil()">
        </div>
        <div class="card">
          <label style="font-size:13px;color:var(--color-text-secondary);margin-bottom:4px;display:block;">Telefone</label>
          <input class="input" id="perfil-telefone" value="${escapeHtml(d.telefone||'')}" placeholder="923 456 789" type="tel" oninput="salvarPerfil()">
        </div>
        <div class="card">
          <label style="font-size:13px;color:var(--color-text-secondary);margin-bottom:4px;display:block;">Profissão</label>
          <input class="input" id="perfil-profissao" value="${escapeHtml(d.profissao||'')}" placeholder="Tua profissão" oninput="salvarPerfil()">
        </div>
        <button class="btn btn-outline btn-full" onclick="Storage.limparRascunho();showToast('Dados limpos','success')" style="margin-top:var(--space-md);">
          Limpar dados
        </button>
      </div>
    </div>
  `;
}

function salvarPerfil() {
  const dados = {
    nome: document.getElementById('perfil-nome')?.value || '',
    email: document.getElementById('perfil-email')?.value || '',
    telefone: document.getElementById('perfil-telefone')?.value || '',
    profissao: document.getElementById('perfil-profissao')?.value || ''
  };
  state.dados = Storage.updateDados(dados);
}

/* ============================================
   PLANOS
   ============================================ */
function renderPlanos() {
  const el = document.getElementById('screen-planos');
  el.innerHTML = `
    <div style="padding:var(--space-md) 0;">
      <h2 style="font-family:var(--font-heading);font-size:22px;margin-bottom:var(--space-sm);">Planos</h2>
      <p style="color:var(--color-text-secondary);font-size:14px;margin-bottom:var(--space-lg);">Escolhe o plano ideal para ti.</p>
      <div style="display:flex;flex-direction:column;gap:var(--space-md);">
        <div class="card card-interactive" onclick="selecionarPlano('avulso')">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <div>
              <div style="font-weight:600;font-size:16px;">Avulso</div>
              <div style="font-size:13px;color:var(--color-text-secondary);">Paga por documento</div>
            </div>
            <div style="text-align:right;">
              <div style="font-size:20px;font-weight:700;color:var(--color-primary);">1 000 Kz</div>
              <div style="font-size:12px;color:var(--color-text-secondary);">por CV</div>
            </div>
          </div>
        </div>
        <div class="card card-interactive" onclick="selecionarPlano('mensal')" style="border:2px solid var(--color-accent);">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <div>
              <div style="font-weight:600;font-size:16px;">Mensal</div>
              <div style="font-size:13px;color:var(--color-text-secondary);">Documentos ilimitados</div>
            </div>
            <div style="text-align:right;">
              <div style="font-size:20px;font-weight:700;color:var(--color-accent);">500 Kz</div>
              <div style="font-size:12px;color:var(--color-text-secondary);">por mês</div>
            </div>
          </div>
          <div class="badge" style="position:absolute;top:-8px;right:var(--space-md);">Melhor valor</div>
        </div>
      </div>
    </div>
  `;
}

function selecionarPlano(tipo) {
  showToast(`Plano ${tipo === 'avulso' ? 'Avulso' : 'Mensal'} seleccionado`, 'success');
}

/* ============================================
   INICIAR CRIAÇÃO
   ============================================ */
function iniciarCriacao(tipo) {
  state.tipoDoc = tipo || 'cv';
  state.step = 0;
  state.dados = Storage.getDados();
  state.experienciaCount = 0;

  if (tipo === 'cv' || !tipo) {
    mostrarGaleriaModelos();
  } else {
    iniciarEditor();
  }
}

function mostrarGaleriaModelos() {
  const content = document.getElementById('app-content');
  content.innerHTML = `
    <div id="screen-galeria" class="screen active" style="padding:var(--space-md) 0;">
      <h2 style="font-family:var(--font-heading);font-size:22px;margin-bottom:var(--space-sm);">Escolhe o teu estilo</h2>
      <p style="color:var(--color-text-secondary);font-size:14px;margin-bottom:var(--space-lg);">Cada modelo tem personalidade própria. Desliza para ver todos.</p>
      <div style="display:flex;flex-direction:column;gap:var(--space-md);">
        ${CONFIG.models.cv.map((m, i) => `
          <div class="card card-interactive" onclick="selecionarModelo('${m.id}')" style="border-left:4px solid ${m.color};">
            <div style="display:flex;align-items:center;gap:var(--space-md);">
              <div style="width:44px;height:44px;background:${m.color};border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center;color:white;font-weight:700;font-size:16px;">${m.name[0]}</div>
              <div style="flex:1;">
                <div style="font-weight:600;">${m.name}</div>
                <div style="font-size:13px;color:var(--color-text-secondary);">${m.desc}</div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function selecionarModelo(id) {
  state.modelo = id;
  state.step = 0;
  iniciarEditor();
}

/* ============================================
   EDITOR — One question per screen
   ============================================ */
function iniciarEditor() {
  const steps = CONFIG.models.cv;
  state.totalSteps = steps.length;
  state.step = 0;
  state.dados = Storage.getDados();

  Router.go('editor');
  renderStep();
}

function renderStep() {
  const steps = CONFIG.models.cv;
  const step = steps[state.step];
  if (!step) { finalizarEditor(); return; }

  atualizarProgresso(state.step, state.totalSteps);

  const el = document.getElementById('screen-editor');
  el.innerHTML = `
    <div style="flex:1;display:flex;flex-direction:column;justify-content:center;padding:var(--space-md) 0;animation:slideUp var(--transition-normal) ease;">
      <div style="font-size:13px;color:var(--color-text-secondary);margin-bottom:var(--space-sm);">Passo ${state.step + 1} de ${state.totalSteps}</div>
      <h3 style="font-family:var(--font-heading);font-size:20px;margin-bottom:var(--space-lg);">${step.question}</h3>
      ${renderCampo(step)}
      <div style="display:flex;gap:var(--space-sm);margin-top:var(--space-lg);">
        ${state.step > 0 ? '<button class="btn btn-ghost" onclick="stepAnterior()">Voltar</button>' : ''}
        <button class="btn btn-primary btn-full" onclick="stepSeguinte()" id="btn-seguinte">
          ${state.step < state.totalSteps - 1 ? 'Seguir' : 'Finalizar'}
        </button>
      </div>
    </div>
  `;

  const input = el.querySelector('input, textarea');
  if (input) {
    input.focus();
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); stepSeguinte(); }
    });
  }
}

function renderCampo(step) {
  const val = state.dados[step.field] || '';
  switch (step.type) {
    case 'textarea':
      return `
        <textarea class="input" id="input-${step.field}" rows="4" placeholder="${step.placeholder||''}">${escapeHtml(val)}</textarea>
        ${step.help ? `
          <div style="display:flex;gap:var(--space-sm);margin-top:var(--space-sm);">
            <button class="btn btn-sm btn-ghost" onclick="ajudarIA('${step.field}')">✨ Melhorar com IA</button>
            <button class="btn btn-sm btn-ghost" onclick="ditarVoz('${step.field}')">🎤 Ditar</button>
          </div>
        ` : ''}
      `;
    case 'photo':
      return `
        <div style="display:flex;flex-direction:column;align-items:center;gap:var(--space-md);">
          <div id="foto-preview" style="width:120px;height:120px;border-radius:50%;background:var(--color-surface-hover);border:2px dashed var(--color-border);display:flex;align-items:center;justify-content:center;overflow:hidden;font-size:40px;color:var(--color-text-secondary);">
            ${state.dados.foto ? `<img src="${state.dados.foto}" style="width:100%;height:100%;object-fit:cover;">` : '📷'}
          </div>
          <input type="file" accept="image/*" id="input-foto" style="display:none" onchange="processarFoto(event)">
          <button class="btn btn-outline btn-sm" onclick="document.getElementById('input-foto').click()">${state.dados.foto ? 'Trocar foto' : 'Adicionar foto'}</button>
          <button class="btn btn-ghost btn-sm" onclick="stepSeguinte()">Saltar por agora</button>
        </div>
      `;
    default:
      return `
        <input class="input" id="input-${step.field}" type="${step.type||'text'}" value="${escapeHtml(val)}" placeholder="${step.placeholder||''}" autocomplete="off">
        ${step.help ? `
          <div style="display:flex;gap:var(--space-sm);margin-top:var(--space-sm);">
            <button class="btn btn-sm btn-ghost" onclick="ajudarIA('${step.field}')">✨ Melhorar com IA</button>
            <button class="btn btn-sm btn-ghost" onclick="ditarVoz('${step.field}')">🎤 Ditar</button>
          </div>
        ` : ''}
      `;
  }
}

function stepSeguinte() {
  const steps = CONFIG.models.cv;
  const step = steps[state.step];
  if (!step) return;

  const input = document.getElementById('input-' + step.field);
  if (input) {
    const val = input.value.trim();
    if (!val && !step.optional) {
      input.style.borderColor = 'var(--color-error)';
      input.focus();
      input.addEventListener('input', function handler() {
        input.style.borderColor = '';
        input.removeEventListener('input', handler);
      }, { once: true });
      return;
    }
    state.dados[step.field] = val;
    Storage.updateDados({ [step.field]: val });
  }

  state.step++;
  if (state.step >= state.totalSteps) {
    finalizarEditor();
  } else {
    renderStep();
  }
}

function stepAnterior() {
  if (state.step > 0) {
    state.step--;
    renderStep();
  }
}

function finalizarEditor() {
  Storage.setDados(state.dados);
  Storage.setRascunho({ dados: state.dados, modelo: state.modelo, step: state.step });
  atualizarProgresso(state.totalSteps, state.totalSteps);
  mostrarPreview();
}

/* ============================================
   PREVIEW
   ============================================ */
function mostrarPreview() {
  const el = document.getElementById('screen-preview');
  const d = state.dados;
  el.innerHTML = `
    <div style="padding:var(--space-md) 0;text-align:center;">
      <div style="font-size:40px;margin-bottom:var(--space-md);">🎉</div>
      <h2 style="font-family:var(--font-heading);font-size:22px;margin-bottom:var(--space-sm);">O teu CV está pronto, ${d.nome || '!'}</h2>
      <p style="color:var(--color-text-secondary);font-size:14px;margin-bottom:var(--space-lg);">Vê como ficou. Se gostaste, descarrega sem marca de água.</p>
      <div class="card" style="background:var(--color-surface);padding:var(--space-lg);margin-bottom:var(--space-lg);text-align:left;font-size:13px;line-height:1.8;position:relative;overflow:hidden;">
        <div style="position:absolute;top:0;left:0;right:0;bottom:0;background:repeating-linear-gradient(45deg,transparent,transparent 20px,rgba(200,168,76,0.05) 20px,rgba(200,168,76,0.05) 40px);pointer-events:none;"></div>
        <div style="position:relative;z-index:1;opacity:0.9;">
          <div style="font-family:var(--font-heading);font-size:18px;font-weight:700;margin-bottom:4px;">${escapeHtml(d.nome||'Teu Nome')}</div>
          <div style="font-size:13px;color:var(--color-text-secondary);margin-bottom:var(--space-md);">${escapeHtml(d.profissao||'Tua Profissão')}</div>
          <hr style="border:none;border-top:1px solid var(--color-border);margin:var(--space-sm) 0;">
          <div style="margin-top:var(--space-sm);"><strong>Contacto:</strong> ${escapeHtml(d.email||'')} | ${escapeHtml(d.telefone||'')}</div>
          ${d.resumo ? `<div style="margin-top:var(--space-sm);"><strong>Resumo:</strong> ${escapeHtml(d.resumo)}</div>` : ''}
          ${d.experiencia_empresa ? `<div style="margin-top:var(--space-sm);"><strong>Experiência:</strong> ${escapeHtml(d.experiencia_empresa)} — ${escapeHtml(d.experiencia_cargo||'')}</div>` : ''}
          ${d.formacao ? `<div style="margin-top:var(--space-sm);"><strong>Formação:</strong> ${escapeHtml(d.formacao)}</div>` : ''}
          ${d.competencias ? `<div style="margin-top:var(--space-sm);"><strong>Competências:</strong> ${escapeHtml(d.competencias)}</div>` : ''}
        </div>
        <div style="position:absolute;bottom:0;left:0;right:0;padding:var(--space-md);background:linear-gradient(transparent, var(--color-surface));">
          <button class="btn btn-accent btn-full btn-lg" onclick="irPagamento()">
            Descarregar CV — 1 000 Kz
          </button>
        </div>
      </div>
    </div>
  `;
}

function irPagamento() {
  Router.go('pagamento');
  renderPagamento();
}

/* ============================================
   PAGAMENTO
   ============================================ */
function renderPagamento() {
  const el = document.getElementById('screen-pagamento');
  el.innerHTML = `
    <div style="padding:var(--space-md) 0;text-align:center;">
      <div style="font-size:36px;margin-bottom:var(--space-md);">🔒</div>
      <h2 style="font-family:var(--font-heading);font-size:22px;margin-bottom:var(--space-sm);">O teu CV profissional está pronto</h2>
      <p style="color:var(--color-text-secondary);font-size:14px;margin-bottom:var(--space-lg);">1 000 Kz para descarregar sem marca de água</p>
      <div class="card" style="margin-bottom:var(--space-lg);text-align:left;">
        <h3 style="font-size:16px;margin-bottom:var(--space-md);">Pagamento Multicaixa Express</h3>
        <div style="display:flex;flex-direction:column;gap:var(--space-sm);">
          <label style="font-size:13px;color:var(--color-text-secondary);">Número de telefone (Multicaixa)</label>
          <input class="input" id="pagamento-telefone" placeholder="923 456 789" type="tel">
          <label style="font-size:13px;color:var(--color-text-secondary);">Código de confirmação</label>
          <input class="input" id="pagamento-codigo" placeholder="Código recebido por SMS" type="text">
          <button class="btn btn-sm btn-ghost" onclick="showToast('Código enviado por SMS','success')" style="align-self:flex-start;">Enviar código</button>
        </div>
      </div>
      <button class="btn btn-accent btn-full btn-lg" onclick="confirmarPagamento()">
        Pagar 1 000 Kz
      </button>
      <button class="btn btn-ghost btn-full" onclick="navegar('home')" style="margin-top:var(--space-sm);">
        Voltar ao início
      </button>
    </div>
  `;
}

function confirmarPagamento() {
  showToast('Pagamento confirmado! A descarregar...', 'success');
  setTimeout(() => {
    Router.go('sucesso');
    renderSucesso();
  }, 1500);
}

/* ============================================
   SUCESSO
   ============================================ */
function renderSucesso() {
  const el = document.getElementById('screen-sucesso');
  const d = state.dados;
  el.innerHTML = `
    <div style="padding:var(--space-md) 0;text-align:center;display:flex;flex-direction:column;justify-content:center;min-height:100%;">
      <div style="font-size:60px;margin-bottom:var(--space-md);">🎉</div>
      <h2 style="font-family:var(--font-heading);font-size:24px;margin-bottom:var(--space-sm);">Boa sorte na candidatura, ${d.nome || '!'}</h2>
      <p style="color:var(--color-text-secondary);font-size:14px;margin-bottom:var(--space-xl);">O teu CV está pronto e sem marca de água.</p>
      <div style="display:flex;flex-direction:column;gap:var(--space-md);">
        <button class="btn btn-accent btn-full btn-lg" onclick="showToast('PDF descarregado!','success')">
          📥 Descarregar PDF
        </button>
        <button class="btn btn-outline btn-full" onclick="showToast('Link copiado!','success')">
          📤 Partilhar no WhatsApp
        </button>
        <button class="btn btn-ghost btn-full" onclick="navegar('home')">
          Voltar ao início
        </button>
      </div>
    </div>
  `;
}

/* ============================================
   HELPERS
   ============================================ */
function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function ajudarIA(campo) {
  showToast('✨ A melhorar texto com IA...', 'info');
  setTimeout(() => {
    const input = document.getElementById('input-' + campo);
    if (input && input.value.trim().length > 3) {
      input.value = input.value + ' [melhorado por IA]';
      showToast('Texto melhorado!', 'success');
    } else {
      showToast('Escreve primeiro algum texto para melhorar', 'info');
    }
  }, 800);
}

function ditarVoz(campo) {
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    showToast('Reconhecimento de voz não disponível neste browser', 'error');
    return;
  }
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SR();
  recognition.lang = 'pt-AO';
  recognition.interimResults = true;
  const input = document.getElementById('input-' + campo);
  if (!input) return;
  recognition.onresult = (e) => {
    input.value = e.results[0][0].transcript;
  };
  recognition.start();
  showToast('🎤 A ouvir... fala normalmente', 'info');
}

function processarFoto(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (ev) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let w = img.width, h = img.height;
      const max = 400;
      if (w > max || h > max) {
        if (w > h) { h = h * max / w; w = max; }
        else { w = w * max / h; h = max; }
      }
      canvas.width = w; canvas.height = h;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, w, h);
      state.dados.foto = canvas.toDataURL('image/jpeg', 0.85);
      Storage.updateDados({ foto: state.dados.foto });
      const preview = document.getElementById('foto-preview');
      if (preview) preview.innerHTML = `<img src="${state.dados.foto}" style="width:100%;height:100%;object-fit:cover;">`;
      showToast('Foto adicionada!', 'success');
    };
    img.src = URL.createObjectURL(file);
  };
  reader.readAsDataURL(file);
}

/* ============================================
   INICIAR
   ============================================ */
document.addEventListener('DOMContentLoaded', init);

