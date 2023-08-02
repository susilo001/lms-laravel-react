import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface QuillEditorProps {
    value: string;
    onChange: (content: string) => void;
}

const RichTextEditor = ({ value, onChange }: QuillEditorProps) => {
    const modules = {
        toolbar: [
            ["bold", "italic", "underline", "strike"], // Options for the toolbar
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["link", "image", "video"], // Additional options for the toolbar
            [{ list: "ordered" }, { list: "bullet" }], // List options
            [{ align: [] }], // Alignment options
        ],
    };
    return (
        <ReactQuill
            theme="snow"
            value={value}
            onChange={onChange}
            modules={modules}
        />
    );
};

export default RichTextEditor;
