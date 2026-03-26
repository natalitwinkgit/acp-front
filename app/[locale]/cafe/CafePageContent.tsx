"use client";

import Image from "next/image";

import type { Locale } from "@/src/shared/i18n";
import BreadcrumbChips from "@/src/shared/ui/BreadcrumbChips/BreadcrumbChips";
import { useI18n } from "@/src/shared/i18n/I18nProvider";
import { DecorativeBorder } from "@/src/shared/ui/DecorativeBorder/DecorativeBorder";
import styles from "./cafe.module.css";

type LocalizedText = Record<Locale, string>;

type MenuItem = {
  name: LocalizedText;
  price: string;
};

type MenuSection = {
  id: "coffee" | "addons" | "tea" | "summer" | "hotdog";
  title: LocalizedText;
  items: MenuItem[];
  note?: LocalizedText;
};

type CafeCard = {
  variant: "coffee" | "summer" | "hotdog";
  imageSrc: string;
  imageAlt: LocalizedText;
  imageSide: "left" | "right";
  sections: MenuSection[];
};

function getLocalizedText(value: LocalizedText, locale: Locale) {
  return value[locale];
}

const CAFE_CARDS: CafeCard[] = [
  {
    variant: "coffee",
    imageSrc: "/icons/cafe/coffe.svg",
    imageAlt: {
      uk: "Кавові напої та чай у кафе",
      en: "Coffee drinks and tea in the cafe",
    },
    imageSide: "left",
    sections: [
      {
        id: "coffee",
        title: {
          uk: "Кава",
          en: "Coffee",
        },
        items: [
          { name: { uk: "Еспресо", en: "Espresso" }, price: "40 ₴" },
          { name: { uk: "Еспресо з молоком", en: "Espresso with milk" }, price: "45 ₴" },
          { name: { uk: "Допіо", en: "Doppio" }, price: "75 ₴" },
          { name: { uk: "Лунго", en: "Lungo" }, price: "45 ₴" },
          { name: { uk: "Американо", en: "Americano" }, price: "45 ₴" },
          { name: { uk: "Американо з молоком", en: "Americano with milk" }, price: "50 ₴" },
          { name: { uk: "Флет Вайт", en: "Flat White" }, price: "80 ₴" },
          { name: { uk: "Капучино", en: "Cappuccino" }, price: "65 ₴" },
          { name: { uk: "Лате", en: "Latte" }, price: "65 ₴" },
          { name: { uk: "Раф", en: "Raf coffee" }, price: "75 ₴" },
          { name: { uk: "Какао", en: "Cocoa" }, price: "65 ₴" },
        ],
      },
      {
        id: "addons",
        title: {
          uk: "Додатки",
          en: "Add-ons",
        },
        items: [
          { name: { uk: "Згущене молоко", en: "Condensed milk" }, price: "10 ₴" },
          { name: { uk: "Вершки", en: "Cream" }, price: "15 ₴" },
          { name: { uk: "Маршмелоу", en: "Marshmallow" }, price: "10 ₴" },
          { name: { uk: "Сироп", en: "Syrup" }, price: "5 ₴" },
        ],
      },
      {
        id: "tea",
        title: {
          uk: "Чай",
          en: "Tea",
        },
        items: [
          { name: { uk: "Натуральний в асортименті", en: "Natural tea assortment" }, price: "40 ₴" },
          { name: { uk: "Заварний в асортименті", en: "Brewed tea assortment" }, price: "40 ₴" },
        ],
      },
    ],
  },
  {
    variant: "summer",
    imageSrc: "/icons/cafe/tea.svg",
    imageAlt: {
      uk: "Літні напої з лимоном та льодом",
      en: "Summer drinks with lemon and ice",
    },
    imageSide: "right",
    sections: [
      {
        id: "summer",
        title: {
          uk: "Літні напої",
          en: "Summer drinks",
        },
        items: [
          { name: { uk: "Еспресо тонік", en: "Espresso tonic" }, price: "75 ₴" },
          { name: { uk: "Оранж кава", en: "Orange coffee" }, price: "75 ₴" },
          { name: { uk: "Айс лате", en: "Iced latte" }, price: "70 ₴" },
          { name: { uk: "Лимонади в асортименті", en: "Lemonades assortment" }, price: "65 ₴" },
          { name: { uk: "Каркаде ягідний", en: "Berry hibiscus" }, price: "45 ₴" },
        ],
      },
    ],
  },
  {
    variant: "hotdog",
    imageSrc: "/icons/cafe/hot-dog.svg",
    imageAlt: {
      uk: "Хот-доги у кафе на автостанції",
      en: "Hot dogs at the station cafe",
    },
    imageSide: "left",
    sections: [
      {
        id: "hotdog",
        title: {
          uk: "Хот-дог",
          en: "Hot dog",
        },
        note: {
          uk: "Французька булка",
          en: "French bun",
        },
        items: [
          { name: { uk: "+ Сосиска молочна", en: "+ Milk sausage" }, price: "70 ₴" },
          { name: { uk: "+ Сосиска молочна з сиром", en: "+ Milk sausage with cheese" }, price: "70 ₴" },
          { name: { uk: "+ Сосиска копчена", en: "+ Smoked sausage" }, price: "75 ₴" },
        ],
      },
    ],
  },
];

