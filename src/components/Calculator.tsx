/* eslint-disable no-unused-expressions */
/* eslint-disable prefer-template */
/* eslint-disable react/button-has-type */
/* eslint-disable no-shadow */
/* eslint-disable no-restricted-globals */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/function-component-definition */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from "react";
import { HistoryOutlined } from "@ant-design/icons";
import { evaluate } from "mathjs";
import styles from "./Calculator.module.css";
import buttons from "../buttons";

const Calculator: React.FC = () => {
  const [expression, setExpression] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const endsWithOperator = (expression: string) => {
    const operators = ["+", "-", "*", "/"];
    return operators.includes(expression.slice(-1));
  };

  const handleClick = (value: string) => {
    if (value === "CE") {
      setExpression("");
      return;
    }

    if (value === "+" || value === "-" || value === "*" || value === "/") {
      if (expression === "" || endsWithOperator(expression)) {
        setExpression(expression.slice(0, -1) + value);
      } else {
        setExpression(expression + value);
      }
    } else {
      setExpression(expression + value);
    }
  };

  const handleCalculate = () => {
    try {
      if (!expression) {
        return;
      }
      const result = +evaluate(expression).toFixed(6);
      if (result !== result) {
        setExpression("Error");
      } else {
        setHistory([...history, expression + " = " + String(result)]);
        setExpression(result.toString());
      }
    } catch (error) {
      console.log(error);

      setExpression("Error");
    }
  };

  function negate() {
    if (expression[0] === "-") {
      setExpression((prev) => prev.slice(1));
      return;
    }
    setExpression((prev) => "-".concat(prev));
  }

  const getFunctionButton = (type: string, value: string): any => {
    if (type === "handleClick") {
      return handleClick(value);
    }
    if (type === "handleCalculate") {
      return handleCalculate();
    }
    if (type === "negate") {
      return negate();
    }
    return null;
  };

  useEffect(() => {
    const keyboardInput = (event: any) => {
      console.log(event);

      switch (event.key) {
        case "h":
          setShowHistory((prev) => !prev);
          break;
        case "n":
          negate();
          break;
        case "Backspace":
          if (expression === "Error") {
            setExpression("");
            break;
          }
          setExpression(expression.slice(0, expression.length - 1));
          break;
        case "Enter":
          handleCalculate();
          break;
        case "+":
          handleClick("+");
          break;
        case "-":
          handleClick("-");
          break;
        case "*":
          handleClick("*");
          break;
        case "/":
          handleClick("/");
          break;
        case "c":
          handleClick("CE");
          break;
        case "0":
          handleClick("0");
          break;
        case "1":
          if (event.altKey) {
            break;
          }
          handleClick("1");
          break;
        case "2":
          handleClick("2");
          break;
        case "3":
          handleClick("3");
          break;
        case "4":
          handleClick("4");
          break;
        case "5":
          handleClick("5");
          break;
        case "6":
          handleClick("6");
          break;
        case "7":
          handleClick("7");
          break;
        case "8":
          handleClick("8");
          break;
        case "9":
          handleClick("9");
          break;
        case ".":
          handleClick(".");
          break;
        case "(":
          handleClick("(");
          break;
        case ")":
          handleClick(")");
          break;

        default:
          break;
      }
    };

    window.addEventListener("keydown", keyboardInput);
    return () => {
      window.removeEventListener("keydown", keyboardInput);
    };
  });

  return (
    <>
      <div className={styles.calc}>
        <div
          className={styles.calcHistoryBtn}
          onClick={() =>
            showHistory ? setShowHistory(false) : setShowHistory(true)
          }
        >
          <HistoryOutlined
            style={{
              color: "#f0f5ff",
              fontSize: "35px",
              margin: "auto",
            }}
          />
        </div>

        <div className={styles.calc_window}>
          <p className={styles.window_result}>{expression}</p>
        </div>
        <div className={styles.calc_actions}>
          {buttons.map((item) => {
            let extraClass = "";
            if (item.classname === "result" || item.classname === "plus") {
              extraClass = styles.plus;
            }
            return (
              <button
                className={`${styles.action} ${extraClass}`}
                onClick={() => getFunctionButton(item.type, item.value)}
                key={item.value}
              >
                <p>{item.value}</p>
              </button>
            );
          })}
        </div>
        <div
          className={showHistory ? styles.calcHistory : styles.calcHistoryNone}
        >
          {history.map((item) => {
            return <li>{item}</li>;
          })}
        </div>
      </div>
    </>
  );
};

export default Calculator;

