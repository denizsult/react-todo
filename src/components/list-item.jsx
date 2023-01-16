import { Checkbox } from "./checkbox";

const isItemChecked = (item) =>
  item.checked ? (
    <strike className="text-gray-300">{item.title}</strike>
  ) : (
    <span>{item.title}</span>
  );

export const ListItem = ({
  item,
  index,
  handleRemoveItem,
  handleCheckedItem,
  handleDragStart,
  handleDragOver,
  handleDrop,
}) => {
  return (
    <li
      onDragStart={(e) =>handleDragStart(e, index)}
      onDragOver={(e) => handleDragOver(e, index)} 
      onDrop={(e) => handleDrop(e, index)}
      draggable
      className="flex gap-2 items-center justify-between p-4 relative"
    >
      <div
        className="flex gap-2 items-center cursor-pointer w-full break-words whitespace-pre-line	"
        onClick={() => handleCheckedItem(item)}
      >
        <Checkbox checked={item.checked} />
        {isItemChecked(item)}
      </div>
      <a
        href="#!"
        className="flex justify-center"
        onClick={() => handleRemoveItem(item)}
      >
        <ion-icon
          style={{ fontSize: "1.5rem" }}
          className=""
          name="close-outline"
        ></ion-icon>
      </a>
      <span className="absolute left-0 bottom-1 w-full h-[1px] bg-gray-300"></span>
    </li>
  );
};
