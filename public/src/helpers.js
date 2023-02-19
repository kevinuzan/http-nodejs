const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;
/**
 *
 *  Adiciona conjunto de elementos no local do template
 *
 * @param {Array} itensDoRecurso
 * @param {HTMLTemplateElement} template
 * @param {HTMLElement} localAddTemplate
 */
globalThis.adicionaItensNoLocalDoTemplate = function (itensDoRecurso, template, localAddTemplate) {
  itensDoRecurso.forEach((item) => {
    adicionaItemNoLocalDoTemplate(item, template, localAddTemplate);
  });
};

/**
 *
 *  Adiciona elemento no local do template
 *
 * @param {Object} item
 * @param {HTMLTemplateElement} template
 * @param {HTMLElement} localAddTemplate
 */
globalThis.adicionaItemNoLocalDoTemplate = function (item, template, localAddTemplate) {
  for (const property in item) {
    const itemValue = item[property];
    const htmlElement = template.content.querySelector(`[bind-to=${property}]`);

    if (isNull(htmlElement)) {
      continue;
    }

    if (htmlElement instanceof HTMLInputElement) {
      switch (true) {
        case htmlElement.type === 'text':
          htmlElement.value = itemValue
          break;
        case htmlElement.type === 'checkbox':
          htmlElement.checked = itemValue == 'true'
          break;
      }
    }
    if (htmlElement instanceof HTMLTextAreaElement) {

      switch (true) {

        case htmlElement.id === 'templateDados':
          console.log("oi")
          htmlElement.value = itemValue
          break;

      }
    }

    if (!htmlElement.hasAttribute('on-inner-html')) {
      console.error(`O elemento HTML vinculado a '${property}' precisar apresentar os atributos [bind-to] e [on-inner-html]`)
      continue;
    }

    htmlElement.innerHTML = itemValue
  }

  localAddTemplate.appendChild(template.content.cloneNode(true));
};

globalThis.isEmpty = function (value) {
  if (
    value === '' ||
    value === null ||
    typeof value === 'undefined' ||
    value === [] ||
    Object.keys(value).length === 0
  ) {
    return true
  }

  return false
}

globalThis.isNull = function (value) {
  if (
    value === null ||
    typeof value === 'undefined'
  ) {
    return true
  }

  return false
}

if (!Array.prototype.last) {
  Array.prototype.last = function () {
    return this[this.length - 1];
  };
};