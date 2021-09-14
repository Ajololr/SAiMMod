import React, { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./App.css";

function App() {
  const [a, setA] = useState("3");
  const [r, setR] = useState("1");
  const [m, setM] = useState("5");

  const [ojid, setOjid] = useState("");
  const [dispersion, setDispersion] = useState("");
  const [quadro, setQuadro] = useState("");
  const [ravnomern, setRavnomern] = useState("");
  const [period, setPeriod] = useState("");
  const [aperiod, setAperiod] = useState("");

  const [result, setResult] = useState<{ name: string; count: number }[]>([]);

  let buff: number[] = [];

  const lemer = () => {
    let current = Number(r);
    let isContinue = true;

    while (isContinue) {
      const next = (Number(a) * current) % Number(m);
      const formatted = next / Number(m);

      isContinue = !checkContains(formatted);

      if (!isContinue) {
        const mathOjid =
          buff.reduce((sum, item) => sum + item, 0) / buff.length;
        setOjid(mathOjid.toString());
        console.log(buff);
        const despersionRes =
          buff.reduce((sum, item) => sum + Math.pow(item - mathOjid, 2), 0) /
          (buff.length - 1);

        setDispersion(despersionRes.toString());

        setQuadro((despersionRes ** 0.5).toString());

        const periodStart = buff.indexOf(formatted);

        let k = 0;
        for (let j = 1; j < buff.length; j += 2) {
          if (Math.pow(buff[j - 1], 2) + Math.pow(buff[j], 2) < 1) {
            k++;
          }
        }

        setRavnomern(((2 * k) / buff.length).toString());
        setPeriod((buff.length - periodStart).toString());
        setAperiod(buff.length.toString());

        const delta = 1 / 20;

        const chartData = [];
        for (let i = 0; i < 20; i++) {
          let count = 0;

          buff.forEach((item) => {
            if (item >= i * delta && item < (i + 1) * delta) {
              count++;
            }
          });

          chartData.push({
            name: `${(i * delta).toFixed(2)} - ${((i + 1) * delta).toFixed(2)}`,
            count,
          });
        }

        setResult(chartData);
      } else {
        buff.push(formatted);
        current = next;
      }
    }
  };

  const checkContains = (value: number) => {
    return buff.includes(value);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <p>Enter A:</p>
          <input
            type="number"
            value={a}
            onChange={(e) => setA(e.target.value)}
          />
          <p>Enter R:</p>
          <input
            type="number"
            value={r}
            onChange={(e) => setR(e.target.value)}
          />
          <p>Enter M:</p>
          <input
            type="number"
            value={m}
            onChange={(e) => setM(e.target.value)}
          />
          <button
            style={{
              display: "block",
              width: "110px",
              height: "20px",
              marginTop: "20px",
              marginBottom: "20px",
            }}
            onClick={() => {
              buff = [];
              setDispersion("");
              setOjid("");
              setQuadro("");
              lemer();
            }}
          >
            Calculate
          </button>
        </div>

        <div>
          <p>Mатожидание:</p>
          <input type="number" value={ojid} />
          <p>Дисперсия:</p>
          <input type="number" value={dispersion} />
          <p>Среднеквадратическое отклонение:</p>
          <input type="number" value={quadro} />
          <p>Равномерность:</p>
          <input type="number" value={ravnomern} />
          <p>Апериодичность:</p>
          <input type="number" value={aperiod} />
          <p>Период:</p>
          <input type="number" value={period} />
        </div>
      </div>
      <BarChart width={730} height={250} data={result} margin={{ left: -30 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          minTickGap={0}
          tickMargin={0}
          tickCount={20}
          fontSize={8}
          dataKey="name"
        />
        <YAxis fontSize={8} />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </div>
  );
}

export default App;
