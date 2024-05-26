import { IDish } from "@/interfaces";
import useStore from "@/store";
import React, { useEffect, useState } from "react";
import { CiMicrophoneOn } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";
import { FaMicrophoneLines } from "react-icons/fa6";
import SearchItem from "./searchItem";

const SearchBar = () => {
  const { menu, setActiveDish } = useStore();
  const [voiceTypingOn, setVoiceTypingOn] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [filteredDishes, setFilteredDishes] = useState<IDish[]>([]);

  useEffect(() => {
    const id = setTimeout(() => setDebouncedSearchTerm(searchTerm), 500);
    return () => clearTimeout(id);
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedSearchTerm && menu) {
      const results: IDish[] = [];

      Object.values(menu).forEach((category) => {
        category.dishes.forEach((dish) => {
          if (
            dish.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
          ) {
            results.push(dish);
          }
        });
      });

      setFilteredDishes(results);
    } else {
      setFilteredDishes([]);
    }
  }, [debouncedSearchTerm, menu]);

  const handleVoiceTyping = () => {
    const SpeechRecognition =
      //@ts-ignore
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const SpeechGrammarList =
      //@ts-ignore
      window.SpeechGrammarList || window.webkitSpeechGrammarList;
    if (!menu) return;
    const dishes: string[] = [];
    Object.values(menu).forEach((category) => {
      dishes.push(...category.dishes.map((d) => d.name));
    });
    const grammar = `#JSGF V1.0; grammar dishes; public <dish> = ${dishes.join(
      " | "
    )};`;
    const recognition = new SpeechRecognition();
    const speechRecognitionList = new SpeechGrammarList();
    speechRecognitionList.addFromString(grammar, 1);
    recognition.grammars = speechRecognitionList;
    recognition.continuous = false;
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = (event: any) => {
      let word = event.results[0][0].transcript;
      setSearchTerm(word);
    };
    if (voiceTypingOn) recognition.start();
    else recognition.stop();
    setVoiceTypingOn((vt) => !vt);
  };

  return (
    <div className="relative w-full">
      <label htmlFor="voice-search" className="sr-only">
        Search
      </label>
      <div className="relative w-full">
        <div className="absolute flex left-3 items-center center-absolute pointer-events-none">
          <FaSearch color="#777" fontSize={14} />
        </div>
        <input
          type="search"
          id="default-search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full px-2 py-2 ps-10 text-sm text-black border border-[#777] rounded-lg bg-transparent focus:outline-none"
        />
        <button
          type="button"
          className="absolute inset-y-0 end-0 flex items-center pe-3"
          onClick={handleVoiceTyping}
        >
          <CiMicrophoneOn fontSize={18} />
        </button>
        {filteredDishes.length > 0 && (
          <ul className="absolute z-10 w-full bg-white border no-scrollbar border-gray-300 rounded-lg mt-1 max-h-60 overflow-y-auto">
            {filteredDishes.map((dish) => (
              <>
                <li
                  key={dish._id}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => {
                    setSearchTerm("");
                    setDebouncedSearchTerm("");
                    setActiveDish(dish);
                  }}
                >
                  <SearchItem dish={dish} />
                </li>
                <hr className="m-0" />
                <hr />
              </>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
