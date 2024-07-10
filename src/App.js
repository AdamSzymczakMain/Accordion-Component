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
  const [value, setValue] = useState(0);

  const handelChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <p>How much was the bill?</p>
      <input type="text" value={value} onChange={handelChange} />

      <p>How did you like the serivce?</p>
      <Tip />

      <p>How did your friends like the serivce?</p>
      <Tip />

      <h2>
        You pay {value} (${value} + $0 Tip)
      </h2>

      <button>Reset</button>
    </div>
  );
}

function Tip() {
  return (
    <select>
      <option>Dissatisfield (0%)</option>
      <option>It was ok (5%)</option>
      <option>It was good (10%)</option>
      <option>Amazing (20%)</option>
    </select>
  );
}
