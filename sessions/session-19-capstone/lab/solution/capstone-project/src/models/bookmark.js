const { randomUUID } = require('crypto');

class Bookmark {
  constructor() {
    this.bookmarks = [];
  }

  getAll({ tag, search } = {}) {
    let results = [...this.bookmarks];

    if (tag) {
      results = results.filter(b =>
        b.tags.some(t => t.toLowerCase() === tag.toLowerCase())
      );
    }

    if (search) {
      const q = search.toLowerCase();
      results = results.filter(b =>
        b.title.toLowerCase().includes(q) ||
        (b.description && b.description.toLowerCase().includes(q))
      );
    }

    return results;
  }

  findById(id) {
    return this.bookmarks.find(b => b.id === id);
  }

  findByUrl(url) {
    return this.bookmarks.find(b => b.url === url);
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

  update(id, updates) {
    const bookmark = this.findById(id);
    if (!bookmark) return null;

    if (updates.url !== undefined) bookmark.url = updates.url;
    if (updates.title !== undefined) bookmark.title = updates.title;
    if (updates.description !== undefined) bookmark.description = updates.description;
    if (updates.tags !== undefined) bookmark.tags = updates.tags;
    bookmark.updatedAt = new Date().toISOString();

    return bookmark;
  }

  delete(id) {
    const index = this.bookmarks.findIndex(b => b.id === id);
    if (index === -1) return false;
    this.bookmarks.splice(index, 1);
    return true;
  }
}

module.exports = Bookmark;
