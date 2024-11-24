type Doc = { id: string; slug: string; data: {title:string} };

export type TreeNode = {
  name: string;
  title: string;
  slug: string;
  children: TreeNode[];
  id?: string;
};

export function buildTree(files: Doc[]): TreeNode[] {
  const root: TreeNode[] = [];

  files.forEach((file) => {
    const parts = file.slug.split("/"); // Split slug into parts
    let currentLevel = root;
    let accumulatedSlug = ""; // To construct the slug at each level

    parts.forEach((part, index) => {
      accumulatedSlug += (index > 0 ? "/" : "") + part;

      // Find or create the node for the current part
      let node = currentLevel.find((item) => item.name === part);

      if (!node) {
        node = {
          name: part,
          title: file.data.title,
          slug: accumulatedSlug,
          children: [],
        };
        currentLevel.push(node);
      }

      // If it's the last part, add the file ID to the node
      if (index === parts.length - 1) {
        node.id = file.id;
      }

      // Move to the next level
      currentLevel = node.children;
    });
  });

  return root;
}