const CAFE_PAGE_TITLE: LocalizedText = {
  uk: "Станція кави",
  en: "Coffee Station",
};

const CAFE_MENU_ARIA: LocalizedText = {
  uk: "Меню кафе",
  en: "Cafe menu",
};

const CAFE_STORY_ARIA: LocalizedText = {
  uk: "Опис кафе",
  en: "Cafe description",
};

const CAFE_DESCRIPTION: LocalizedText = {
  uk: "«Станція кави» — затишна кав'ярня на автостанції, де пахне міцною кавою. Тут завжди раді гостям, які чекають на рейс, або просто хочуть насолодитися смачним напоєм. У меню — різноманітні кавові напої, чай, свіжі хот-доги та солодощі для приємного перекусу.",
  en: "\"Coffee Station\" is a cozy cafe at the bus station where the aroma of strong coffee welcomes every guest. It is a comfortable place for travelers waiting for their route or anyone who wants to enjoy a tasty drink. The menu features a variety of coffee drinks, tea, fresh hot dogs, and sweets for a pleasant snack.",
};

function MenuGroup({
  section,
  locale,
  className = "",
}: {
  section: MenuSection;
  locale: Locale;
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
      <h2 className={styles.groupTitle}>{getLocalizedText(section.title, locale)}</h2>

      <div className={styles.menuList}>
        {section.note ? <p className={styles.groupNote}>{getLocalizedText(section.note, locale)}</p> : null}

        {section.items.map((item) => (
          <div
            key={`${section.id}-${getLocalizedText(item.name, locale)}`}
            className={styles.menuRow}
          >
            <span className={styles.menuName}>{getLocalizedText(item.name, locale)}</span>

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
  const { locale, t } = useI18n();
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
            alt={getLocalizedText(card.imageAlt, locale)}
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
                  <MenuGroup section={card.sections[0]} locale={locale} />

                  <div className={styles.sideColumn}>
                    {card.sections.slice(1).map((section) => (
                      <MenuGroup
                        key={`${section.id}-${getLocalizedText(section.title, locale)}`}
                        section={section}
                        locale={locale}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <MenuGroup section={card.sections[0]} locale={locale} className={styles.singleGroup} />
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
        <h1 className={styles.srOnly}>{getLocalizedText(CAFE_PAGE_TITLE, locale)}</h1>

        <BreadcrumbChips
          ariaLabel={t("menu.cafe")}
          items={[
            { label: t("menu.home"), href: "/#home" },
            { label: t("menu.cafe"), current: true },
          ]}
        />

        <section className={styles.menuContent} aria-label={getLocalizedText(CAFE_MENU_ARIA, locale)}>
          {renderCard(coffeeCard)}
          {renderCard(summerCard)}

          <div className={styles.hotdogBlock}>
            {renderCard(hotDogCard)}

            <section className={styles.story} aria-label={getLocalizedText(CAFE_STORY_ARIA, locale)}>
              <p className={styles.storyText}>{getLocalizedText(CAFE_DESCRIPTION, locale)}</p>
            </section>
          </div>
        </section>
      </div>
    </section>
  );
}
