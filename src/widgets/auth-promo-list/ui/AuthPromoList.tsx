type AuthPromoListProps = {
  items: string[];
  listClassName: string;
  itemClassName: string;
};

function renderPromoItemContent(item: string, emphasizeLead: boolean) {
  if (!emphasizeLead) {
    return item;
  }

  const separatorIndex = item.indexOf(":");

  if (separatorIndex === -1) {
    return item;
  }

  const lead = item.slice(0, separatorIndex + 1);
  const description = item.slice(separatorIndex + 1).trim();

  return (
    <>
      <strong>{lead}</strong>{" "}
      {description}
    </>
  );
}

export default function AuthPromoList({
  items,
  listClassName,
  itemClassName,
}: AuthPromoListProps) {
  return (
    <ul className={listClassName}>
      {items.map((item, index) => (
        <li key={item} className={itemClassName}>
          {renderPromoItemContent(item, index === 0)}
        </li>
      ))}
    </ul>
  );
}
