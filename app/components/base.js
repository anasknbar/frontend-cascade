import dynamic from "next/dynamic";



const ClassicEditor = dynamic(() => import("./classicEditor/App"), {
  ssr: false,
});

export default function Base() {
  return (
    <>
      
      <div className="w-fit h-fit ml-auto bg-sky-100">
        {/* <RichTextEditior/> */}
        <ClassicEditor />
      </div>
    </>
  );
}
