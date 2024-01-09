/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import "./App.css";
import { useState, Suspense, lazy, useEffect } from "react";
import CloseOutlined from "@ant-design/icons/lib/icons/CloseOutlined";
import ExpandOutlined from "@ant-design/icons/lib/icons/ExpandOutlined";
import CompressOutlined from "@ant-design/icons/lib/icons/CompressOutlined";
import { appWindow } from "@tauri-apps/api/window";
import LineOutlined from "@ant-design/icons/lib/icons/LineOutlined";

type IPages = "defaultCalc" | "converterCalc";

const CalculatorComponent = lazy(() => import("./components/Calculator"));
const ConverterComponent = lazy(() => import("./components/Converter"));

function App() {
  const [page, setPage] = useState<IPages>("defaultCalc");
  const [toggleSelect, settoggleSelect] = useState<boolean>(false);
  const [fullscreen, setFullscreen] = useState<boolean>(false);

  const iconStyles = {
    fontSize: "20px",
  };

  function togglePage(page: string) {
    if (toggleSelect) {
      settoggleSelect(false);
    } else {
      settoggleSelect(true);
    }
    if (page === "defaultCalc") {
      setPage("defaultCalc");
    }
    if (page === "converterCalc") {
      setPage("converterCalc");
    }
  }

  useEffect(() => {
    if (fullscreen) {
      appWindow.maximize();
    } else {
      appWindow.unmaximize();
    }
  }, [fullscreen]);

  useEffect(() => {
    const keypress = (event: any) => {
      if (event.altKey && event.code === "Digit1") {
        setPage("defaultCalc");
      }
      if (event.altKey && event.code === "Digit2") {
        setPage("converterCalc");
      }
    };

    window.addEventListener("keydown", keypress);
    return () => {
      window.removeEventListener("keydown", keypress);
    };
  });

  return (
    <>
      <div className="titleBar" data-tauri-drag-region>
        <p data-tauri-drag-region>SMCalc</p>
        <div className="titleBar_buttons">
          <div
            className="titleBar_button titleBar_buttons_minimize"
            onClick={() => appWindow.minimize()}
          >
            <LineOutlined style={iconStyles} />
          </div>
          <div
            className="titleBar_button titleBar_buttons_maximize"
            onClick={() => setFullscreen((prev) => !prev)}
          >
            {fullscreen ? (
              <CompressOutlined style={iconStyles} />
            ) : (
              <ExpandOutlined style={iconStyles} />
            )}
          </div>

          <div
            className="titleBar_button titleBar_buttons_close"
            onClick={() => appWindow.close()}
          >
            <CloseOutlined style={iconStyles} />
          </div>
        </div>
      </div>
      <div className={toggleSelect ? "calcSelect" : "calcSelectNone"}>
        <div className="defaultCalc" onClick={() => togglePage("defaultCalc")}>
          Calculator
        </div>
        <div
          className="converterCalc"
          onClick={() => togglePage("converterCalc")}
        >
          Converter
        </div>
      </div>
      <div
        className="calcBurger"
        onClick={() =>
          toggleSelect ? settoggleSelect(false) : settoggleSelect(true)
        }
      >
        <div className="line" />
        <div className="line" />
        <div className="line" />
      </div>
      <Suspense fallback="Loading...">
        {page === "defaultCalc" ? <CalculatorComponent /> : null}
        {page === "converterCalc" ? <ConverterComponent /> : null}
      </Suspense>
    </>
  );
}

export default App;
