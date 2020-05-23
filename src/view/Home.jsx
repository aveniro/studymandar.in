import {h, Fragment}         from 'preact';
import {useCallback, useRef} from 'preact/hooks';
import {useStore}            from 'effector-react';

import {wordsApi}           from 'state/words';
import {menuApi, menuStore} from 'state/ui';

import Viewport from '@/component/Viewport';

import {uid} from '@/uid';

import {toast} from '@/component/Toaster';

import TopBar from '@/component/TopBar';

import WordEdit  from '@/component/WordEdit';
import Words     from '@/component/Words';
import Sentences from '@/component/Sentences';
import SmallMenu from '@/component/SmallMenu';

import '#/view/Home.scss';
import {CharacterRecognition, ReverseEntrance} from '@/component/practice/modalities';
import BigBoyPractice                          from '@/component/practice/BigBoyPractice';

export default function Home() {
    const viewportRef = useRef(null);
    const menuState = useStore(menuStore);

    // Callbacks
    const onWordAdded = useCallback(word => {
        wordsApi.addWord({...word, id: uid(), ocrTested: 0, ocrCorrect: 0, vocabTested: 0, vocabCorrect: 0});
        toast({title: `${word.script} Successfully Added!`});
    });

    const onWordEdited = useCallback(word => {
        wordsApi.updateWord(word);
        viewportRef.current?.goBack();
    });

    const onWordDelete = useCallback(word => {
        wordsApi.deleteWord(word);
        viewportRef.current?.goBack();
        toast({title: `${word.script} Deleted!`});
    });

    const onTableWordSelect = useCallback(word => {
        viewportRef.current?.push(<WordEdit template={word} onWordDelete={onWordDelete} onSubmit={onWordEdited} />);
    });

    const onSelectPractice = useCallback(practice => {
        viewportRef.current?.push(practice.renderable);
    });

    // Menu
    const menuItems = [
        'Words',
        { title: 'Add a word', renderable: <WordEdit onSubmit={onWordAdded} /> },
        { title: 'View all words', renderable: <Words onWordDelete={onWordDelete} onTableWordSelect={onTableWordSelect} /> },

        'Sentences',
        { title: 'View all sentences', renderable: <Sentences /> },

        'Practice',
        { 
            title: 'Do a test', 
            renderable: <SmallMenu
                onSelect={onSelectPractice}
                options={[
                    { title: 'Chinese Practice', renderable: <BigBoyPractice confirmLeave={true} /> },
                    { title: 'Character Recognition', renderable: <CharacterRecognition /> },
                    { title: 'Vocabulary Test', renderable: <CharacterRecognition /> },
                    { title: 'Reverse Entrance Test', renderable: <ReverseEntrance /> }
                ]} />
        },
        { title: 'Writing practice' }
    ];

    return (
        <Fragment>
            <TopBar />
            <div className="home">
                <div data-status={menuState} className="menu">
                    <div className="hamburger">
                        <div className="hamburger-wrapper">
                            <div className="sujetador">
                                <svg data-status={menuState} onClick={menuApi.toggle} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>
                            </div>
                        </div>
                    </div>
                    <div className="menu-items">
                        {menuItems.map(menuItem => {
                            if(typeof menuItem === 'string') {
                                return <div className="menu-title">{menuItem}</div>;
                            } else {
                                return <div onClick={() => { viewportRef.current?.set(menuItem.renderable); menuApi.close(); }} className="menu-item">{menuItem.title}</div>;
                            }
                        })}
                    </div>
                </div>
                <Viewport base={<div>Welcome to chinese helper!</div>} ref={viewportRef} />
            </div>
        </Fragment>
    );
}