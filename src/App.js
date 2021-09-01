import React, {useState} from "react";
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

import { flatten, getSelectedObjects, filterTree } from './utils/utilities'
import { data } from "./data/sampleData";

import './App.css';

const theme = createTheme({
  typography: {
    htmlFontSize: 13,
  },
});

function App() {
  const [input, setInput] = useState("")
  const [selected, setSelectedId] = React.useState([]);
  const [flattenedData, setFlattenedData] = React.useState([]);

  React.useEffect(() => {
    setFlattenedData([...new Set(flatten(data.children))])
  }, [])

  const retrievedDataObjects = getSelectedObjects(flattenedData, selected)

  console.log(selected)
  console.log(retrievedDataObjects)

  function getChildById(node, id) {
    let array = [];

    function getAllChild(nodes) {
      if (nodes === null) return [];
      array.push(nodes.id);
      if (Array.isArray(nodes.children)) {
        nodes.children.forEach((node) => {
          array = [...array, ...getAllChild(node)];
          array = array.filter((v, i) => array.indexOf(v) === i);
        });
      }
      return array;
    }

    function getNodeById(nodes, id) {
      if (nodes.id === id) {
        return nodes;
      } else if (Array.isArray(nodes.children)) {
        let result = null;
        nodes.children.forEach((node) => {
          if (!!getNodeById(node, id)) {
            result = getNodeById(node, id);
          }
        });
        return result;
      }

      return null;
    }

    return getAllChild(getNodeById(node, id));
  }

  function getOnChange(checked, nodes) {
    const allNode = getChildById(data, nodes.id);
    let array = checked
      ? [...selected, ...allNode]
      : selected.filter((value) => !allNode.includes(value));

    array = array.filter((v, i) => array.indexOf(v) === i);
    setSelectedId(array);
  }

  const renderTree = (nodes) => (
    <TreeItem
      key={nodes.id}
      nodeId={nodes.id}
      label={
        <FormControlLabel
          control={
            <Checkbox
              checked={selected.some((item) => item === nodes.id)}
              onChange={(event) => getOnChange(event.currentTarget.checked, nodes)}
              onClick={(e) => e.stopPropagation()}
              color = "primary"
            />
          }
          label={<>{nodes.name}</>}
          key={nodes.id}
        />
      }
    >
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );

  const filteredTree = {
    id: "0",
    name: "Parent",
    children: filterTree(data.children, input)
  }
  
  return (
    <div className="App">  
    <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Search Case Sensitive" />
    <ThemeProvider theme={theme}>
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpanded={["0", "3", "4", "5", "6"]}
          defaultExpandIcon={<ChevronRightIcon />}
        >
          {renderTree(filteredTree)}
        </TreeView>
      </ThemeProvider>  
    </div>
  );
}

export default App;
