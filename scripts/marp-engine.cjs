// Clipboard, lightbulb, microscope and question-mark decorations used by the decks.
const decorativePrefix = /^(?:[\u{1F4CB}\u{1F4A1}\u{1F52C}\u{2753}]\uFE0F?[ \t]+)+/u;

module.exports = ({ marp }) => {
  // Run before Marp turns Unicode emoji into image tokens.
  marp.markdown.core.ruler.after('inline', 'rvap_decorative_prefixes', state => {
    let quoteDepth = 0;

    for (let index = 0; index < state.tokens.length; index += 1) {
      const token = state.tokens[index];
      if (token.type === 'blockquote_open') quoteDepth += 1;
      if (token.type === 'blockquote_close') quoteDepth -= 1;
      if (token.type !== 'inline') continue;

      const parent = state.tokens[index - 1]?.type;
      if (parent !== 'heading_open' && !(quoteDepth > 0 && parent === 'paragraph_open')) continue;

      const first = token.children?.[0];
      if (first?.type !== 'text') continue;

      first.content = first.content.replace(decorativePrefix, '');
      token.content = token.content.replace(decorativePrefix, '');
    }
  });

  return marp;
};
