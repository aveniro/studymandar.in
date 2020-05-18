import {h} from 'preact';

import {wordsState} from 'state/words';

import Table from '@/ui/Table';

import '#/component/Words.scss';

export default function Words(_) {
    return (
        <div className="words-view">
            <Table onSelect={_.onTableWordSelect}
                dynamicRows={wordsState} columns={[
                    'script=Chinese Script', 
                    'pinyin=Pinyin', 
                    'translation=Translation', 
                    'ocrRatio=OCR Ratio',
                    'vocabRatio=Vocab Ratio']} />
        </div>
    );
}