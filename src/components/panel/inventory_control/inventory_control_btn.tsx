import { Button } from "@mui/material";

function Inventory_control_btn(props: any) {
  const { postdata } = props;

  let data;
  const handleSubmitGroup = async (event: any) => {
    event.preventDefault();

    await fetch("http://etokco.ir/Stock/EditMultipleStocks", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify((data = postdata)),
    }).then((response) => response.json());
  };
  return (
    <>
      <div className="w-[100%] h-fit flex justify-end pb-2">
        <Button
          sx={{
            bgcolor: "#652D0D",
            ":hover": {
              bgcolor: "#652d0dd1", // theme.palette.primary.main
              color: "white",
            },
          }}
          onClick={handleSubmitGroup}
          variant="contained"
        >
          ذخیره تغیرات
        </Button>
      </div>
    </>
  );
}

export default Inventory_control_btn;
