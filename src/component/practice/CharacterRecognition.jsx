import {h, render, Component} from 'preact';
import {useState, useCallback, useEffect, useRef} from 'preact/hooks';
import {useStore} from 'effector-react';

import {wordsState, wordsApi} from 'state/words';

import {toast} from '@/component/Toaster';

import TextInput from '@/ui/TextInput';
import Button from '@/ui/Button';

import '#/component/practice/CharacterRecognition.scss';

export default function CharacterRecognition() {
    const words = useStore(wordsState);

    const pinyinRef = useRef(null);

    const getWord = () => {
        return words[Math.floor(Math.random() * words.length)];
    };

    const [word, setWord] = useState(getWord());

    const nextWord = useCallback(() => {
        setWord(getWord());
    }, [word]);

    const check = useCallback(() => {
        if(word.pinyin === pinyinRef.current?.value()) {
            wordsApi.ocrCorrect(word);
            toast({title: 'Correct!'});
        } else {
            wordsApi.ocrIncorrect(word);
            toast({title: 'Incorrect!'});
        }

        pinyinRef.current?.clear();
        nextWord();
    }, [word, nextWord]);

    useEffect(() => {
        pinyinRef.current?.focus();
        
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
        <div className="character-recognition">
            <div className="giant-zh-script">{ word.script }</div>

            <div className="controls">
                <TextInput ref={pinyinRef} title="Pinyin" hint="zhong1 wen2" />
                <Button onClick={check} title="Submit" />
            </div>
        </div>
    );
}