import dynamic from "next/dynamic";

const RichTextEditior = dynamic(() => import("./richTextEditior/App"), {
  ssr: false,
});

const ClassicEditor = dynamic(() => import("./classicEditor/App"), {
  ssr: false,
});

export default function Base() {
  return (
    <>
      
      <div className="w-fit h-fit ml-auto bg-gray-200">
        {/* <RichTextEditior/> */}
        <ClassicEditor />
      </div>
    </>
  );
}
