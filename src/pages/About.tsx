import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const items = [
  {
    date: "2024-08-22",
    time: "10:30 AM",
    description: "آج کا دن بہت خوبصورت ہے۔",
  },
  {
    date: "2024-08-22",
    time: "11:00 AM",
    description: "ہم نے بہت محنت کی ہے۔",
  },
  {
    date: "2024-08-22",
    time: "12:45 PM",
    description: "اچھی بات چیت سے مسائل حل ہوتے ہیں۔",
  },
  {
    date: "2024-08-22",
    time: "02:15 PM",
    description: "آپس میں تعاون کرنا ضروری ہے۔",
  },
  {
    date: "2024-08-22",
    time: "03:30 PM",
    description: "ہر مشکل کے بعد آسانی ہے۔",
  },
];

const Typewriter = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (charIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(displayedText + text[charIndex]);
        setCharIndex(charIndex + 1);
      }, 100);

      return () => clearTimeout(timeout);
    }
  }, [charIndex, text, displayedText]);

  return <p>{displayedText}</p>;
};

const About = () => {
  return (
    <div className="w-full h-full flex flex-col justify-start items-start gap-3">
      <Link to="/" className="text-blue-400">
        Go back to home
      </Link>
      <div className="w-full h-fit flex flex-col gap-4 mt-10 px-8">
        {items.map((item, index) => (
          <div key={index}>
            <Typewriter text={item.description} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
