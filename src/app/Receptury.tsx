"use client";
import MyCombobox from "@/components/forms/Combobox";
import {
  ArrowDownwardAltIcon,
  CalendarViewMontsIcon,
  CancelIcon,
  TuneIcon,
} from "@/components/icons";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import Paginator from "@/components/ui/Paginator";
import RecipeCardsGrid from "@/components/ui/RecipeCardsGrid";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

export default function Receptury({ initialData }: { initialData: any }) {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [gridView, setGridView] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const paramsHook = useSearchParams();
  const urlParams = decodeURIComponent(
    paramsHook.toString().replaceAll("+", " ")
  );
  const urlParamsSplitted = urlParams.split("&");
  const router = useRouter();

  function returnPage() {
    const urlParam = paramsHook.get("stranka");
    if (urlParam) return parseInt(urlParam);
    return 1;
  }

  function splitUrlParams(param: string) {
    const [key, prevalues] = param.split("=");
    const values = prevalues ? prevalues.split(",") : "";
    return [key, values, prevalues];
  }

  useEffect(() => {
    if (sideBarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [sideBarOpen]);

  const sideBarValues = useMemo(() => {
    // Základní filtry
    const holder = [
      {
        title: "Obecné",
        name: "obecne",
        options: [
          { title: "Moje oblíbené recepty", name: "moje", checked: false },
          { title: "Nutričně ověřeno", name: "nutricni", checked: false },
          { title: "Stáhnout do skladu", name: "sklad", checked: false },
          {
            title: "Zobrazit videorecepty",
            name: "videorecepty",
            checked: false,
          },
        ],
      },
      {
        title: "Speciální strava",
        name: "special",
        options: [
          { title: "Bezlepková", name: "bezlepkova", checked: false },
          { title: "Bezmléčná", name: "bezmlecna", checked: false },
          { title: "Šetřící", name: "setrici", checked: false },
        ],
      },
      {
        title: "Způsob přípravy",
        name: "priprava",
        options: [
          { title: "Vařené", name: "varene", checked: false },
          { title: "Dušené", name: "dusene", checked: false },
          { title: "Pečené", name: "pecene", checked: false },
          { title: "Zapečené", name: "zapecene", checked: false },
          { title: "Smažené", name: "smazene", checked: false },
          { title: "ostatní", name: "ostatni", checked: false },
        ],
      },
    ];
    // Načte hodnoty z URL
    urlParamsSplitted.forEach((param) => {
      const [key, values] = splitUrlParams(param);
      const box = holder.find((b) => b.name === key);
      if (box && Array.isArray(values)) {
        values.forEach((v) => {
          const option = box.options.find((o) => o.name === v);
          if (option) {
            option.checked = true;
          }
        });
      }
    });

    return holder;
  }, [urlParamsSplitted]);
  const comboBoxValues = useMemo(() => {
    const holder = [
      {
        title: "Dle receptury",
        name: "receptura",
        value: "",
        options: ["Receptura 1", "Receptura 2"],
      },
      {
        title: "Dle suroviny",
        name: "surovina",
        value: "",
        options: ["Surovina 1", "Surovina 2"],
      },
    ];
    // Načte hodnoty z URL
    urlParamsSplitted.forEach((param) => {
      const [key, values] = splitUrlParams(param);
      const comboBox = holder.find((b) => b.name === key);
      if (comboBox) {
        comboBox.value = values[0];
      }
    });
    return holder;
  }, [urlParamsSplitted]);
  let pageValue = useRef(returnPage());

  function updateSideBarValue(
    boxIndex: number,
    checkboxIndex: number,
    checked: boolean
  ) {
    sideBarValues[boxIndex].options[checkboxIndex].checked = checked;
    updateQuery();
  }

  function updatePage(page: number) {
    pageValue.current = page;
    updateQuery();
  }

  function updateCombobox(index: number, value: string) {
    comboBoxValues[index].value = value;
    updateQuery();
  }

  // vytvoří url parametry podle comboBoxů, pak podle checkboxů, pak přidá stránku a nahraje do routeru, pak refreshne vše
  function updateQuery() {
    let query = "";

    comboBoxValues.forEach((combo) => {
      if (combo.value === "") return;
      if (query === "") query += combo.name + "=" + combo.value;
      else query += "&" + combo.name + "=" + combo.value;
    });

    let hasBox = false;
    sideBarValues.forEach((box) => {
      let hasOption = false;
      box.options.forEach((option) => {
        if (!option.checked) return;
        if (!hasBox) {
          hasBox = true;
          if (!hasOption) {
            if (query !== "") {
              query += "&";
            }
            query += box.name + "=" + option.name;
          } else {
            query += "," + option.name;
          }
          hasOption = true;
        } else {
          if (!hasOption) {
            query += "&" + box.name + "=" + option.name;
          } else {
            hasOption = true;
            query += "," + option.name;
          }
        }
      });
    });

    if (pageValue.current !== 1) {
      if (query === "") {
        query = "stranka=" + pageValue.current;
      } else {
        query += "&stranka=" + pageValue.current;
      }
    }

    setRefresh(!refresh);

    router.replace("?" + query, { scroll: false });
  }

  function returnSelectedValues() {
    const allValues: any = { comboBoxes: {}, sideBar: {} };
    const allComboValues: any = {};
    const allSelectedBoxes: string[] = [];
    comboBoxValues.forEach((combo) => {
      allComboValues[combo.name] = combo.value;
      if (combo.value !== "") {
        allValues.comboBoxes[combo.name] = combo;
      }
    });
    sideBarValues.forEach((box) =>
      box.options.map((option) => {
        if (option.checked) {
          allSelectedBoxes.push(option.name);
          if (!allValues.sideBar[box.name]) {
            allValues.sideBar[box.name] = [option.name];
          } else {
            allValues.sideBar[box.name].push(option.name);
          }
        }
      })
    );
    return [allValues, allComboValues, allSelectedBoxes];
  }

  const easyReturned = returnSelectedValues();

  function Comboboxes({ className = "" }: { className: string }) {
    return (
      <div className={`${className}`}>
        {comboBoxValues.map((combo, index) => (
          <MyCombobox
            key={"cbvmy" + index}
            label={combo.title}
            name={combo.name}
            options={combo.options}
            selectedOption={combo.value}
            onChange={(value: string) => updateCombobox(index, value)}
          />
        ))}
      </div>
    );
  }

  function TopRow() {
    return (
      <div className="flex flex-row items-center justify-between py-7">
        <div className="flex flex-col">
          <Heading>Receptury</Heading>
          <p className="pt-3 font-bold text-black">
            Našli jsme pro vás {data.length} receptů
          </p>
        </div>
        <Comboboxes className="hidden flex-row gap-x-5 md:flex" />

        <button
          className="hidden w-[150px] items-center gap-x-1 font-bold md:flex"
          onClick={() => setGridView(!gridView)}
        >
          {gridView ? (
            <>
              zobrazit řádky <CalendarViewMontsIcon />
            </>
          ) : (
            <>
              zobrazit mřízku <CalendarViewMontsIcon />
            </>
          )}
        </button>
        <Button
          variant="black"
          className="h-min md:hidden"
          onClick={() => setSideBarOpen(!sideBarOpen)}
        >
          Filtry <TuneIcon />
        </Button>
      </div>
    );
  }

  function SideBar() {
    return (
      <div
        className={`z-fixed flex flex-col p-7 md:mr-5 md:block md:pl-0 md:pr-3 ${
          sideBarOpen ? "fixed inset-0 bg-white" : "hidden"
        }`}
      >
        <div className="flex flex-row justify-between md:hidden">
          <Heading size="xs">Co hledáte?</Heading>
          <button onClick={() => setSideBarOpen(false)}>
            <CancelIcon />
          </button>
        </div>
        <Comboboxes className="my-8 flex flex-col gap-y-5 md:hidden" />
        {sideBarValues.map((box, index) => (
          <SideBarBox
            key={"ffsbb" + index}
            title={box.title}
            options={box.options}
            bIndex={index}
          />
        ))}
      </div>
    );
  }

  function SideBarBox({
    title,
    bIndex,
    options,
  }: {
    title: string;
    bIndex: number;
    options: any[];
  }) {
    const [open, setOpen] = useState(true);
    return (
      <div className="border-t border-primary-200 py-2">
        <div className="flex flex-row justify-between">
          <Heading as="h3" size="xs">
            {title}
          </Heading>
          <button onClick={() => setOpen(!open)}>
            <ArrowDownwardAltIcon className={`${!open && "rotate-180"}`} />
          </button>
        </div>
        {open && (
          <ul>
            {options.map((o: any, oIndex: number) => (
              <li
                key={"sbbo" + oIndex}
                className={`cursor-pointer ${o.checked && "bg-primary"}`}
                onClick={() => updateSideBarValue(bIndex, oIndex, !o.checked)}
              >
                {o.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  const data = useMemo(() => {
    const updatedData = [
      {
        title: `${Object.values(easyReturned[1])
          .map((combo, index) => `C${index + 1}: ${combo}`)
          .join(" | ")} | Page: ${pageValue.current}`,
        badges: easyReturned[2].slice(0, 2),
      },
      ...initialData,
    ];

    return updatedData;
  }, [easyReturned, pageValue, initialData]);

  /*  */
  return (
    <Container className="border-y-2 border-primary-200 py-6">
      <TopRow />
      <div className="block md:grid md:grid-cols-6">
        <SideBar />
        <RecipeCardsGrid
          className="col-span-5 pt-0"
          cardsInGrid={gridView ? 5 : 0}
          gridView={gridView}
          isLoading={isLoading}
          data={data}
        />
      </div>
      <Paginator
        currentPage={pageValue.current}
        totalPages={25}
        changePage={(page) => updatePage(page)}
      />
    </Container>
  );
}