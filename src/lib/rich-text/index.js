import {
  CodeOff,
  FormatAlignCenter,
  FormatAlignLeft,
  FormatAlignRight,
  FormatBold,
  FormatClear,
  FormatItalic,
  Html,
  Image,
  Redo,
  SelectAll,
  TextFields,
  Title,
} from "@mui/icons-material";
import { Box, Divider, IconButton } from "@mui/material";
import React from "react";
import UploadImage from "./components/UploadFirebaseRichText";
import RichTextData from "./actions/richtext";
import InsertLinkIcon from "@mui/icons-material/InsertLink";

const { context, setContext } = {
  context: {
    innerText: "",
    htmlCode: "",
  },
  setContext: function (data) {
    context.innerText = data.innerHTML;
    context.htmlCode = data.htmlCode;
  },
};

function replaceSelection(html) {
  document.designMode = "on";
  document.execCommand("insertHTML", false, html);
  document.designMode = "off";
}

const richTextEditor = new RichTextData("editor");

export default function RichText(props) {
  const [contextLength, setContextLength] = React.useState(0);

  React.useEffect(() => {
    setContext({
      innerText: props?.data,
      htmlCode: props?.data,
    });
    setContextLength(props?.data?.length);

    return () => {
      setContext({
        innerText: "",
        htmlCode: "",
      });
    };
  }, [props?.data]);
  const onSetHTMLCode = (htmlCode) => {
    setContext({
      innerText: htmlCode,
      htmlCode: htmlCode,
    });

    setContextLength(htmlCode?.length);
  };
  const applyStyle = function (component) {
    const applyComponent = component ?? "h6";
    document.designMode = "on";
    document.execCommand(
      "insertHTML",
      false,
      `<${applyComponent}>` +
        window.getSelection().toString() +
        `</${applyComponent}>`
    );
    document.designMode = "off";
  };
  const [viewState, setViewState] = React.useState("text");
  const onSwitchRichText = React.useCallback(() => {
    setViewState(viewState === "code" ? "text" : "code");
  }, [viewState]);

  const EditItemList = React.useMemo(
    () => [
      {
        display: (
          <Box
            component={"span"}
            sx={{
              padding: 1,
              display: "flex",
            }}
          >
            <UploadImage
              onUploadImage={(url) => {
                replaceSelection(
                  `<div>
              <div style="margin: 10px">
                <img src='${url}' style="width: 100%"/>
              </div>
              </div>`,
                  true
                );
              }}
            >
              <Image />
            </UploadImage>
          </Box>
        ),
        key: "image",
      },
      {
        icon: viewState === "code" ? <Html /> : <CodeOff />,
        onClick: (e) => {
          onSwitchRichText();
        },
      },
      {
        icon: <FormatBold />,
        key: "bold",
        onClick: (e) => {
          document.execCommand("bold", false, null);
        },
      },
      {
        icon: <FormatItalic />,
        key: "italic",
        onClick: (e) => {
          document.execCommand("italic", false, null);
        },
      },
      {
        icon: <FormatAlignRight />,
        key: "JustifyRight",
        onClick: (e) => {
          document.execCommand("JustifyRight", false, null);
        },
      },
      {
        icon: <FormatAlignLeft />,
        key: "JustifyLeft",
        onClick: (e) => {
          document.execCommand("JustifyLeft", false, null);
        },
      },
      {
        icon: <FormatAlignCenter />,
        key: "JustifyCenter",
        onClick: (e) => {
          document.execCommand("JustifyCenter", false, null);
        },
      },

      {
        icon: <Title />,
        onClick: () => {
          applyStyle("h3");
        },
      },
      {
        icon: <TextFields />,
        onClick: () => {
          applyStyle("p");
        },
      },
      {
        icon: <Redo />,
        onClick: (e) => {
          e.preventDefault();
          document.execCommand("redo", false, null);
        },
      },
      {
        icon: <SelectAll />,
        onClick: (e) => {
          document.execCommand("selectAll", false, null);
        },
      },
      {
        icon: <FormatClear />,
        onClick: (e) => {
          document.execCommand("removeFormat", false, null);
        },
      },
      {
        display: (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "left",
              gap: 10,
              margin: "10px 0",
            }}
          >
            <div>
              Replace{" "}
              <input
                placeholder="search text..."
                onChange={richTextEditor.onChangeSearchText}
              />{" "}
              to
            </div>

            <div>
              <input
                placeholder="replace text..."
                onChange={richTextEditor.onChangeReplaceText}
              />
              <button onClick={() => richTextEditor.onLazyReplaceText()}>
                Apply
              </button>
              <button onClick={() => richTextEditor.onLazyReplaceText(1)}>
                Apply All
              </button>
            </div>
          </div>
        ),
      },
      {
        display: (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "left",
              gap: 5,
              marginBottom: 10,
            }}
          >
            Insert Link
            <InsertLinkIcon></InsertLinkIcon>
            <input
              placeholder="search text..."
              onChange={richTextEditor.onChangeLinkText}
            />{" "}
            <button onClick={() => richTextEditor.applyTagLink()}>
              Apply All
            </button>
          </div>
        ),
      },
    ],
    [viewState, onSwitchRichText]
  );
  React.useLayoutEffect(() => {
    const editor = document.querySelector("#editor");

    editor.addEventListener("DOMSubtreeModified", () => {
      setContext({
        innerText: editor.innerHTML,
        htmlCode: editor.innerHTML,
      });
      setContextLength(editor?.innerHTML?.length);

      props?.onEditorChange(editor.innerHTML);
    });

    return () => {
      editor.removeEventListener("DOMSubtreeModified", () => {
        return;
      });
    };
  }, []);

  const ToolBar = () => {
    const viewItems = EditItemList.map((item) => {
      if (item.display) {
        return item.display;
      }

      return (
        <IconButton key={item?.key} onClick={item?.onClick}>
          {item?.icon}
        </IconButton>
      );
    });

    return <Box sx={{ fontSize: "1rem" }}>{viewItems}</Box>;
  };

  return (
    <Box
      sx={{
        position: "relative",
        border: "solid gray 1px",
        padding: "10px",
        marginBottom: 2,
      }}
    >
      <Box sx={{ display: "flex", width: "100%" }}>
        <ToolBar />
      </Box>
      <Divider></Divider>
      <div
        id={"editor"}
        contentEditable="true"
        className=""
        style={{
          padding: 10,
          paddingBottom: 10,
          marginTop: 10,
          backgroundColor: "whitesmoke",
          borderRadius: 5,
          display: viewState === "text" ? "" : "none",
          overflow: "auto",
          position: "relative",
          fontSize: "1rem",
          fontWeight: 300,
        }}
        dangerouslySetInnerHTML={{ __html: context.innerText ?? props?.data }}
        placeholder="Enter content..."
      ></div>
      <textarea
        id={"htmlContent"}
        onChange={(e) => {
          onSetHTMLCode(e?.target?.value);
        }}
        style={{
          paddingTop: 10,
          paddingBottom: 10,
          border: "solid gray 1px",
          display: viewState === "code" ? "" : "none",
        }}
        rows={4}
        value={context.htmlCode}
      ></textarea>
      <small style={{ color: "gray", fontStyle: "italic" }}>
        {contextLength}/10000
      </small>
    </Box>
  );
}
