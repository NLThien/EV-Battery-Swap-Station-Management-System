// import DialogEditInfor from "./DialogEditInfor";
import DialogEditPassword from "./DialogEditPassword";
import DialogEditInfor from "./DialogEditInfor";

function ButtonGroup() {
  return (
    <div className="flex flex-col mt-2 gap-2">
      <DialogEditPassword />
      <DialogEditInfor />
    </div>
  );
}

export default ButtonGroup;
