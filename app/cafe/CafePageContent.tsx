"use client";

import Image from "next/image";

import BreadcrumbChips from "@/src/shared/ui/BreadcrumbChips/BreadcrumbChips";
import { useI18n } from "@/src/shared/i18n/I18nProvider";
import { DecorativeBorder } from "@/src/shared/ui/DecorativeBorder/DecorativeBorder";
import styles from "./cafe.module.css";

type MenuItem = {
  name: string;
  price: string;
};

type MenuSection = {
  id: "coffee" | "addons" | "tea" | "summer" | "hotdog";
  title: string;
  items: MenuItem[];
  note?: string;
};

type CafeCard = {
  variant: "coffee" | "summer" | "hotdog";
  imageSrc: string;
  imageAlt: string;
  imageSide: "left" | "right";
  sections: MenuSection[];
};

const CAFE_CARDS: CafeCard[] = [
  {
    variant: "coffee",
    imageSrc: "/icons/cafe/coffe.svg",
    imageAlt: "Кавові напої та чай у кафе",
    imageSide: "left",
    sections: [
      {
        id: "coffee",
        title: "Кава",
        items: [
          { name: "Еспресо", price: "40 ₴" },
          { name: "Еспресо з молоком", price: "45 ₴" },
          { name: "Допіо", price: "75 ₴" },
          { name: "Лунго", price: "45 ₴" },
          { name: "Американо", price: "45 ₴" },
          { name: "Американо з молоком", price: "50 ₴" },
          { name: "Флет Вайт", price: "80 ₴" },
          { name: "Капучино", price: "65 ₴" },
          { name: "Лате", price: "65 ₴" },
          { name: "Раф", price: "75 ₴" },
          { name: "Какао", price: "65 ₴" },
        ],
      },
      {
        id: "addons",
        title: "Додатки",
        items: [
          { name: "Згущене молоко", price: "10 ₴" },
          { name: "Вершки", price: "15 ₴" },
          { name: "Маршмелоу", price: "10 ₴" },
          { name: "Сироп", price: "5 ₴" },
        ],
      },
      {
        id: "tea",
        title: "Чай",
        items: [
          { name: "Натуральний в асортименті", price: "40 ₴" },
          { name: "Заварний в асортименті", price: "40 ₴" },
        ],
      },
    ],
  },
  {
    variant: "summer",
    imageSrc: "/icons/cafe/tea.svg",
    imageAlt: "Літні напої з лимоном та льодом",
    imageSide: "right",
    sections: [
      {
        id: "summer",
        title: "Літні напої",
        items: [
          { name: "Еспресо тонік", price: "75 ₴" },
          { name: "Оранж кава", price: "75 ₴" },
          { name: "Айс лате", price: "70 ₴" },
          { name: "Лимонади в асортименті", price: "65 ₴" },
          { name: "Каркаде ягідний", price: "45 ₴" },
        ],
      },
    ],
  },
  {
    variant: "hotdog",
    imageSrc: "/icons/cafe/hot-dog.svg",
    imageAlt: "Хот-доги у кафе на автостанції",
    imageSide: "left",
    sections: [
      {
        id: "hotdog",
        title: "Хот-дог",
        note: "Французька булка",
        items: [
          { name: "+ Сосиска молочна", price: "70 ₴" },
          { name: "+ Сосиска молочна з сиром", price: "70 ₴" },
          { name: "+ Сосиска копчена", price: "75 ₴" },
        ],
      },
    ],
  },
];

const CAFE_DESCRIPTION =
  "«Станція кави» — затишна кав'ярня на автостанції, де пахне міцною кавою. Тут завжди раді гостям, які чекають на рейс, або просто хочуть насолодитися смачним напоєм. У меню — різноманітні кавові напої, чай, свіжі хот-доги та солодощі для приємного перекусу.";

function MenuGroup({
  section,
  className = "",
}: {
  section: MenuSection;
  className?: string;
}) {
  const sectionClassMap: Record<MenuSection["id"], string> = {
    coffee: styles.sectionCoffee,
    addons: styles.sectionAddons,
    tea: styles.sectionTea,
    summer: styles.sectionSummer,
    hotdog: styles.sectionHotdog,
  };

  return (
    <section
      className={[styles.menuGroup, sectionClassMap[section.id], className]
        .filter(Boolean)
        .join(" ")}
    >
      <h2 className={styles.groupTitle}>{section.title}</h2>

      <div className={styles.menuList}>
        {section.note ? <p className={styles.groupNote}>{section.note}</p> : null}

        {section.items.map((item) => (
          <div key={`${section.title}-${item.name}`} className={styles.menuRow}>
            <span className={styles.menuName}>{item.name}</span>

            <span className={styles.menuLine} aria-hidden="true">
              <span className={styles.menuLineStroke} />
            </span>

            <span className={styles.menuPrice}>{item.price}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function CafePageContent() {
  const { t } = useI18n();
  const [coffeeCard, summerCard, hotDogCard] = CAFE_CARDS;

  const renderCard = (card: CafeCard) => {
    const isSplitLayout = card.sections.length > 1;
    const cardSideClass = card.imageSide === "left" ? styles.cardImageLeft : styles.cardImageRight;
    const cardVariantClass =
      card.variant === "coffee"
        ? styles.cardCoffee
        : card.variant === "summer"
          ? styles.cardSummer
          : styles.cardHotdog;

    return (
      <article key={card.imageSrc} className={`${styles.card} ${cardSideClass} ${cardVariantClass}`}>
        <div className={styles.photoWrap}>
          <Image
            src={card.imageSrc}
            alt={card.imageAlt}
            fill
            priority={card.variant === "coffee"}
            sizes="(max-width: 430px) 200px, (max-width: 1239px) 300px, 360px"
            className={styles.photo}
          />
        </div>

        <DecorativeBorder className={styles.cardFrame}>
          <div className={styles.slot}>
            <div
              className={`${styles.cardContent} ${
                isSplitLayout ? styles.cardContentSplit : styles.cardContentSingle
              }`}
            >
              {isSplitLayout ? (
                <>
                  <MenuGroup section={card.sections[0]} />

                  <div className={styles.sideColumn}>
                    {card.sections.slice(1).map((section) => (
                      <MenuGroup key={section.title} section={section} />
                    ))}
                  </div>
                </>
              ) : (
                <MenuGroup section={card.sections[0]} className={styles.singleGroup} />
              )}
            </div>
          </div>
        </DecorativeBorder>
      </article>
    );
  };

  return (
    <section className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.srOnly}>Станція кави</h1>

        <BreadcrumbChips
          ariaLabel={t("menu.cafe")}
          items={[
            { label: t("menu.home"), href: "/#home" },
            { label: t("menu.cafe"), current: true },
          ]}
        />

        <section className={styles.menuContent} aria-label="Меню кафе">
          {renderCard(coffeeCard)}
          {renderCard(summerCard)}

          <div className={styles.hotdogBlock}>
            {renderCard(hotDogCard)}

            <section className={styles.story} aria-label="Опис кафе">
              <p className={styles.storyText}>{CAFE_DESCRIPTION}</p>
            </section>
          </div>
        </section>
      </div>
    </section>
  );
}
