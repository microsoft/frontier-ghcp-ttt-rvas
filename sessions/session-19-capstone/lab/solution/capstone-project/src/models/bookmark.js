const { randomUUID } = require('crypto');

class Bookmark {
  constructor() {
    this.bookmarks = [];
  }

  findByUrl(url) {
    return this.bookmarks.find((bookmark) => bookmark.url === url);
  }

  create({ url, title, description, tags }) {
    const bookmark = {
      id: randomUUID(),
      url,
      title,
      description: description || null,
      tags: tags || [],
      createdAt: new Date().toISOString(),
      updatedAt: null,
    };
    this.bookmarks.push(bookmark);
    return bookmark;
  }
}

module.exports = Bookmark;
