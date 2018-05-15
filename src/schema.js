import {
  Schema
} from 'prosemirror-model';

export default new Schema({
  nodes: {
    doc: {
      content: 'block+',
      attrs: {},
    },
    'paragraph-wrapper': {
      group: 'block',
      selectable: false,
      content: 'para*',
      toDOM: () => ['p', {}, 0],
    },
    paragraph: {
      selectable: false,
      attrs: {
        id: {
          default: 'para-id'
        },
      },
      group: 'para',
      content: 'chunk*',
      marks: '_',
      toDOM: () => [
        'p',
        {
          style: 'white-space:pre-wrap',
        },
        0,
      ],
    },
    chunk: {
      selectable: false,
      group: 'chunk',
      content: 'text*',
      marks: '_',
      toDOM: () => [
        'span',
        {
          // style: 'border: 1px solid red',
        },
        0,
      ],
    },
    text: {
      inline: true,
      group: 'inline',
      marks: '_',
    },
  },
  marks: {
    entity: {
      attrs: {
        id: {
          default: 'span-id'
        },
        confidence: {
          default: null
        },
      },
      inclusive: true,
      toDOM: () => [
        'span',
        {
          // style: 'border: 1px solid #e1e1e1',
        },
      ],
    },
  },
});
