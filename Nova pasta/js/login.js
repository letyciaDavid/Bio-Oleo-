/**
 * BioÓleo Digital — Plataforma de Gestão Ambiental
 * Script de Interações e Validação: Tela de Login
 */

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const emailInput = document.getElementById("email");
  const senhaInput = document.getElementById("senha");
  const toggleSenhaBtn = document.getElementById("toggleSenhaBtn");
  const alertBox = document.getElementById("alertBox");
  const forgotPasswordLink = document.getElementById("forgotPasswordLink");

  // Ícones SVG para alternar a exibição da senha
  const eyeOpenIcon = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
    </svg>`;

  const eyeClosedIcon = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.44-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>
    </svg>`;

  // 1. Alternância de Visibilidade da Senha (Mostrar / Ocultar)
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

  // 2. Utilitários de Feedback Visual nos Campos
  function setFieldError(input, message) {
    const wrapper = input.closest(".input-wrapper");
    const errorSpan = input.closest(".form-group").querySelector(".field-error");

    if (wrapper) wrapper.classList.add("is-invalid");
    if (wrapper) wrapper.classList.remove("is-valid");
    if (errorSpan) {
      errorSpan.textContent = message;
      errorSpan.classList.add("show");
    }
  }

  function clearFieldError(input) {
    const wrapper = input.closest(".input-wrapper");
    const errorSpan = input.closest(".form-group").querySelector(".field-error");

    if (wrapper) wrapper.classList.remove("is-invalid");
    if (wrapper) wrapper.classList.add("is-valid");
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

  // 3. Regras de Validação
  function validarEmailOuTelefone(valor) {
    const trimmed = valor.trim();
    if (!trimmed) return "Por favor, informe seu e-mail ou telefone.";

    // Se contém @, valida como e-mail
    if (trimmed.includes("@")) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmed)) {
        return "Informe um endereço de e-mail em formato válido (ex: seu@email.com).";
      }
    } else {
      // Caso contrário, valida como telefone/identificador (mínimo 8 dígitos)
      const apenasNumeros = trimmed.replace(/\D/g, "");
      if (apenasNumeros.length < 8) {
        return "Informe um e-mail válido ou telefone com DDD.";
      }
    }
    return "";
  }

  function validarSenha(valor) {
    if (!valor) return "Por favor, digite sua senha de acesso.";
    if (valor.length < 6) return "A senha deve conter no mínimo 6 caracteres.";
    return "";
  }

  // Validação em tempo real (ao digitar e ao sair do campo)
  if (emailInput) {
    emailInput.addEventListener("input", () => {
      const erro = validarEmailOuTelefone(emailInput.value);
      if (erro) {
        setFieldError(emailInput, erro);
      } else {
        clearFieldError(emailInput);
        hideAlert();
      }
    });

    emailInput.addEventListener("blur", () => {
      const erro = validarEmailOuTelefone(emailInput.value);
      if (erro) setFieldError(emailInput, erro);
    });
  }

  if (senhaInput) {
    senhaInput.addEventListener("input", () => {
      const erro = validarSenha(senhaInput.value);
      if (erro) {
        setFieldError(senhaInput, erro);
      } else {
        clearFieldError(senhaInput);
        hideAlert();
      }
    });

    senhaInput.addEventListener("blur", () => {
      const erro = validarSenha(senhaInput.value);
      if (erro) setFieldError(senhaInput, erro);
    });
  }

  // 4. Submissão do Formulário de Login
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      hideAlert();

      const erroEmail = validarEmailOuTelefone(emailInput.value);
      const erroSenha = validarSenha(senhaInput.value);

      let temErro = false;

      if (erroEmail) {
        setFieldError(emailInput, erroEmail);
        temErro = true;
      } else {
        clearFieldError(emailInput);
      }

      if (erroSenha) {
        setFieldError(senhaInput, erroSenha);
        temErro = true;
      } else {
        clearFieldError(senhaInput);
      }

      if (temErro) {
        showAlert("Preencha corretamente os campos destacados para continuar.");
        return;
      }

      // Validação concluída; os dados são processados pelo backend via submissão POST do formulário
      hideAlert();
    });
  }

  // 5. Link de recuperação de senha (aguarda integração com serviço de e-mail do backend)
  if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener("click", (e) => {
      e.preventDefault();
    });
  }
});
