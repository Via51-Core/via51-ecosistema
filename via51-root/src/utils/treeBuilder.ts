import { RegistryNode } from '../types/fractal';
export const buildFractalTree = (nodes: RegistryNode[]) => {
  const map: Record<string, any> = {};
  const tree: any[] = [];
  nodes.forEach(node => { map[node.node_path] = { ...node, children: [] }; });
  nodes.forEach(node => {
    const parts = node.node_path.split('.');
    if (parts.length === 1) { tree.push(map[node.node_path]); }
    else { const parentPath = parts.slice(0, -1).join('.'); if (map[parentPath]) map[parentPath].children.push(map[node.node_path]); }
  });
  return tree;
};