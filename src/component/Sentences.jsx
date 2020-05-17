import {h, render, Component} from 'preact';

import {useStore} from 'effector-react';

import {sentencesState} from 'state/sentences';

import Table from '@/ui/Table';

import '#/component/Sentences.scss';

export default function Words() {
    return (
        <div className="sentences-view">
            <Table dynamicRows={sentencesState} columns={['sentence=Sentence', 'written=Written On', 'exported=Exported']} />
        </div>
    );
}