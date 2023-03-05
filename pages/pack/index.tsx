import Head from "next/head";
import React, { useEffect, useState } from "react";
import Router from "next/router";
import styles from "../../styles/Home.module.css";
import { Switch } from "@headlessui/react";
import Link from "next/link";
import Header from "../../components/header";

export default function Configure() {
  const [ratioDenom, setRatioDenom] = useState(1);
  const [isSmallDenom, setIsSmallDenom] = useState(true);
  const [max, setMax] = useState(1000);
  const [maxEnabled, setMaxEnabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const a = isSmallDenom ? ratioDenom : 1;
  const b = isSmallDenom ? 1 : ratioDenom;
  const small = Math.round((a / (a + b)) * max);
  const large = Math.round((b / (a + b)) * max);

  function flipRatio() {
    setIsSmallDenom(!isSmallDenom);
  }

  function submit() {
    setLoading(true);
    Router.push(
      `/pack/results?${maxEnabled ? "max=" + max + "&" : ""}${
        "largePercent=" + (b / (a + b)).toPrecision(3)
      }`
    );

    localStorage.setItem(
      "pack-settings",
      JSON.stringify({
        maxEnabled: maxEnabled,
        max: max,
        isSmallDenom: isSmallDenom,
        ratioDenom: ratioDenom,
      })
    );
  }

  useEffect(() => {
    const settingsString = localStorage.getItem("pack-settings");
    const settings = settingsString ? JSON.parse(settingsString) : null;
    if (settings) {
      setMaxEnabled(settings.maxEnabled as boolean);
      setMax(settings.max as number);
      setIsSmallDenom(settings.isSmallDenom as boolean);
      setRatioDenom(settings.ratioDenom as number);
    }
  }, []);

  return (
    <div className="min-h-screen">
      <Head>
        <title>Gachapon Packer</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      {!loading && (
        <>
          <Header />

          <form>
            <main className="max-w-2xl mx-auto outline-gray-900/10 rounded-xl outline-1 outline p-8">
              <h1 className="text-4xl mb-16">Pack Settings</h1>
              <div className="flex justify-between mb-6 items-center">
                <h2 className="font-normal">Enable Maxiumum</h2>
                <Switch
                  checked={maxEnabled}
                  onChange={setMaxEnabled}
                  className={`${
                    maxEnabled ? "bg-orange-500" : "bg-gray-300"
                  } relative inline-flex h-6 w-11 items-center rounded-full`}
                >
                  <span className="sr-only">Enable max</span>
                  <span
                    className={`${
                      maxEnabled ? "translate-x-6" : "translate-x-1"
                    } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                  />
                </Switch>
              </div>

              <div
                className={`flex justify-between mb-8 items-center ${
                  maxEnabled ? "" : "disabled opacity-50"
                }`}
              >
                <h2 className="font-normal">Maxiumum Number of Gachapons</h2>

                <input
                  type="number"
                  value={max}
                  disabled={!maxEnabled}
                  max={10000}
                  min={1}
                  className="basis-32  text-lg text-right bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  onChange={(e) => setMax(parseInt(e.target.value))}
                />
              </div>

              <div className={`flex justify-between mb-6 items-center gap-2`}>
                <h2 className="font-normal ">Ratio</h2>
                <div className="flex gap-4 items-center">
                  <button
                    type="button"
                    onClick={(e) => flipRatio()}
                    className="py-2.5 px-4 rounded-md text-orange-600 border border-1 border-orange-300 hover:border-orange-300 text-base font-semibold"
                  >
                    Flip
                  </button>

                  <div>
                    <p className=" absolute -translate-y-5 text-sm text-gray-700 text-center">
                      Small Box
                    </p>
                    <input
                      type="number"
                      value={isSmallDenom ? ratioDenom : 1}
                      disabled={!isSmallDenom}
                      max={10}
                      min={0}
                      className={`${
                        isSmallDenom ? "" : "opacity-50"
                      } text-lg text-right bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block max-w-[8em] w-full p-2.5`}
                      onChange={(e) => setRatioDenom(parseInt(e.target.value))}
                    />
                  </div>
                  <p className="font-bold text-xl ">:</p>

                  <div>
                    <p className="absolute -translate-y-5 text-sm text-gray-700 text-center">
                      Large Box
                    </p>
                    <input
                      type="number"
                      value={isSmallDenom ? 1 : ratioDenom}
                      disabled={isSmallDenom}
                      max={10}
                      min={0}
                      className={`${
                        !isSmallDenom ? "" : "opacity-50"
                      } text-lg text-right bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block max-w-[8em] w-full p-2.5`}
                      onChange={(e) => setRatioDenom(parseInt(e.target.value))}
                    />
                  </div>
                </div>
              </div>

              <table className="w-full mt-16">
                <thead>
                  <tr className="text-left">
                    <th>Estimated Small Boxes</th>
                    <th>Estimate Large Boxes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{maxEnabled ? small : "?"}</td>
                    <td>{maxEnabled ? large : "?"}</td>
                  </tr>
                </tbody>
              </table>

              <button
                type="submit"
                className="p-2.5 rounded-md text-orange-600 tracking-wide bg-orange-200/50 hover:bg-orange-200/60  text-lg font-bold w-full mt-8"
                onClick={submit}
              >
                Pack!
              </button>
            </main>
          </form>
        </>
      )}
      {loading && (
        <div
          style={{
            display: "flex",
            height: "100vh",
            alignItems: "center",
            width: "100vw",
            flexWrap: "wrap",
            alignContent: "center",
          }}
        >
          <h1 style={{ flexBasis: "100%", textAlign: "center" }}>Packing</h1>
          <h3 style={{ flexBasis: "100%", textAlign: "center" }}>
            This may take a minute...
          </h3>
        </div>
      )}
    </div>
  );
}
