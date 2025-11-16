// import DialogEditInfor from "./DialogEditInfor";
import DialogEditPassword from "./DialogEditPassword";

function ButtonGroup() {
  return (
    <div className="flex flex-col mt-2 gap-2">
      <DialogEditPassword />
      {/* <DialogEditInfor firstName="" /> */}
    </div>
  );
}

export default ButtonGroup;
