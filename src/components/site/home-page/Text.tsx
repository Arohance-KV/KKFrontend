import { useState } from "react";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { getDiamondPrice } from "../../../utils/CalculateTotal";

export default function HoverText() {



  return (
    <div className="flex justify-center flex-col gap-4 items-center h-screen bg-[#f6f0e6]">
      {/* karat, netWeight, diamondWeight, solitareWeight, multiDiaWeight */}
      {/* <div className="w-"> */}

        <Input id="karat" className="w-[200px]" placeholder="Karats" type="number"/>
        <Input id="net-weight" placeholder="Net weight" className="w-[200px]" type="number"/>
        {/* <Input id="diamond-weight" placeholder="Diamond weight" className="w-[200px]" type="number"/> */}
        <Input id="solitare-weight" placeholder="Solitare weight" className="w-[200px]" type="number"/>
        <Input id="multidiamond-weight" placeholder="Multi diamond weight" className="w-[200px]" type="number"/>
        <Button onClick={() => {
          const result = getDiamondPrice({karat: parseFloat(document.getElementById("karat").value), netWeight: parseFloat(document.getElementById("net-weight").value), solitareWeight: parseFloat(document.getElementById("solitare-weight").value), multiDiaWeight: parseFloat(document.getElementById("multidiamond-weight").value) })
          alert(`total price = ₹${result}`);
          // console.log(parseFloat(document.getElementById("karat").value), parseFloat(document.getElementById("net-weight").value), parseFloat(document.getElementById("net-weight").value), parseFloat(document.getElementById("solitare-weight").value), document.getElementById("multidiamond-weight").value);
        }}>Calculate</Button>
      {/* </div> */}
    </div>
  );
}
