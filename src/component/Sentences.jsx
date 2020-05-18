import {h} from 'preact';

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