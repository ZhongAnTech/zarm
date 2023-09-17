import { unistUtilVisit } from 'dumi';

export default function remark() {
  return (tree, vFile) => {
    // read frontmatter
    unistUtilVisit.visit(tree, 'yaml', (node) => {
      if (!/(^|[\n\r])description:/.test(node.value)) {
        vFile.data.frontmatter.__autoDescription = true;
      }
    });
  };
}
