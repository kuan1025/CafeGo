export const parsePaginationLinks = (linkHeader) => {
    const links = {};
    if (linkHeader) {
      linkHeader.split(',').forEach(link => {
        const match = link.match(/<([^>]+)>; rel="([^"]+)"/);
        if (match) {
          const url = match[1];
          const rel = match[2];
          links[rel] = url;
        }
      });
    }
    return links;
  };