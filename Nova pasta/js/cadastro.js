/**
 * ==========================================================================
 * BioÓleo Digital — Plataforma de Gestão Ambiental
 * Script de Interações e Validação: Tela de Cadastro
 * ==========================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  const cadastroForm = document.getElementById("cadastroForm");
  const nomeInput = document.getElementById("nome");
  const emailInput = document.getElementById("email");
  const telefoneInput = document.getElementById("telefone");
  const tipoSelect = document.getElementById("tipo");
  const senhaInput = document.getElementById("senha");
  const confirmarSenhaInput = document.getElementById("confirmarSenha");

  const toggleSenhaBtn = document.getElementById("toggleSenhaBtn");
  const toggleConfirmarSenhaBtn = document.getElementById("toggleConfirmarSenhaBtn");

  const passwordStrengthBox = document.getElementById("passwordStrengthBox");
  const passwordStrengthFill = document.getElementById("passwordStrengthFill");
  const passwordStrengthText = document.getElementById("passwordStrengthText");

  const alertBox = document.getElementById("alertBox");

  // Ícones SVG para alternar a exibição da senha
  const eyeOpenIcon = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
    </svg>`;

  const eyeClosedIcon = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.44-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>
    </svg>`;

  // 1. Alternância de exibição de senha (Senha Principal)
  if (toggleSenhaBtn && senhaInput) {
    toggleSenhaBtn.addEventListener("click", () => {
      const isPassword = senhaInput.getAttribute("type") === "password";
      senhaInput.setAttribute("type", isPassword ? "text" : "password");
      toggleSenhaBtn.innerHTML = isPassword ? eyeClosedIcon : eyeOpenIcon;
      toggleSenhaBtn.setAttribute(
        "aria-label",
        isPassword ? "Ocultar senha" : "Ver senha"
      );
      senhaInput.focus();
    });
  }

  // 2. Alternância de exibição de senha (Confirmação)
  if (toggleConfirmarSenhaBtn && confirmarSenhaInput) {
    toggleConfirmarSenhaBtn.addEventListener("click", () => {
      const isPassword =
        confirmarSenhaInput.getAttribute("type") === "password";
      confirmarSenhaInput.setAttribute(
        "type",
        isPassword ? "text" : "password"
      );
      toggleConfirmarSenhaBtn.innerHTML = isPassword
        ? eyeClosedIcon
        : eyeOpenIcon;
      toggleConfirmarSenhaBtn.setAttribute(
        "aria-label",
        isPassword ? "Ocultar confirmação" : "Ver confirmação"
      );
      confirmarSenhaInput.focus();
    });
  }

  // 3. Máscara Automática de Telefone no formato brasileiro (00) 00000-0000
  if (telefoneInput) {
    telefoneInput.addEventListener("input", (e) => {
      let v = e.target.value.replace(/\D/g, "");
      if (v.length > 11) v = v.substring(0, 11);

      if (v.length > 10) {
        // Celular com 9 dígitos
        v = v.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
      } else if (v.length > 6) {
        // Fixo ou celular digitando
        v = v.replace(/^(\d{2})(\d{4})(\d{0,4})$/, "($1) $2-$3");
      } else if (v.length > 2) {
        v = v.replace(/^(\d{2})(\d{0,5})$/, "($1) $2");
      } else if (v.length > 0) {
        v = v.replace(/^(\d*)$/, "($1");
      }
      e.target.value = v;
    });
  }

  // 4. Utilitários de Feedback Visual nos Campos
  function setFieldError(input, message) {
    const wrapper = input.closest(".input-wrapper") || input;
    const errorSpan = input.closest(".form-group").querySelector(".field-error");

    if (wrapper.classList.contains("input-wrapper")) {
      wrapper.classList.add("is-invalid");
      wrapper.classList.remove("is-valid");
    } else {
      input.classList.add("is-invalid");
      input.classList.remove("is-valid");
    }

    if (errorSpan) {
      errorSpan.textContent = message;
      errorSpan.classList.add("show");
    }
  }

  function clearFieldError(input) {
    const wrapper = input.closest(".input-wrapper") || input;
    const errorSpan = input.closest(".form-group").querySelector(".field-error");

    if (wrapper.classList.contains("input-wrapper")) {
      wrapper.classList.remove("is-invalid");
      wrapper.classList.add("is-valid");
    } else {
      input.classList.remove("is-invalid");
      input.classList.add("is-valid");
    }

    if (errorSpan) {
      errorSpan.textContent = "";
      errorSpan.classList.remove("show");
    }
  }

  function showAlert(message, type = "error") {
    if (!alertBox) return;

    alertBox.className = `alert-box alert-box--${type} show`;
    const iconSvg =
      type === "success"
        ? `<svg class="alert-box__icon" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`
        : type === "info"
        ? `<svg class="alert-box__icon" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>`
        : `<svg class="alert-box__icon" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>`;

    alertBox.innerHTML = `${iconSvg}<div>${message}</div>`;
    alertBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function hideAlert() {
    if (alertBox) {
      alertBox.className = "alert-box";
      alertBox.innerHTML = "";
    }
  }

  // 5. Validação de Força de Senha
  function avaliarForcaSenha(senha) {
    if (!senha) return { score: 0, text: "", classe: "" };

    let score = 0;
    if (senha.length >= 6) score += 1;
    if (senha.length >= 8) score += 1;
    if (/[A-Z]/.test(senha) && /[a-z]/.test(senha)) score += 1;
    if (/[0-9]/.test(senha)) score += 1;
    if (/[^A-Za-z0-9]/.test(senha)) score += 1;

    if (score <= 2) {
      return { score: 1, text: "Força da senha: Fraca (adicione letras e números)", classe: "weak" };
    } else if (score <= 3) {
      return { score: 2, text: "Força da senha: Média", classe: "medium" };
    } else {
      return { score: 3, text: "Força da senha: Forte e segura!", classe: "strong" };
    }
  }

  if (senhaInput && passwordStrengthBox) {
    senhaInput.addEventListener("input", () => {
      const val = senhaInput.value;
      if (!val) {
        passwordStrengthBox.classList.remove("show");
        return;
      }
      passwordStrengthBox.classList.add("show");
      const forca = avaliarForcaSenha(val);
      passwordStrengthFill.className = `password-strength__fill ${forca.classe}`;
      passwordStrengthText.textContent = forca.text;
    });
  }

  // 6. Regras de Validação Individual
  function validarNome(valor) {
    const trimmed = valor.trim();
    if (!trimmed) return "Por favor, digite seu nome completo.";
    if (trimmed.length < 3) return "O nome deve ter pelo menos 3 letras.";
    if (!trimmed.includes(" ")) {
      return "Informe nome e sobrenome para facilitar a identificação.";
    }
    return "";
  }

  function validarEmail(valor) {
    const trimmed = valor.trim();
    if (!trimmed) return "Por favor, informe seu e-mail institucional ou pessoal.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
      return "Formato de e-mail inválido. Exemplo: contato@restaurante.com";
    }
    return "";
  }

  function validarTelefone(valor) {
    const digits = valor.replace(/\D/g, "");
    if (!digits) return "Informe um número de telefone ou WhatsApp.";
    if (digits.length < 10) return "Informe um telefone válido com DDD (ex: 44 99999-9999).";
    return "";
  }

  function validarTipoPerfil(valor) {
    if (!valor) return "Selecione o tipo de perfil para o cadastro.";
    return "";
  }

  function validarNovaSenha(valor) {
    if (!valor) return "Crie uma senha de acesso.";
    if (valor.length < 6) return "A senha deve conter pelo menos 6 caracteres.";
    return "";
  }

  function validarConfirmacaoSenha(senha, confirmacao) {
    if (!confirmacao) return "Por favor, confirme a sua senha.";
    if (senha !== confirmacao) return "As senhas não coincidem. Digite a mesma senha.";
    return "";
  }

  // Listeners de tempo real para cada campo
  if (nomeInput) {
    nomeInput.addEventListener("input", () => {
      const err = validarNome(nomeInput.value);
      if (err) setFieldError(nomeInput, err);
      else {
        clearFieldError(nomeInput);
        hideAlert();
      }
    });
    nomeInput.addEventListener("blur", () => {
      const err = validarNome(nomeInput.value);
      if (err) setFieldError(nomeInput, err);
    });
  }

  if (emailInput) {
    emailInput.addEventListener("input", () => {
      const err = validarEmail(emailInput.value);
      if (err) setFieldError(emailInput, err);
      else {
        clearFieldError(emailInput);
        hideAlert();
      }
    });
    emailInput.addEventListener("blur", () => {
      const err = validarEmail(emailInput.value);
      if (err) setFieldError(emailInput, err);
    });
  }

  if (telefoneInput) {
    telefoneInput.addEventListener("blur", () => {
      const err = validarTelefone(telefoneInput.value);
      if (err) setFieldError(telefoneInput, err);
      else clearFieldError(telefoneInput);
    });
  }

  if (tipoSelect) {
    tipoSelect.addEventListener("change", () => {
      const err = validarTipoPerfil(tipoSelect.value);
      if (err) setFieldError(tipoSelect, err);
      else clearFieldError(tipoSelect);
    });
  }

  if (senhaInput) {
    senhaInput.addEventListener("input", () => {
      const err = validarNovaSenha(senhaInput.value);
      if (err) setFieldError(senhaInput, err);
      else clearFieldError(senhaInput);

      if (confirmarSenhaInput.value) {
        const errConf = validarConfirmacaoSenha(senhaInput.value, confirmarSenhaInput.value);
        if (errConf) setFieldError(confirmarSenhaInput, errConf);
        else clearFieldError(confirmarSenhaInput);
      }
    });
    senhaInput.addEventListener("blur", () => {
      const err = validarNovaSenha(senhaInput.value);
      if (err) setFieldError(senhaInput, err);
    });
  }

  if (confirmarSenhaInput) {
    confirmarSenhaInput.addEventListener("input", () => {
      const err = validarConfirmacaoSenha(senhaInput.value, confirmarSenhaInput.value);
      if (err) setFieldError(confirmarSenhaInput, err);
      else {
        clearFieldError(confirmarSenhaInput);
        hideAlert();
      }
    });
    confirmarSenhaInput.addEventListener("blur", () => {
      const err = validarConfirmacaoSenha(senhaInput.value, confirmarSenhaInput.value);
      if (err) setFieldError(confirmarSenhaInput, err);
    });
  }

  // 7. Submissão do Formulário de Cadastro
  if (cadastroForm) {
    cadastroForm.addEventListener("submit", (e) => {
      e.preventDefault();
      hideAlert();

      const errNome = validarNome(nomeInput.value);
      const errEmail = validarEmail(emailInput.value);
      const errTel = validarTelefone(telefoneInput.value);
      const errTipo = validarTipoPerfil(tipoSelect?.value || "");
      const errSenha = validarNovaSenha(senhaInput.value);
      const errConf = validarConfirmacaoSenha(senhaInput.value, confirmarSenhaInput.value);

      let temErro = false;

      if (errNome) { setFieldError(nomeInput, errNome); temErro = true; } else { clearFieldError(nomeInput); }
      if (errEmail) { setFieldError(emailInput, errEmail); temErro = true; } else { clearFieldError(emailInput); }
      if (errTel) { setFieldError(telefoneInput, errTel); temErro = true; } else { clearFieldError(telefoneInput); }
      if (errTipo && tipoSelect) { setFieldError(tipoSelect, errTipo); temErro = true; } else if (tipoSelect) { clearFieldError(tipoSelect); }
      if (errSenha) { setFieldError(senhaInput, errSenha); temErro = true; } else { clearFieldError(senhaInput); }
      if (errConf) { setFieldError(confirmarSenhaInput, errConf); temErro = true; } else { clearFieldError(confirmarSenhaInput); }

      if (temErro) {
        showAlert("Corrija os erros assinalados no formulário antes de prosseguir.");
        return;
      }

      // Validação concluída; os dados são processados pelo backend via submissão POST do formulário
      hideAlert();
    });
  }
});
