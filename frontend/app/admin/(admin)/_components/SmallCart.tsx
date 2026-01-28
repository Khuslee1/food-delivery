import { foodType, orderType } from "./TableComp";
type propsType = { el: foodType };
export const SmallCart = ({ el }: propsType) => {
  return (
    <div className="flex w-full  gap-2.5">
      <img src={el.foodId.image} className="h-8 w-8 rounded" />
      <div className="flex justify-between w-full">
        {el.foodId.name} <span>x{el.quantity}</span>
      </div>
    </div>
  );
};
