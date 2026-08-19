import { useState } from "react";

function generateTicket(length) {
  return Array.from({ length }, () => Math.floor(Math.random() * 10));
}

function Ticket({ values }) {
  return <div className="ticket" aria-label={`Lottery ticket ${values.join(" ")}`}>{values.map((value, index) => <span key={`${index}-${value}`}>{value}</span>)}</div>;
}

export default function Lottery({ winningSum, ticketLength }) {
  const [ticket, setTicket] = useState(() => generateTicket(ticketLength));
  const sum = ticket.reduce((total, value) => total + value, 0);

  return (
    <div className="center-card">
      <h2>Lottery game</h2>
      <Ticket values={ticket} />
      <p className={sum === winningSum ? "winner" : ""}>Sum: {sum} {sum === winningSum && "— You won!"}</p>
      <button onClick={() => setTicket(generateTicket(ticketLength))}>Buy a new ticket</button>
    </div>
  );
}
