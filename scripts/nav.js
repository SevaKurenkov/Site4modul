document.addEventListener("DOMContentLoaded", () => {

  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycby0m_XYf0DhVsn2xwFjHHmVdjNhLczCATHjXc9bbvhMTXaUx93OcGuViB517i78VTZlkg/exec";

  const form = document.getElementById("feedback-form");
  const statusEl = document.getElementById("form-status");

  if (!form || !statusEl) {
    console.error("Форма или элемент статуса не найдены.");
    return;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    statusEl.textContent = "";
    statusEl.style.color = "";

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

    if (form.elements["submittedAt"]) {
      form.elements["submittedAt"].value = new Date().toISOString();
    }

    const formData = new FormData(form);

    try {
      statusEl.textContent = "Отправка...";
      statusEl.style.color = "#555";

      await fetch(SCRIPT_URL, {
        method: "POST",
        body: formData,
        mode: "no-cors"
      });

      statusEl.textContent = "Сообщение отправлено!";
      statusEl.style.color = "green";
      form.reset();

    } catch (error) {
      console.error(error);
      statusEl.textContent = "Ошибка сети. Попробуйте ещё раз.";
      statusEl.style.color = "red";
    }
  });
});