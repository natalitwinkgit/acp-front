import type { Locale } from "@/src/shared/i18n";

export type PublicOfferSection = {
  id: string;
  title: string;
  paragraphs: string[];
};

export type PublicOfferContent = {
  title: string;
  breadcrumbsAria: string;
  introduction: string[];
  sections: PublicOfferSection[];
};

const ukIntroduction = [
  "ФОП Кімлик Євген Вікторович, 2220902158, с. Свидівок, Черкаський р-н, Черкаська обл. 19622, Україна, (далі - Виконавець) пропонує необмеженому колу осіб (далі - «Користувач(і)») укласти Договір публічної оферти (далі - «Договір»), з метою пошуку та/або придбання квитків на сайті https://autoluxplus.com.ua/. Користувач (Покупець) може діяти в межах Договору від свого імені та на свою користь та/або від імені третьої сторони та на її користь, у такому випадку Користувач діє виключно в межах повноважень, наданих третьою стороною.",
  "Квиток (у тому числі і електронний квиток) - проїзний документ встановленої форми, який дає право пасажиру на одержання транспортних послуг автобусного перевезення, створений в автоматизованій системі Виконавця, надсилається на електронну адресу, вказану при замовленні або іншим чином видається Користувачу. Номер квитка є номером договору публічної оферти і номером договору пасажирського перевезення.",
];

