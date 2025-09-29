// Интерактивна игра - локално
const roles = [
  "Представител на „ТехноВнос“",
  "Юридически съветник на „ТехноВнос“",
  "Представител на „СкладМаркет“",
  "Юридически съветник на „СкладМаркет“",
  "Технически експерт",
  "Финансов директор на „СкладМаркет“",
  "Медиатор"
];

const contentByRole = {
  "Представител на „ТехноВнос“": {
    target: "Поддържа позицията, че изпитателният срок е законно валиден.",
    motivation: "Защита на финансови интереси; минимизиране на риск от дефекти.",
    arguments: [
      "Договорът съдържа изпитателен срок от 14 дни; може да се използва за проверка на качеството.",
      "Удължаването до 45 дни е възможно само при обективни дефекти/условия."
    ],
    counterArguments: ["Удължаването без ясна клауза е спорно."],
    tactics: ["Подчертайте договорното споразумение; предложете протоколи за проверка."]
  },
  "Юридически съветник на „ТехноВнос“": {
    target: "Обяснява правния механизъм за изпитателен срок.",
    motivation: "Защита на юридическите интереси; минимизиране на риск от злоупотреба.",
    arguments: [
      "Договорът съдържа изпитателен срок; възможности за удължаване при дефекти.",
      "Трябва документално доказване, че удължаването е в рамките на договора/закона."
    ],
    counterArguments: ["Ясни дефекти и доказателства за нарушение на срока."],
    tactics: ["Проверка на протоколи, кореспонденция; предложение за арбитраж."]
  },
  "Представител на „СкладМаркет“": {
    target: "Настоява за плащане; твърди, че няма нарушение.",
    motivation: "Ликвидност и изпълнение на договор.",
    arguments: [
      "Условието за изпитателен срок е изпълнено; плащането трябва да бъде извършено.",
      "Ако има дефекти, ги адресирайте чрез гаранции, не чрез забавяне на плащането."
    ],
    counterArguments: ["Налице може да са дефекти; може да се договори частично плащане."],
    tactics: ["Подчертайте изпълнение и последствия от забавяне."]
  },
  "Юридически съветник на „СкладМаркет“": {
    target: "Защитава интересите на доставчика",
    motivation: "Защита на договорните разпоредби; правото на изпитателен срок.",
    arguments: [
      "Изпитателният срок е валиден; качеството е в съответствие с договора.",
      "Може да се обсъди независима оценка, ако е необходимо."
    ],
    counterArguments: [],
    tactics: ["Подава легитимни основания за изпитателния срок; предлага независим тест."]
  },
  "Технически експерт": {
    target: "Дава техническо становище за качеството",
    motivation: "Обективна оценка; подпомагане на решението.",
    arguments: [
      "Тестове/спецификации; дефекти и влияние върху качеството."
    ],
    counterArguments: [],
    tactics: ["Препоръчва повторни тестове или независим експерт."]
  },
  "Финансов директор на „СкладМаркет“": {
    target: "Описва финансовото въздействие",
    motivation: "Ликвидност, рискове, загуби.",
    arguments: [
      "Забавянето води до лихви, загуба на кредитна линия.",
      "Препоръчва алтернативи за минимизиране на риска."
    ],
    counterArguments: [],
    tactics: ["Демонстриране на цифри и сценарии."]
  },
  "Медиатор": {
    target: "Предлага компромисни решения",
    motivation: "Стабилна договореност; запазване на бизнес отношения.",
    arguments: [
      "Частично плащане с корекции за дефекти; разсрочено плащане при изпълнение на условия.",
      "Независима оценка на качеството с определени срокове за платени суми."
    ],
    counterArguments: [],
    tactics: ["Предложения за конкретни стъпки за компромис."]
  }
};

function renderCard(role){
  const d = contentByRole[role];
  if(!d) return;
  document.getElementById("card-title").innerText = `Карта: ${role}`;
  const details = document.getElementById("card-details");
  details.innerHTML = `
    <p><strong>Цел в играта:</strong> ${d.target}</p>
    <p><strong>Мотивация:</strong> ${d.motivation}</p>
    <p><strong>Основни аргументи:</strong></p>
    <ul>${d.arguments.map(a => `<li>${a}</li>`).join('')}</ul>
    <p><strong>Контра-аргументи:</strong></p>
    <ul>${(d.counterArguments||[]).map(a => `<li>${a}</li>`).join('')}</ul>
    <p><strong>Тактики:</strong></p>
    <ul>${(d.tactics||[]).map(t => `<li>${t}</li>`).join('')}</ul>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  const roleSelect = document.getElementById("role-select");
  roleSelect.addEventListener("change", (e) => {
    renderCard(e.target.value);
  });

  // Запазване в LocalStorage
  const saveBtn = document.getElementById("save-btn");
  const notesArea = document.getElementById("notes-area");
  saveBtn.addEventListener("click", () => {
    const role = roleSelect.value;
    const data = {
      role,
      notes: notesArea.value
    };
    let all = JSON.parse(localStorage.getItem("role_battle_notes") || "[]");
    // просто добавяме нов запис
    all.push(data);
    localStorage.setItem("role_battle_notes", JSON.stringify(all));
    alert("Бележките са запазени локално (LocalStorage).");
  });

  // Експорт протокол
  const exportBtn = document.getElementById("export-btn");
  exportBtn.addEventListener("click", () => {
    const role = roleSelect.value;
    const d = contentByRole[role] || {};
    const res = [
      `Карта: ${role}`,
      `Цел: ${d.target || ""}`,
      `Мотивация: ${d.motivation || ""}`,
      `Аргументи: ${ (d.arguments||[]).join("; ") }`,
      `Контра-аргументи: ${ (d.counterArguments||[]).join("; ") }`,
      `Тактики: ${ (d.tactics||[]).join("; ") }`,
      `Бележки: ${notesArea.value || ""}`
    ].join("\n");
    navigator.clipboard.writeText(res).then(() => {
      alert("Протоколът е копиран в клипборда. Можете да го поставите в документ за печат.");
    });
  });

  // Инициализация – ако вече има избрана роля
  if(roleSelect.value){
    renderCard(roleSelect.value);
  }
});

// Функция за изчистване на прогреса
document.getElementById("clear-btn").addEventListener("click", () => {
  localStorage.removeItem("role_battle_notes");
  alert("Локалното съхранение е изчистено.");
});
