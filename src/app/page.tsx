import Inspirace from "./Inspirace";
import Receptury from "./Receptury";
import Spolupracujeme from "./Spolupracujeme";
import VolitelnyObsah from "./VolitelnyObsah";

export default async function Home() {
  let data: any = [
    {
      title: "Smažené kuřecí řízečky, bramborové placičky",
      badges: ["Smažené", "Oblíbené"],
    },
    {
      title: "Fusilli s mediteránskou omáčkou a smaženým sumečkem",
      badges: ["Dieta", "Ryba a mořské plody"],
    },
    {
      title: "Smažené kuřecí řízečky, bramborové placičky",
      badges: ["Smažené", "Oblíbené"],
    },
    {
      title: "Fusilli s mediteránskou omáčkou a smaženým sumečkem",
      badges: ["Dieta", "Ryba a mořské plody"],
    },
    {
      title: "Smažené kuřecí řízečky, bramborové placičky",
      badges: ["Smažené", "Oblíbené"],
    },
    {
      title: "Smažené kuřecí řízečky, bramborové placičky",
      badges: ["Dieta", "Ryba a mořské plody"],
    },
  ];
  // základní fetch kterej chce dodělat
  if (false) {
    const result = await readSome();
    if (result.Result.Status === true) {
      data = result.Vety;
    }
  }
  async function createNew() {
    return await (
      await fetch("/api", {
        method: "POST",
        body: JSON.stringify({
          sid: "12345VIS",
          funkce: "ObecnyDotaz",
          parametry: {
            Tabulka: "Receptury",
            Operace: "Create",
          },
          Hodnoty: {
            CisloReceptury: 421112233,
            Druh: "Svačiny Pomazánky sýrové a tvarohové",
            Nazev: "Jidlo",
            Stav: "Rozpracovaná",
          },
        }),
      })
    ).json();
  }
  async function readSome() {
    return await (
      await fetch(process.env.URL + "/api", {
        method: "POST",
        body: JSON.stringify({
          sid: "12345VIS",
          funkce: "ObecnyDotaz",
          parametry: {
            Tabulka: "Receptury",
            Operace: "Read",
          },
        }),
      })
    ).json();
  }

  return (
    <div className="flex flex-col items-stretch justify-start gap-24 py-32 md:py-48">
      <Inspirace />
      <Receptury initialData={data} />
      <Spolupracujeme />
      <VolitelnyObsah
        title="Volitelný obsah"
        img=""
        text="Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
      />
    </div>
  );
}
