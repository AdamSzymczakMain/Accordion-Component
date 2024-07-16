import { useState } from "react";

const faqs = [
  {
    title: "Where are these chairs assembled?",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.",
  },
  {
    title: "How long do I have to return my chair?",
    text: "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.",
  },
  {
    title: "Do you ship to countries outside the EU?",
    text: "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!",
  },
];

export default function App() {
  return (
    <div>
      <Accordion data={faqs} />
      <TipCalculator />
    </div>
  );
}

function Accordion({ data }) {
  const [curOpen, setCurOpen] = useState(null);

  return (
    <div className="accordion">
      {data.map((el, i) => (
        <AccordionItem
          curOpen={curOpen}
          onOpen={setCurOpen}
          title={el.title}
          num={i}
          key={el.title}
        >
          {el.text}
        </AccordionItem>
      ))}
    </div>
  );
}

function AccordionItem({ num, title, curOpen, onOpen, children }) {
  const isOpen = num === curOpen;

  function handelToggel() {
    onOpen(isOpen ? null : num);
  }

  return (
    <div className={`item ${isOpen ? "open" : ""}`} onClick={handelToggel}>
      <p className="number">{num < 9 ? `0${num + 1}` : num + 1}</p>
      <p className="title">{title}</p>
      <p className="icon">{isOpen ? "-" : "+"}</p>
      {isOpen && <div className="content-box">{children}</div>}
    </div>
  );
}

function TipCalculator() {
  const [value, setValue] = useState("");
  const [percentage1, setpercentage1] = useState(0);
  const [percentage2, setpercentage2] = useState(0);

  const tip = (value * (percentage1 + percentage2)) / 2 / 100;

  function onReset() {
    setValue("");
    setpercentage1(0);
    setpercentage2(0);
  }

  const handelChange = (e) => {
    setValue(Number(e.target.value));
  };

  return (
    <div>
      <p>How much was the bill?</p>
      <input type="text" value={value} onChange={handelChange} />

      <p>How did you like the serivce?</p>
      <Tip percentage={percentage1} onSelcet={setpercentage1} />

      <p>How did your friends like the serivce?</p>
      <Tip percentage={percentage2} onSelcet={setpercentage2} />

      <h2>
        You pay {value + tip} (${value} + ${tip} Tip)
      </h2>

      <button onClick={onReset}>Reset</button>
    </div>
  );
}

function Tip({ percentage, onSelcet }) {
  return (
    <select
      value={percentage}
      onChange={(e) => onSelcet(Number(e.target.value))}
    >
      <option value={0}>Dissatisfield (0%)</option>
      <option value={5}>It was ok (5%)</option>
      <option value={10}>It was good (10%)</option>
      <option value={20}>Amazing (20%)</option>
    </select>
  );
}
