  document.addEventListener("DOMContentLoaded", () => {

    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz1PmAGGFj61DLF7O-xGhhxhdmaXqR4t-gRuYnhsISx_Tpvgtn4LHGPgHZ2Fb8nm5Pozg/exec";

    const form = document.getElementById("feedback-form");
    const statusEl = document.getElementById("form-status");

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      statusEl.textContent = "";
      statusEl.style.color = "";

      // Валидация
      const name = form.elements["name"].value.trim();
      const email = form.elements["email"].value.trim();
      const subject = form.elements["subject"].value.trim();
      const message = form.elements["message"].value.trim();

      if (!name || !email || !subject || !message) {
        statusEl.textContent = "Пожалуйста, заполните все поля.";
        statusEl.style.color = "red";
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        statusEl.textContent = "Введите корректный email.";
        statusEl.style.color = "red";
        return;
      }

      // Время отправки
      form.elements["submittedAt"].value = new Date().toISOString();

      const formData = new FormData(form);

      try {
        statusEl.textContent = "Отправка...";
        statusEl.style.color = "#555";

        const response = await fetch(SCRIPT_URL, {
          method: "POST",
          body: formData,
        });

        const result = await response.json();

        if (result.ok) {
          statusEl.textContent = "Сообщение отправлено!";
          statusEl.style.color = "green";
          form.reset();
        } else {
          statusEl.textContent = "Ошибка при отправке.";
          statusEl.style.color = "red";
        }
      } catch (error) {
        console.error(error);
        statusEl.textContent = "Сетевая ошибка.";
        statusEl.style.color = "red";
      }
    });

  });