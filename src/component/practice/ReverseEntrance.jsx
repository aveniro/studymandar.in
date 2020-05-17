import {h, render, Component} from 'preact';
import {useState, useCallback, useEffect, useRef} from 'preact/hooks';
import {useStore} from 'effector-react';

import {wordsState, wordsApi} from 'state/words';

import TextInput from '@/ui/TextInput';
import Button from '@/ui/Button';

import '#/component/practice/ReverseEntrance.scss';

export default function ReverseEntrance() {
    const words = useStore(wordsState);

    const chineseRef = useRef(null);

    const getWord = () => {
        return words[Math.floor(Math.random() * words.length)];
    };

    const [word, setWord] = useState(getWord());

    const nextWord = useCallback(() => {
        setWord(getWord());
    }, [word]);

    const check = useCallback(() => {
        if(word.script === chineseRef.current?.value()) {
            wordsApi.vocabCorrect(word);
            alert('Correct');
        } else {
            wordsApi.vocabIncorrect(word);
            alert('False you retard');
        }

        chineseRef.current?.clear();
        nextWord();
    }, [word, nextWord]);

    useEffect(() => {
        chineseRef.current?.focus();
        
        const keydown = e => {
            if(e.key === 'Enter') {
                check();
            }
        };
        document.addEventListener('keydown', keydown);

        return () => {
            document.removeEventListener('keydown', keydown);
        }
    }, [check]);

    return (
        <div className="reverse-entrance">
            <div className="re-question">
                How would you say <span className="character-translation"> "{ word.translation }" </span> in Chinese?
            </div>

            <div className="controls">
                <TextInput ref={chineseRef} title="Chinese" hint="中文" />
                <Button onClick={check} title="Submit" />
            </div>
        </div>
    );
}