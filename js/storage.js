const Storage = {
  prefix: 'tafeito_',

  get(key) {
    try { return JSON.parse(localStorage.getItem(this.prefix + key)); }
    catch { return null; }
  },

  set(key, value) {
    try { localStorage.setItem(this.prefix + key, JSON.stringify(value)); return true; }
    catch { return false; }
  },

  remove(key) {
    localStorage.removeItem(this.prefix + key);
  },

  getDados() {
    return this.get('dados') || {};
  },

  setDados(dados) {
    this.set('dados', dados);
  },

  updateDados(partial) {
    const dados = this.getDados();
    Object.assign(dados, partial);
    this.setDados(dados);
    return dados;
  },

  getProgresso() {
    return this.get('progresso') || { step: 0, total: 0 };
  },

  setProgresso(step, total) {
    this.set('progresso', { step, total });
  },

  getRascunho() {
    return this.get('rascunho');
  },

  setRascunho(rascunho) {
    this.set('rascunho', rascunho);
  },

  limparRascunho() {
    this.remove('rascunho');
    this.remove('dados');
    this.remove('progresso');
  }
};