const ukSections: PublicOfferSection[] = [
  {
    id: "subject",
    title: "1. ПРЕДМЕТ ОФЕРТИ.",
    paragraphs: [
      "1.1. Предметом цієї Оферти є надання Виконавцем Користувачам послуг з бронювання, оформлення і продажу квитків на рейси та додаткові послуги (місця для багажу), що розташовані на сайті https://autoluxplus.com.ua/ відповідності до дати, часу та напрямку, обраного Користувачем.",
      "1.2. Виконавець реалізує квитки на рейси перевізників, які співпрацюють з ФОП Кімлик Є.В.",
      "1.3. Продаж Квитків Покупцю, в тому числі Електронних квитків, проводиться виключно на умовах цієї Оферти і лише в разі повного і беззастережного прийняття умов цієї Оферти Покупцем (акцепту Оферти).",
    ],
  },
  {
    id: "rights",
    title: "2. ПРАВА І ОБОВ'ЯЗКИ СТОРІН.",
    paragraphs: [
      "2.1. Користувач має право:",
      "2.1.1. Отримати послуги за Договором.",
      "2.1.2. Скористатись Квитком, у відповідності до обраної дати, часу, місця відправлення та обраного Перевізника.",
      "2.1.3. Повернути Квиток на умовах, визначених Виконавцем.",
      "2.1.4. Вимагати компенсації завданих збитків, згідно умов Договору, шляхом направлення відповідного звернення на адресу Виконавця.",
      "2.1.5. У випадку завдання моральної шкоди Користувачу, діями або бездіяльністю Виконавця, сума відшкодування, при її доведенні та обґрунтуванні не може перевищувати суму більшу чим вартість Квитка.",
      "2.2. Користувач зобов'язаний:",
      "2.2.1. Здійснити попередню оплату Квитка, у розмірі 100% вартості, що вказана на сайті https://autoluxplus.com.ua/.",
      "2.2.2. Перевірити дату, час, місто/місце відправлення, місто/місце прибуття одразу після придбання Квитка.",
      "2.2.3. Завчасно прибути до місця відправлення.",
      "2.2.4. Повідомити Виконавця про неможливість використання Квитка з тієї чи іншої причини.",
      "2.2.5. Ознайомитись з умовами повернення Квитка та правилами перевезення багажу.",
      "2.3. Виконавець має право:",
      "2.3.1. Діяти від імені Перевізника в межах повноважень, визначених договірними відносинами.",
      "2.3.2. Встановити та отримати додаткову винагороду з Користувача, за додатково надані сервіси та/або послуги.",
      "2.3.3. Записувати телефонні розмови з Користувачем та/або Пасажиром, у випадку звернення до сервісного центру та/або у випадку обслуговування Користувача/Пасажира, та/або необхідності повідомити Користувача/Пасажира, та/або отримати додаткові відомості щодо будь-якого Квитка, купівлю якого здійснено за допомогою Сайту https://autoluxplus.com.ua/.",
      "2.4. Виконавець зобов'язаний:",
      "2.4.1. Надіслати Користувачу Квиток відповідно до форми, встановленої і прийнятої Перевізником.",
      "2.4.2. Повідомити Користувача про зміни в умовах надання послуг.",
      "2.4.3. Повідомити Користувача про зміну або скасування рейсу.",
      "2.4.4. Прийняти звернення від Користувача, розглянути його самостійно або направити для розгляду відповідному Перевізнику.",
      "2.4.5. Своєчасно повідомити Користувача про розгляд звернення, а у випадку надсилання звернення Перевізнику про результати його розгляду (у випадку надходження такої відповіді на адресу Виконавця).",
      "2.4.6. Надання відповіді на звернення здійснюється способом, аналогічним до його надходження. Надсилання відповіді третій стороні (у тому числі і за проханням Користувача) здійснюватися не буде.",
    ],
  },
  {
    id: "payments",
    title: "3. ВЗАЄМОРОЗРАХУНКИ.",
    paragraphs: [
      "3.1. Кошти, отримані від Користувача, в рахунок придбання Квитка, належать Виконавцю, в тому числі від Сервісного збору (у випадку, якщо такий входив до вартості Квитка).",
      "3.2. Користувач має право здійснити оплату Квитків будь-яким із способів, запропонованих Виконавцем, інформація про які знаходиться на Сайті https://autoluxplus.com.ua/.",
      "3.3. Користувач одноосібно відповідальний за всі комісійні витрати та інші визначені банком витрати, які можуть бути додані до ціни Квитка або додаткових послуг, емітентом кредитної або дебетної картки.",
      "3.4. Банківські послуги, пов'язані з переказом коштів в межах Договору, оплачуються Стороною, яка їх здійснює.",
    ],
  },
  {
    id: "identification",
    title: "4. ІДЕНТИФІКАЦІЯ КОРИСТУВАЧА.",
    paragraphs: [
      "4.1. В якості ідентифікатора Користувача використовується e-mail адреса та/або номер телефону, що вказується при придбанні Квитка.",
      "4.2. Звернення з номера телефона/e-mail адреси, залишеної при придбанні Квитка, дозволяє Виконавцю ідентифікувати Користувача, як належну Сторону Договору з відповідними правами та обов'язками, і дозволяє здійснювати дії по відношенню як до Договору загалом, так і до конкретно придбаного Квитка.",
      "4.3. Звернення Користувача з іншого номера телефона та/або e-mail адреси, наданого при придбанні Квитка, дає право Виконавцю вимагати від Користувача додатково ідентифікувати себе, як належну сторону Договору.",
      "4.4. У випадку неможливості ідентифікувати Користувача, як сторону Договору, Виконавець залишає за собою право відмовити у розгляді звернення.",
      "4.5. Відповідальність за збереження та/або доступ до номера телефона та/або e-mail адреси покладається на Користувача.",
    ],
  },
  {
    id: "refund",
    title: "5. УМОВИ ПОВЕРНЕННЯ КВИТКА",
    paragraphs: [
      "5.1. Примусове повернення коштів за Квиток:",
      "5.1.1. У випадку повідомлення Перевізником про скасування рейсу, з тієї чи іншої причини, ФОП Кімлик Є.В. здійснює повернення Коштів, отриманих в якості оплати Квитка, шляхом, яким вони надійшли у розмірі 100 % вартості Квитка, або, за наявності, пропонує інший Квиток на рейс того самого або іншого Перевізника.",
      "5.2. Добровільне повернення:",
      "5.2.1. У разі оформлення повернення Квитка за власної ініціативи Користувача, Агент повертає кошти Користувачу без повернення суми Сервісного збору. При поверненні квитка знімається наступний збір:\nДобровільно, більше ніж за 1 годину до відправлення рейсу - повертається 15% вартості;\nДобровільно, більше ніж за 12 годин до відправлення рейсу - повертається 50% вартості;\nДобровільно, більше ніж за 24 години до відправлення рейсу - повертається 75% вартості;\nДобровільно, більше ніж за 48 годин до відправлення рейсу - повертається 85% вартості.",
      "5.2.2. Кошти або частина Коштів, за умови вирахування обов'язкових утримань, при поверненні Квитка Користувачу здійснюється протягом 14 днів з моменту прийняття рішення про повернення коштів за Квиток.",
      "5.2.3. За квитки, які були перенесені на іншу дату за проханням Користувача, кошти не повертаються в жодному вигляді.",
      "5.2.4. При зміні дати виїзду Користувач повинен сплатити різницю між початковою і новою ціною квитка, якщо квиток на дату перенесення коштує дорожче. Якщо вартість квитка на перенесену дату нижча, ніж вартість попереднього, різниця у вартості Користувачу не повертається.",
    ],
  },
  {
    id: "information",
    title: "6. УМОВИ НАДАННЯ ІНФОРМАЦІЇ",
    paragraphs: [
      "6.1. Для здійснення оформлення та придбання Квитка на Сайті https://autoluxplus.com.ua/ необхідно надати певну інформацію, а саме: Ім'я і Прізвище пасажира, адресу та номер телефону.",
      "6.2. Також при покупці необхідно вказати платіжну інформацію, пов'язану з банківськими картками, тобто їх номери і терміни дії. Вводити дану інформацію необхідно при кожній купівлі на захищеному сервісі обраної платіжної системи.",
    ],
  },
  {
    id: "guarantees",
    title: "7. ГАРАНТІЇ СТОРІН",
    paragraphs: [
      "7.1. Здійснюючи покупку через Сайт https://autoluxplus.com.ua/, Користувач підтверджує свою дієздатність та дає згоду на обробку своїх персональних даних.",
      "7.2. Агент зобов'язується не використовувати персональні дані Користувача для розсилки матеріалів, що не мають відношення до Послуг, які надаються Виконавцю, не передавати персональні дані третім особам та не використовувати їх з іншою метою.",
      "7.3. Користувач погоджується сплатити ціну Квитка і відповідні податки для всіх зроблених покупок, оплачених кредитними або дебітними картками, або іншим дозволеним методом оплати.",
      "7.4. Користувач погоджується сплатити всі визначені Виконавцем кошти у разі, якщо платіж не здійснено, повернуто або відхилено банком Користувача.",
      "7.5. Виконавець, здійснюючи продаж Квитка за допомогою Сайту https://autoluxplus.com.ua/, підтверджує наявне у нього право на продаж даного Квитка, у відповідності до умов і обов'язків, визначених Перевізником.",
      "7.6. Виконавець зберігає за собою право на свій розсуд блокувати кредитні та дебетні картки за підозрілу активність.",
    ],
  },
  {
    id: "confidentiality",
    title: "8. КОНФІДЕНЦІЙНА ІНФОРМАЦІЯ",
    paragraphs: [
      "8.1. Користувач підтверджує згоду з тим, що несе особисту відповідальність за надану для збереження конфіденційну інформацію.",
      "8.2. Виконавець не несе відповідальності за будь-які збитки, завдані внаслідок несанкціонованого використання конфіденційної інформації, залишеної Користувачем.",
      "8.3. Вся особиста інформація, отримана Виконавцем в результаті здійснення замовлень через Сайт, зберігається згідно з чинним законодавством про конфіденційність.",
      "8.4. Виконавець залишає за собою право використовувати та розкривати інформацію про Користувача або про замовлення, здійсненні Користувачем, на умовах дотримання Конфіденційності.",
    ],
  },
  {
    id: "intermediary",
    title: "9. Ми, ФОП Кімлик Є.В., виконуємо функцію посередника з продажу квитків на рейси інших перевізників через свій веб-сайт https://autoluxplus.com.ua/",
    paragraphs: [
      "9.1. Особливості продажу квитків інших перевізників: ФОП Кімлик Є.В. продає квитки на рейси інших перевізників, виступаючи як посередник з продажу. Користувачі, які купують квитки на рейси інших перевізників через наш вебсайт або додаток, погоджуються з умовами даного розділу.",
      "9.2. Бонусна програма: За купівлю квитків на рейси інших перевізників бонуси не нараховуються.",
      "9.3. Повернення квитків: Умови повернення квитків, придбаних на рейси інших перевізників, можуть відрізнятися від умов повернення квитків на рейси ТОВ «Автолюкс-Черкаси-Плюс». Всі деталі та вимоги щодо повернення квитків надаються Користувачу під час оформлення замовлення або можуть бути уточнені через службу підтримки.",
      "9.4. Користувачі зобов'язуються дотримуватись правил безпеки та поведінки, встановлених перевізником для обраного рейсу. У разі порушень цих правил перевізник має право відмовити в перевезенні без відшкодування вартості квитка.",
    ],
  },
  {
    id: "personal-data",
    title: "10. ЗГОДА НА ОБРОБКУ ПЕРСОНАЛЬНИХ ДАНИХ",
    paragraphs: [
      "10.1. Користувач надає згоду та підтверджує, що дані, вказані ним при придбанні Квитка правдиві, і Користувач має право вказати їх при купівлі Квитка та залишити для подальшої обробки та збереження, у тому числі, але не обмежуючись, для:\n- передачі їх третій стороні, яка тим чи іншим чином пов'язана з цим Договором, або з метою його повного виконання;\n- додаткового інформування Користувача про статус виконання рейсу, зміни в його умовах;\n- подальшої обробки замовлень Користувача;\n- отримання сервісних повідомлень, у тому числі щодо акцій, бонусних програм і знижок, що проводяться Виконавцем.",
    ],
  },
  {
    id: "responsibility",
    title: "11. ВІДПОВІДАЛЬНІСТЬ СТОРІН",
    paragraphs: [
      "11.1. У разі невиконання або неналежного виконання однією із Сторін зобов'язань за Договором, винна Сторона зобов'язана відшкодувати протилежній Стороні заподіяні і доведені такими діями збитки.",
      "11.2. Користувач особисто несе відповідальність за дотримання умов і правил обраного Перевізника та Договору. УВАГА! Цей Договір регулює виключно умови придбання обраного Користувачем Квитка, який в свою чергу є свідченням укладення договору Перевезення.",
    ],
  },
  {
    id: "disclaimer",
    title: "12. ЗВІЛЬНЕННЯ ВІД ВІДПОВІДАЛЬНОСТІ СТОРІН",
    paragraphs: [
      "12.1. Користувач розуміє і погоджується з тим, що Виконавець не несе жодної відповідальності за будь-які прямі, непрямі, побічні та штрафні збитки; а також за незручності пов'язані з виконанням перевезення (у тому числі, але не обмежуючись, затримки рейсів, скасування рейсів, пропущені стикування рейсів) або інші можливі проблеми, що мали місце у зв'язку з Вашим відвідуванням або використанням Сайту/Додатку.",
      "12.2. Виконавець не несе відповідальності за втрати і збитки, понесені Користувачем в процесі поїздки.",
      "12.3. Користувач погоджується з тим, що отримує доступ до товарів і послуг, і інформації про автобусні перевезення, доступні на Сайті https://autoluxplus.com.ua/ під свою відповідальність.",
      "12.4. Виконавець не несе відповідальності за збитки та/або втрату квитка на той чи інший вид транспорту, за збитки, отримані Користувачем в результаті запізнення автобусу до пункту, де Користувач мав здійснити пересадку, у тому числі придбаним одним замовленням через Сайт https://autoluxplus.com.ua/.",
    ],
  },
  {
    id: "claims",
    title: "13. ПРЕТЕНЗІЇ І ПІДСУДНІСТЬ",
    paragraphs: [
      "13.1. Претензійний порядок розгляду звернень не є обов'язковим.",
      "13.2. При порушення умов Договору однією із Сторін, протилежна Сторона має право звернутись до суду. Місцезнаходження суду обирається у відповідності до чинного законодавства України.",
      "13.3. Усі питання щодо відносин між Сторонами, які не врегульовані цим Договором, регулюються чинним законодавством України. УВАГА! При порушення умов Договору перевезення, умови якого (дата, час відправлення/прибуття, місце посадки/висадки) наведені у Квитку, несе Перевізник, що фактично виконував рейс.",
    ],
  },
  {
    id: "final",
    title: "14. ПРИКІНЦЕВІ ПОЛОЖЕННЯ",
    paragraphs: [
      "14.1. Номер Договору відповідає номеру придбаного Користувачем Квитка. Датою укладення Договору є дата здійснення платежу, в рахунок обраного Квитка.",
    ],
  },
  {
    id: "requisites",
    title: "15. РЕКВІЗИТИ СТОРІН",
    paragraphs: [
      "15.1. ФОП Кімлик Євген Віктороич, 2220902158, с. Свидівок, Черкаський р-н., Черкаська обл. 19622, Україна\n+380990782021\n+380939660940\n+380974802428\nhttps://autoluxplus.com.ua/",
      "15.2. Реквізити Пасажира: свої реквізити Замовник вносить за допомогою Інтернет-ресурсу в реєстраційну електронну форму на етапі формування електронного квитка.",
    ],
  },
];

