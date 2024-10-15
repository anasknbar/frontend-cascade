"use client";

import { useState, useEffect, useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";

import {
  ClassicEditor,
  AccessibilityHelp,
  Alignment,
  Autoformat,
  AutoImage,
  AutoLink,
  Autosave,
  BalloonToolbar,
  BlockQuote,
  Bold,
  CKBox,
  CKBoxImageEdit,
  CloudServices,
  Code,
  CodeBlock,
  Essentials,
  FindAndReplace,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  FullPage,
  GeneralHtmlSupport,
  Heading,
  Highlight,
  HorizontalLine,
  HtmlComment,
  HtmlEmbed,
  ImageBlock,
  ImageCaption,
  ImageInline,
  ImageInsert,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  Italic,
  Link,
  LinkImage,
  List,
  ListProperties,
  Markdown,
  MediaEmbed,
  PageBreak,
  Paragraph,
  PasteFromMarkdownExperimental,
  PasteFromOffice,
  PictureEditing,
  RemoveFormat,
  SelectAll,
  ShowBlocks,
  SourceEditing,
  SpecialCharacters,
  SpecialCharactersArrows,
  SpecialCharactersCurrency,
  SpecialCharactersEssentials,
  SpecialCharactersLatin,
  SpecialCharactersMathematical,
  SpecialCharactersText,
  Strikethrough,
  Style,
  Subscript,
  Superscript,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  TextTransformation,
  TodoList,
  Underline,
  Undo,
} from "ckeditor5";
import {
  ExportPdf,
  ExportWord,
  ImportWord,
  MultiLevelList,
} from "ckeditor5-premium-features";

import "ckeditor5/ckeditor5.css";
import "ckeditor5-premium-features/ckeditor5-premium-features.css";

import "./App.css";
import { loadCopiedData, loadEditorContent, saveEditorContent } from './utils/chromeStorageUtils.js';

/**
 * Please update the following values with your actual tokens.
 * Instructions on how to obtain them: https://ckeditor.com/docs/trial/latest/guides/real-time/quick-start.html
 */

const LICENSE_KEY =
  "d1lwVGhIMjRrcFBnWndnY3V4bnBFejhoZEZYbGpETzAyQzNGWWVBM3d2bCtmUGVaYWZjOTR1ZGVmTDlzT3c9PS1NakF5TkRFeE1EYz0=";
const CKBOX_TOKEN_URL =
  "https://120291.cke-cs.com/token/dev/07bb406e156e542de6b8ac7c449f42791a951c30298170d34593938b18bd?limit=10";

export default function App() {
  const editorContainerRef = useRef(null);
  const editorRef = useRef(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);
  const [editorContent, setEditorContent] = useState("");
  const [editorInstance, setEditorInstance] = useState(null); // State for editor instancece

  useEffect(() => {
    setIsLayoutReady(true);

    // Cleanup on unmount
    return () => setIsLayoutReady(false);
  }, []);


  const editorConfig = {
    toolbar: {
      items: [
        "undo",
        "redo",
        "|",
        "fontSize",
        "fontFamily",
        "fontColor",
        "fontBackgroundColor",
        "PageBreak",
        // 'sourceEditing',
        // 'showBlocks',
        "|",
        "heading",
        "style",
        "|",

        "|",
        // 'bold',
        // 'italic',
        // 'underline',
        "|",
        // 'link',
        "insertImage",
        "insertTable",
        "highlight",
        "blockQuote",
        "codeBlock",
        "|",
        "alignment",
        "|",
        // 'bulletedList',
        // 'numberedList',
        "multiLevelList",
        "todoList",
        "outdent",
        "indent",
      ],
      shouldNotGroupWhenFull: false,
    },
    plugins: [
      Autosave,
      AccessibilityHelp,
      Alignment,
      Autoformat,
      AutoImage,
      AutoLink,
      Autosave,
      BalloonToolbar,
      BlockQuote,
      Bold,
      CKBox,
      CKBoxImageEdit,
      CloudServices,
      Code,
      CodeBlock,
      Essentials,
      ExportPdf,
      ExportWord,
      FindAndReplace,
      FontBackgroundColor,
      FontColor,
      FontFamily,
      FontSize,
      FullPage,
      GeneralHtmlSupport,
      Heading,
      Highlight,
      HorizontalLine,
      HtmlComment,
      HtmlEmbed,
      ImageBlock,
      ImageCaption,
      ImageInline,
      ImageInsert,
      ImageInsertViaUrl,
      ImageResize,
      ImageStyle,
      ImageTextAlternative,
      ImageToolbar,
      ImageUpload,
      ImportWord,
      Indent,
      IndentBlock,
      Italic,
      Link,
      LinkImage,
      List,
      ListProperties,
      Markdown,
      MediaEmbed,
      MultiLevelList,
      PageBreak,
      Paragraph,
      PasteFromMarkdownExperimental,
      PasteFromOffice,
      PictureEditing,
      RemoveFormat,
      SelectAll,
      ShowBlocks,
      SourceEditing,
      SpecialCharacters,
      SpecialCharactersArrows,
      SpecialCharactersCurrency,
      SpecialCharactersEssentials,
      SpecialCharactersLatin,
      SpecialCharactersMathematical,
      SpecialCharactersText,
      Strikethrough,
      Style,
      Subscript,
      Superscript,
      Table,
      TableCaption,
      TableCellProperties,
      TableColumnResize,
      TableProperties,
      TableToolbar,
      TextTransformation,
      TodoList,
      Underline,
      Undo,
    ],
    autosave: {
      save(editor) {
        // This function is called whenever the editor content changes
        const data = editor.getData();
        // Save to chrome.storage
        saveEditorContent(data);
        console.log("Content saved to chrome.storage:", data);
      },

      waitingTime: 2000, // Set your desired auto-save interval in milliseconds
    },
    balloonToolbar: [
      "bold",
      "italic",
      "underline",
      "|",
      "link",
      "insertImage",
      "|",
      "bulletedList",
      "numberedList",
    ],
    ckbox: {
      tokenUrl: CKBOX_TOKEN_URL,
    },
    exportPdf: {
      stylesheets: [
        /* This path should point to application stylesheets. */
        /* See: https://ckeditor.com/docs/ckeditor5/latest/features/converters/export-pdf.html */
        "./App.css",
        /* Export PDF needs access to stylesheets that style the content. */
        "https://cdn.ckeditor.com/ckeditor5/43.2.0/ckeditor5.css",
        "https://cdn.ckeditor.com/ckeditor5-premium-features/43.2.0/ckeditor5-premium-features.css",
      ],
      fileName: "export-pdf-demo.pdf",
      converterOptions: {
        format: "Tabloid",
        margin_top: "20mm",
        margin_bottom: "20mm",
        margin_right: "24mm",
        margin_left: "24mm",
        page_orientation: "portrait",
      },
    },
    exportWord: {
      stylesheets: [
        /* This path should point to application stylesheets. */
        /* See: https://ckeditor.com/docs/ckeditor5/latest/features/converters/export-word.html */
        "./App.css",
        /* Export Word needs access to stylesheets that style the content. */
        "https://cdn.ckeditor.com/ckeditor5/43.2.0/ckeditor5.css",
        "https://cdn.ckeditor.com/ckeditor5-premium-features/43.2.0/ckeditor5-premium-features.css",
      ],
      fileName: "export-word-demo.docx",
      converterOptions: {
        document: {
          orientation: "portrait",
          size: "Tabloid",
          margins: {
            top: "20mm",
            bottom: "20mm",
            right: "24mm",
            left: "24mm",
          },
        },
      },
    },
    fontFamily: {
      supportAllValues: true,
    },
    fontSize: {
      options: [10, 12, 14, "default", 18, 20, 22],
      supportAllValues: true,
    },
    heading: {
      options: [
        {
          model: "paragraph",
          title: "Paragraph",
          class: "ck-heading_paragraph",
        },
        {
          model: "heading1",
          view: "h1",
          title: "Heading 1",
          class: "ck-heading_heading1",
        },
        {
          model: "heading2",
          view: "h2",
          title: "Heading 2",
          class: "ck-heading_heading2",
        },
        {
          model: "heading3",
          view: "h3",
          title: "Heading 3",
          class: "ck-heading_heading3",
        },
        {
          model: "heading4",
          view: "h4",
          title: "Heading 4",
          class: "ck-heading_heading4",
        },
        {
          model: "heading5",
          view: "h5",
          title: "Heading 5",
          class: "ck-heading_heading5",
        },
        {
          model: "heading6",
          view: "h6",
          title: "Heading 6",
          class: "ck-heading_heading6",
        },
      ],
    },
    htmlSupport: {
      allow: [
        {
          name: /^.*$/,
          styles: true,
          attributes: true,
          classes: true,
        },
      ],
    },
    image: {
      toolbar: [
        "toggleImageCaption",
        "imageTextAlternative",
        "|",
        "imageStyle:inline",
        "imageStyle:wrapText",
        "imageStyle:breakText",
        "|",
        "resizeImage",
        "|",
        "ckboxImageEdit",
      ],
    },
    licenseKey: LICENSE_KEY,
    link: {
      addTargetToExternalLinks: true,
      defaultProtocol: "https://",
      decorators: {
        toggleDownloadable: {
          mode: "manual",
          label: "Downloadable",
          attributes: {
            download: "file",
          },
        },
      },
    },
    list: {
      properties: {
        styles: true,
        startIndex: true,
        reversed: true,
      },
    },
    menuBar: {
      isVisible: true,
    },
    placeholder: "Type or paste your content here!",
    style: {
      definitions: [
        {
          name: "Article category",
          element: "h3",
          classes: ["category"],
        },
        {
          name: "Title",
          element: "h2",
          classes: ["document-title"],
        },
        {
          name: "Subtitle",
          element: "h3",
          classes: ["document-subtitle"],
        },
        {
          name: "Info box",
          element: "p",
          classes: ["info-box"],
        },
        {
          name: "Side quote",
          element: "blockquote",
          classes: ["side-quote"],
        },
        {
          name: "Marker",
          element: "span",
          classes: ["marker"],
        },
        {
          name: "Spoiler",
          element: "span",
          classes: ["spoiler"],
        },
        {
          name: "Code (dark)",
          element: "pre",
          classes: ["fancy-code", "fancy-code-dark"],
        },
        {
          name: "Code (bright)",
          element: "pre",
          classes: ["fancy-code", "fancy-code-bright"],
        },
      ],
    },
    table: {
      contentToolbar: [
        "tableColumn",
        "tableRow",
        "mergeTableCells",
        "tableProperties",
        "tableCellProperties",
      ],
    },
  };

  configUpdateAlert(editorConfig);

  // Load the editor content when the component mounts
  useEffect(() => {
    const initializeEditorContent = async () => {
      const content = await loadEditorContent();
      setEditorContent(content); // Update state with loaded content
      if (editorInstance && content) {
        editorInstance.setData(content); // Set editor content if the editor is ready
      }
    };

    initializeEditorContent();
  }, [editorInstance]); // Depend on editorInstance to run this when it is available

  return (
    <>
      <div>
        <div className="main-container">
          <div
            className="editor-container editor-container_classic-editor editor-container_include-style"
            ref={editorContainerRef}
          >
            <div className="editor-container__editor">
              <div ref={editorRef}>
                {isLayoutReady && (
                  <CKEditor
                    editor={ClassicEditor}
                    config={editorConfig}
                    data={editorContent} // Pass initial data directly to CKEditor
                    onReady={(editor) => {
                      setEditorInstance(editor); // Store a reference to the editor instance using state
                      loadCopiedData(editor); // Load copied content into the editor
                    }}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      saveEditorContent(data); // Save content as the editor changes
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/**
 * This function exists to remind you to update the config needed for premium features.
 * The function can be safely removed. Make sure to also remove call to this function when doing so.
 */
function configUpdateAlert(config) {
  if (configUpdateAlert.configUpdateAlertShown) {
    return;
  }

  const isModifiedByUser = (currentValue, forbiddenValue) => {
    if (currentValue === forbiddenValue) {
      return false;
    }

    if (currentValue === undefined) {
      return false;
    }

    return true;
  };

  const valuesToUpdate = [];

  configUpdateAlert.configUpdateAlertShown = true;

  if (!isModifiedByUser(config.licenseKey, "<YOUR_LICENSE_KEY>")) {
    valuesToUpdate.push("LICENSE_KEY");
  }

  if (!isModifiedByUser(config.ckbox?.tokenUrl, "<YOUR_CKBOX_TOKEN_URL>")) {
    valuesToUpdate.push("CKBOX_TOKEN_URL");
  }

  if (valuesToUpdate.length) {
    window.alert(
      [
        "Please update the following values in your editor config",
        "in order to receive full access to the Premium Features:",
        "",
        ...valuesToUpdate.map((value) => ` - ${value}`),
      ].join("\n")
    );
  }
}
