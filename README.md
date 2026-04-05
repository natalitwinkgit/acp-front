# Sprinter Ticket Booking (acp-front)

Сучасний веб-додаток для бронювання автобусних квитків та організації пасажирських перевезень. Побудований з використанням найсучаснішого стеку технологій на базі Next.js App Router.

## 🚀 Технологічний стек

- **Фреймворк:** [Next.js 16](https://nextjs.org/) (App Router)
- **Бібліотека UI:** [React 19](https://react.dev/)
- **Стилізація:** CSS Modules + [Tailwind CSS v4](https://tailwindcss.com/)
- **Мова програмування:** [TypeScript](https://www.typescriptlang.org/)
- **Пакетний менеджер:** [pnpm](https://pnpm.io/)
- **Архітектурна методологія:** [Feature-Sliced Design (FSD)](https://feature-sliced.design/)
- **Локалізація (i18n):** Налаштована маршрутизація та підтримка багатомовності (EN/UK).
- **Лінтер та форматування:** ESLint + Prettier
- **Контроль версій (Commit):** Commitizen (cz-conventional-changelog)

## 📁 Структура документації

Повна документація проекту знаходиться в папці `/docs`:

1. [Огляд архітектури](docs/architecture/overview.md) — базові принципи, App Router, Client/Server Components.
2. [Feature-Sliced Design (FSD)](docs/architecture/fsd.md) — правила розподілу коду по шарах (Entities, Features, Widgets, Pages).
3. [Гайдлайни з розробки](docs/development/guidelines.md) — стандарти написання коду, комітів, робота зі стилями.
4. [Бізнес-логіка: Бронювання](docs/features/booking-flow.md) — опис основного бізнес-процесу бронювання.

## 🛠 Початок роботи

### Передумови
Переконайтеся, що у вас встановлені:
- **Node.js** (рекомендовано v20+ згідно `package.json`)
- **pnpm** (рекомендується `npm i -g pnpm`)

### Встановлення та запуск

1. **Клонуйте репозиторій:**
   ```bash
   git clone <URL_репозиторію>
   cd acp-front
   ```

2. **Встановіть залежності:**
   ```bash
   pnpm install
   ```

3. **Запустіть сервер розробки:**
   ```bash
   pnpm dev
   ```

4. Відкрийте [http://localhost:3000](http://localhost:3000) у вашому браузері для перегляду результату.

## 📜 Доступні скрипти

- `pnpm dev` — запуск проекту в режимі розробки (з включеним webpack)
- `pnpm build` — збірка проекту для продакшену
- `pnpm start` — запуск зібраного проекту (production mode)
- `pnpm lint` — перевірка коду лінтером (ESLint)
- `pnpm commit` — створення стандартизованого коміту за допомогою Commitizen

## 🤝 Конвенції комітів

У проекті використовується `commitizen`. Для створення коміту використовуйте команду:
```bash
pnpm commit
```
Це викличе інтерактивне CLI-меню для правильного форматування повідомлення коміту відповідно до специфікації Conventional Commits.
