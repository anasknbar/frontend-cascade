const LICENSE_KEY =
  "d1lwVGhIMjRrcFBnWndnY3V4bnBFejhoZEZYbGpETzAyQzNGWWVBM3d2bCtmUGVaYWZjOTR1ZGVmTDlzT3c9PS1NakF5TkRFeE1EYz0=";
const CKBOX_TOKEN_URL =
  "https://120291.cke-cs.com/token/dev/07bb406e156e542de6b8ac7c449f42791a951c30298170d34593938b18bd?limit=10";
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

export default editorConfig;