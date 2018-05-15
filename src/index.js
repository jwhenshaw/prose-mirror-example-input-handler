import {
  EditorState,
  Plugin,
  PluginKey,
} from "prosemirror-state";
import {
  EditorView,
  Decoration,
  DecorationSet,
} from "prosemirror-view";
import {
  Schema,
  DOMParser
} from "prosemirror-model";

import schema from "./schema";
import sampleDoc from './sampleDoc';

const getDecorationsForEverything = doc => {
  let decos = [];
  doc.descendants((node, pos, parent) => {
    if (node.type.name === 'text') {
      decos.push(Decoration.inline(
        pos,
        pos + 1, {
          style: 'background-color: red;'
        }))

    }
    return true;
  })
  return decos;
}

const decorateEverythingPlugin = new Plugin({
  key: new PluginKey('decorateEverything'),
  state: {
    init(config, editorState) {
      const {
        doc
      } = editorState;
      const decos = getDecorationsForEverything(doc);
      return DecorationSet.create(doc, decos);
    },
    apply(transaction, oldEditorState, newEditorState) {
      const {
        doc
      } = transaction;
      const decos = getDecorationsForEverything(doc);
      return DecorationSet.create(doc, decos);
    },
  },
  props: {
    decorations(state) {
      return this.getState(state);
    }
  }
});

const handleInputPlugin = new Plugin({
  key: new PluginKey('handlers'),
  props: {
    // handleKeyPress: (view, event) => {
    //   console.log('handleKeyPress');
    //   return false;
    // },
    handleTextInput: (view, from, to, inputText) => {
      console.log('handleTextInput');
      return false;
    },
  },
});

window.view = new EditorView(document.querySelector("#editor"), {
  state: EditorState.create({
    doc: schema.nodeFromJSON(sampleDoc),
    plugins: [decorateEverythingPlugin, handleInputPlugin],
  })
})