const enIntroduction = [
  "Sole proprietor Yevhen V. Kimlyk, 2220902158, Svydivok village, Cherkasy district, Cherkasy region 19622, Ukraine (hereinafter referred to as the Provider) offers an unlimited number of persons (hereinafter referred to as the User(s)) to enter into this Public Offer Agreement (hereinafter referred to as the Agreement) for the purpose of searching for and/or purchasing tickets on the website https://autoluxplus.com.ua/. The User (Buyer) may act under the Agreement in their own name and for their own benefit and/or on behalf of a third party and for its benefit. In such a case, the User acts solely within the authority granted by that third party.",
  "A ticket (including an electronic ticket) is a travel document of the prescribed form that gives the passenger the right to receive bus transportation services. It is created in the Provider's automated system, sent to the email address specified when placing the order, or otherwise delivered to the User. The ticket number is the number of the public offer agreement and the number of the passenger transportation agreement.",
];

const enSections: PublicOfferSection[] = [
  {
    id: "subject",
    title: "1. SUBJECT OF THE OFFER.",
    paragraphs: [
      "1.1. The subject of this Offer is the provision by the Provider to Users of services for booking, issuing, and selling tickets for trips and additional services (baggage places) available on the website https://autoluxplus.com.ua/ according to the date, time, and destination selected by the User.",
      "1.2. The Provider sells tickets for carriers cooperating with sole proprietor Yevhen V. Kimlyk.",
      "1.3. The sale of Tickets to the Buyer, including Electronic Tickets, is carried out exclusively on the terms of this Offer and only if the Buyer fully and unconditionally accepts the terms of this Offer (acceptance of the Offer).",
    ],
  },
  {
    id: "rights",
    title: "2. RIGHTS AND OBLIGATIONS OF THE PARTIES.",
    paragraphs: [
      "2.1. The User has the right to:",
      "2.1.1. Receive services under the Agreement.",
      "2.1.2. Use the Ticket in accordance with the selected date, time, departure point, and chosen Carrier.",
      "2.1.3. Return the Ticket under the conditions determined by the Provider.",
      "2.1.4. Demand compensation for damages in accordance with the Agreement by sending a relevant request to the Provider.",
      "2.1.5. If moral damage is caused to the User through the actions or inaction of the Provider, the amount of compensation, if proven and justified, may not exceed the price of the Ticket.",
      "2.2. The User is obliged to:",
      "2.2.1. Make an advance payment for the Ticket in the amount of 100% of the price indicated on the website https://autoluxplus.com.ua/.",
      "2.2.2. Check the date, time, city/place of departure, and city/place of arrival immediately after purchasing the Ticket.",
      "2.2.3. Arrive at the departure point in advance.",
      "2.2.4. Notify the Provider if the Ticket cannot be used for any reason.",
      "2.2.5. Review the Ticket return conditions and baggage transportation rules.",
      "2.3. The Provider has the right to:",
      "2.3.1. Act on behalf of the Carrier within the scope of authority defined by contractual relations.",
      "2.3.2. Set and receive additional remuneration from the User for additionally provided services.",
      "2.3.3. Record telephone conversations with the User and/or Passenger in the event of contacting the service center and/or servicing the User/Passenger and/or when it is necessary to notify the User/Passenger and/or obtain additional information regarding any Ticket purchased through the website https://autoluxplus.com.ua/.",
      "2.4. The Provider is obliged to:",
      "2.4.1. Send the User the Ticket in the form established and accepted by the Carrier.",
      "2.4.2. Inform the User about changes in the terms of service provision.",
      "2.4.3. Inform the User about changes to or cancellation of a trip.",
      "2.4.4. Accept appeals from the User, review them independently, or forward them to the relevant Carrier.",
      "2.4.5. Timely inform the User about the review of the appeal and, if the appeal has been forwarded to the Carrier, about the results of its review (if such a response is received by the Provider).",
      "2.4.6. A response to an appeal is provided in the same way the appeal was received. No response will be sent to a third party, including at the User's request.",
    ],
  },
  {
    id: "payments",
    title: "3. SETTLEMENTS.",
    paragraphs: [
      "3.1. Funds received from the User as payment for the Ticket belong to the Provider, including the service fee (if such fee was included in the Ticket price).",
      "3.2. The User has the right to pay for Tickets by any method offered by the Provider, information about which is available on the website https://autoluxplus.com.ua/.",
      "3.3. The User is solely responsible for all commissions and other charges determined by the bank that may be added to the price of the Ticket or additional services by the issuer of the credit or debit card.",
      "3.4. Banking services related to the transfer of funds under the Agreement are paid for by the party that initiates them.",
    ],
  },
  {
    id: "identification",
    title: "4. USER IDENTIFICATION.",
    paragraphs: [
      "4.1. The User's identifier is the email address and/or phone number specified when purchasing the Ticket.",
      "4.2. A request made from the phone number/email address provided when purchasing the Ticket allows the Provider to identify the User as the proper party to the Agreement with the corresponding rights and obligations, and allows actions to be performed both in relation to the Agreement as a whole and to the specific Ticket purchased.",
      "4.3. If the User contacts the Provider from a different phone number and/or email address than the one provided when purchasing the Ticket, the Provider has the right to request additional identification of the User as the proper party to the Agreement.",
      "4.4. If it is impossible to identify the User as a party to the Agreement, the Provider reserves the right to refuse to review the request.",
      "4.5. Responsibility for preserving and/or providing access to the phone number and/or email address lies with the User.",
    ],
  },
  {
    id: "refund",
    title: "5. TICKET RETURN CONDITIONS",
    paragraphs: [
      "5.1. Forced refund for a Ticket:",
      "5.1.1. If the Carrier reports cancellation of a trip for any reason, sole proprietor Yevhen V. Kimlyk refunds the funds received as payment for the Ticket by the same method they were received in the amount of 100% of the Ticket price or, if available, offers another Ticket for a trip operated by the same or another Carrier.",
      "5.2. Voluntary refund:",
      "5.2.1. If the Ticket is returned at the User's own initiative, the Agent refunds the funds to the User without refunding the service fee. The following fee is withheld when returning a ticket:\nVoluntarily, more than 1 hour before departure - 15% of the price is refunded;\nVoluntarily, more than 12 hours before departure - 50% of the price is refunded;\nVoluntarily, more than 24 hours before departure - 75% of the price is refunded;\nVoluntarily, more than 48 hours before departure - 85% of the price is refunded.",
      "5.2.2. Funds or part of the funds, minus mandatory deductions, are returned to the User within 14 days from the date the decision to refund the Ticket is made.",
      "5.2.3. Tickets that were moved to another date at the User's request are not refundable in any form.",
      "5.2.4. When changing the departure date, the User must pay the difference between the original and the new ticket price if the ticket for the new date is more expensive. If the ticket price for the new date is lower than the previous price, the difference is not refunded to the User.",
    ],
  },
  {
    id: "information",
    title: "6. INFORMATION PROVISION CONDITIONS",
    paragraphs: [
      "6.1. To issue and purchase a Ticket on the website https://autoluxplus.com.ua/, certain information must be provided, namely: the passenger's first and last name, address, and phone number.",
      "6.2. When making a purchase, it is also necessary to provide payment information related to bank cards, namely their numbers and expiration dates. This information must be entered for each purchase on the secure service of the selected payment system.",
    ],
  },
  {
    id: "guarantees",
    title: "7. GUARANTEES OF THE PARTIES",
    paragraphs: [
      "7.1. By making a purchase through the website https://autoluxplus.com.ua/, the User confirms their legal capacity and gives consent to the processing of their personal data.",
      "7.2. The Agent undertakes not to use the User's personal data for sending materials unrelated to the Services provided by the Provider, not to transfer personal data to third parties, and not to use it for any other purpose.",
      "7.3. The User agrees to pay the price of the Ticket and applicable taxes for all purchases made and paid for by credit or debit cards or by another permitted payment method.",
      "7.4. The User agrees to pay all amounts determined by the Provider if the payment has not been completed, has been returned, or has been declined by the User's bank.",
      "7.5. By selling a Ticket through the website https://autoluxplus.com.ua/, the Provider confirms that it has the right to sell the given Ticket in accordance with the conditions and obligations established by the Carrier.",
      "7.6. The Provider reserves the right, at its own discretion, to block credit and debit cards in case of suspicious activity.",
    ],
  },
  {
    id: "confidentiality",
    title: "8. CONFIDENTIAL INFORMATION",
    paragraphs: [
      "8.1. The User confirms their agreement that they bear personal responsibility for the confidential information provided for storage.",
      "8.2. The Provider is not liable for any losses caused by unauthorized use of confidential information left by the User.",
      "8.3. All personal information received by the Provider as a result of orders placed through the website is stored in accordance with the current legislation on confidentiality.",
      "8.4. The Provider reserves the right to use and disclose information about the User or about orders made by the User, subject to confidentiality compliance.",
    ],
  },
  {
    id: "intermediary",
    title: "9. We, sole proprietor Yevhen V. Kimlyk, act as an intermediary for the sale of tickets for trips operated by other carriers through our website https://autoluxplus.com.ua/",
    paragraphs: [
      "9.1. Specifics of selling tickets of other carriers: sole proprietor Yevhen V. Kimlyk sells tickets for trips operated by other carriers acting as a sales intermediary. Users who purchase tickets for trips of other carriers through our website or app agree to the terms of this section.",
      "9.2. Bonus program: No bonuses are accrued for the purchase of tickets for trips operated by other carriers.",
      "9.3. Ticket refunds: The refund conditions for tickets purchased for trips of other carriers may differ from the refund conditions for tickets for trips of Autolux-Cherkasy-Plus LLC. All details and requirements for returning such tickets are provided to the User during checkout or can be clarified through customer support.",
      "9.4. Users undertake to comply with the safety and conduct rules established by the carrier for the selected trip. In case of violations of these rules, the carrier has the right to refuse transportation without refunding the ticket price.",
    ],
  },
  {
    id: "personal-data",
    title: "10. CONSENT TO PERSONAL DATA PROCESSING",
    paragraphs: [
      "10.1. The User gives consent and confirms that the data specified by them when purchasing the Ticket is truthful, and that the User has the right to provide such data when purchasing the Ticket and leave it for further processing and storage, including but not limited to:\n- transfer to a third party that is in any way connected with this Agreement or for the purpose of its full performance;\n- additional informing of the User about the status of the trip, changes in its conditions;\n- further processing of the User's orders;\n- receiving service messages, including those about promotions, bonus programs, and discounts conducted by the Provider.",
    ],
  },
  {
    id: "responsibility",
    title: "11. LIABILITY OF THE PARTIES",
    paragraphs: [
      "11.1. In case of non-performance or improper performance by one of the Parties of obligations under the Agreement, the guilty Party shall compensate the other Party for damages caused and proven by such actions.",
      "11.2. The User is personally responsible for compliance with the conditions and rules of the selected Carrier and of the Agreement. ATTENTION! This Agreement governs only the conditions of purchasing the Ticket selected by the User, which in turn serves as confirmation of the conclusion of the transportation agreement.",
    ],
  },
  {
    id: "disclaimer",
    title: "12. DISCLAIMER OF LIABILITY OF THE PARTIES",
    paragraphs: [
      "12.1. The User understands and agrees that the Provider bears no responsibility for any direct, indirect, incidental, or punitive damages, as well as for inconveniences related to the performance of transportation (including but not limited to trip delays, trip cancellations, missed connections) or any other possible problems arising from visiting or using the Website/App.",
      "12.2. The Provider is not liable for losses and damages incurred by the User during the trip.",
      "12.3. The User agrees that access to goods and services, as well as information about bus transportation available on the website https://autoluxplus.com.ua/, is obtained at the User's own risk.",
      "12.4. The Provider is not liable for damages and/or loss of a ticket for any type of transport, or for damages incurred by the User as a result of the bus arriving late to the point where the User was supposed to transfer, including tickets purchased within one order through the website https://autoluxplus.com.ua/.",
    ],
  },
  {
    id: "claims",
    title: "13. CLAIMS AND JURISDICTION",
    paragraphs: [
      "13.1. A pre-trial claim procedure is not mandatory.",
      "13.2. If one of the Parties breaches the terms of the Agreement, the other Party has the right to apply to a court. The court venue is determined in accordance with the current legislation of Ukraine.",
      "13.3. All matters relating to relations between the Parties that are not regulated by this Agreement shall be governed by the current legislation of Ukraine. ATTENTION! If the terms of the transportation agreement are violated, the Carrier that actually operated the trip is liable for the conditions specified in the Ticket (date, time of departure/arrival, place of boarding/disembarking).",
    ],
  },
  {
    id: "final",
    title: "14. FINAL PROVISIONS",
    paragraphs: [
      "14.1. The Agreement number corresponds to the number of the Ticket purchased by the User. The date of conclusion of the Agreement is the date of payment for the selected Ticket.",
    ],
  },
  {
    id: "requisites",
    title: "15. DETAILS OF THE PARTIES",
    paragraphs: [
      "15.1. Sole proprietor Yevhen V. Kimlyk, 2220902158, Svydivok village, Cherkasy district, Cherkasy region 19622, Ukraine\n+380990782021\n+380939660940\n+380974802428\nhttps://autoluxplus.com.ua/",
      "15.2. Passenger details: the Customer enters their details using the online resource in the registration electronic form at the stage of generating the electronic ticket.",
    ],
  },
];

const ukContent: PublicOfferContent = {
  title: "ДОГОВІР ПУБЛІЧНОЇ ОФЕРТИ",
  breadcrumbsAria: "Навігація сторінки публічної оферти",
  introduction: ukIntroduction,
  sections: ukSections,
};

const enContent: PublicOfferContent = {
  title: "PUBLIC OFFER AGREEMENT",
  breadcrumbsAria: "Public offer page navigation",
  introduction: enIntroduction,
  sections: enSections,
};

export const publicOfferContent: Record<Locale, PublicOfferContent> = {
  uk: ukContent,
  en: enContent,
};
